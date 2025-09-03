export function sanitizeHtml(unsafeHtml: string): string {
  if (!unsafeHtml) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(unsafeHtml, "text/html");

  const removeNodes = ["script", "style", "iframe", "object", "embed", "link", "meta"];
  removeNodes.forEach((selector) => {
    const nodes = doc.querySelectorAll(selector);
    nodes.forEach((n) => n.remove());
  });

  const walk = (node: Element) => {
    // Remove any on* event handler attributes
    for (const attr of Array.from(node.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim();

      if (name.startsWith("on")) {
        node.removeAttribute(attr.name);
        continue;
      }

      // Disallow javascript: and data: URIs except data:image/* for img src
      if (name === "href" || name === "src" || name === "srcset") {
        const lower = value.toLowerCase();
        const isJavascript = lower.startsWith("javascript:");
        const isData = lower.startsWith("data:");
        const isImg = node.tagName === "IMG";
        const isAllowedDataImage = isImg && lower.startsWith("data:image/");
        if (isJavascript || (isData && !isAllowedDataImage)) {
          node.removeAttribute(attr.name);
          continue;
        }
      }
    }

    // Recurse
    for (const child of Array.from(node.children)) {
      walk(child);
    }
  };

  for (const el of Array.from(doc.body.children)) {
    walk(el as Element);
  }

  return doc.body.innerHTML;
}


