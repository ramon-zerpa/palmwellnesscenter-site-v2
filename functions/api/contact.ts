interface Env {
  TURNSTILE_SECRET_KEY?: string;
  MAILGUN_API_KEY?: string;
  MAILGUN_DOMAIN?: string;
  MAILGUN_FROM?: string;
  MAILGUN_TO?: string;
  MAILGUN_BCC?: string;
}

const JSON_HEADERS = { "Content-Type": "application/json" };

class ConfigError extends Error {}

function jsonError(error: string, status: number): Response {
  return new Response(JSON.stringify({ success: false, error }), { status, headers: JSON_HEADERS });
}

function requireEnv(env: Env, key: keyof Env): string {
  const value = String(env[key] || "").trim();
  if (!value || value.includes("your_") || value.includes("xxxxxxxx")) {
    throw new ConfigError(`Missing ${key}`);
  }
  return value;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const turnstileSecret = requireEnv(context.env, "TURNSTILE_SECRET_KEY");
    const mailgunApiKey = requireEnv(context.env, "MAILGUN_API_KEY");
    const mailgunDomain = requireEnv(context.env, "MAILGUN_DOMAIN");
    const mailgunFrom = requireEnv(context.env, "MAILGUN_FROM");
    const mailgunTo = requireEnv(context.env, "MAILGUN_TO");
    const bccList = String(context.env.MAILGUN_BCC || "")
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);
    const formData = await context.request.formData();

    // 0. Honeypot — silently accept-and-drop
    if (String(formData.get("company") || "").trim()) {
      return new Response(JSON.stringify({ success: true }), { headers: JSON_HEADERS });
    }

    // 1. Validate fields
    const name = String(formData.get("name") || "").trim().slice(0, 100);
    const email = String(formData.get("email") || "").trim().slice(0, 200);
    const message = String(formData.get("message") || "").trim().slice(0, 5000);

    if (!name || !email || !message) return jsonError("Missing required field", 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonError("Invalid email", 400);

    // 2. Turnstile CAPTCHA
    const turnstileToken = String(formData.get("cf-turnstile-response") || "").trim();
    if (!turnstileToken) return jsonError("CAPTCHA verification failed", 400);

    const turnstileParams = new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
    });
    const remoteIp = context.request.headers.get("CF-Connecting-IP");
    if (remoteIp) turnstileParams.set("remoteip", remoteIp);

    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: turnstileParams,
    });
    const turnstileData = (await turnstileRes.json()) as { success: boolean; "error-codes"?: string[] };
    if (!turnstileData.success) {
      console.warn("turnstile failed:", turnstileData["error-codes"]);
      return jsonError("CAPTCHA verification failed", 400);
    }

    // 3. Send via Mailgun
    const mailgunRes = await fetch(
      `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
      {
        method: "POST",
        headers: { Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}` },
        body: (() => {
          const body = new URLSearchParams({
            from: mailgunFrom,
            to: mailgunTo,
            "h:Reply-To": email,
            subject: `Contact Form - ${name} - palmwellness.center`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          });
          for (const bcc of bccList) body.append("bcc", bcc);
          return body;
        })(),
      }
    );
    if (!mailgunRes.ok) {
      const body = await mailgunRes.text().catch(() => "");
      throw new Error(`Mailgun ${mailgunRes.status}: ${body}`);
    }

    return new Response(JSON.stringify({ success: true }), { headers: JSON_HEADERS });
  } catch (error) {
    if (error instanceof ConfigError) {
      console.error("contact handler misconfigured:", error.message);
      return jsonError("Server configuration error", 500);
    }
    console.error("contact handler failed:", error);
    return jsonError("Server error", 500);
  }
};
