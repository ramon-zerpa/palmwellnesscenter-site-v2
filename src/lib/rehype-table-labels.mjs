// Rehype plugin: give every markdown table cell the label of its column.
//
// The blog tables are authored in markdown, so the renderer emits a plain
// <table>. To turn each row into a labelled card on narrow screens (see the
// `.prose table` rules in global.css) each <td> needs to know its column
// header. We copy the matching <th> text onto `data-label`, which the mobile
// CSS surfaces through `td::before { content: attr(data-label) }`.
//
// Dependency-free on purpose: a tiny recursive walk is enough and avoids
// pulling rehype/unist visitors into the build for a single transform.

function textContent(node) {
  if (!node) return "";
  if (node.type === "text") return node.value;
  const children = node.children || [];
  return children.map(textContent).join("");
}

function visit(node, type, callback) {
  if (node?.type === type) callback(node);
  for (const child of node?.children || []) visit(child, type, callback);
}

export default function rehypeTableLabels() {
  return (tree) => {
    visit(tree, "element", (table) => {
      if (table.tagName !== "table") return;

      const sections = (table.children || []).filter((child) => child.type === "element");
      const head = sections.find((child) => child.tagName === "thead") || sections[0];
      const headRow = (head?.children || []).find(
        (child) => child.type === "element" && child.tagName === "tr",
      );
      const headers = (headRow?.children || [])
        .filter((cell) => cell.type === "element" && (cell.tagName === "th" || cell.tagName === "td"))
        .map(textContent);

      const body = sections.find((child) => child.tagName === "tbody") || table;
      const bodyRows = (body.children || []).filter(
        (child) => child.type === "element" && child.tagName === "tr",
      );

      for (const row of bodyRows) {
        const cells = (row.children || []).filter(
          (child) => child.type === "element" && child.tagName === "td",
        );
        cells.forEach((cell, index) => {
          if (!headers[index]) return;
          cell.properties = cell.properties || {};
          cell.properties["data-label"] = headers[index];
        });
      }
    });
  };
}
