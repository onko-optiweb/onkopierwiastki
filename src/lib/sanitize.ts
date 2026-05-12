const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "ul", "ol", "li",
  "strong", "em", "b", "i", "u", "s", "del", "ins", "mark", "sub", "sup",
  "a", "img",
  "blockquote", "pre", "code",
  "table", "thead", "tbody", "tr", "th", "td",
  "div", "span",
  "figure", "figcaption",
]);

const ALLOWED_ATTR = new Set([
  "href", "src", "alt", "title", "target", "rel",
  "class", "id",
  "width", "height",
  "colspan", "rowspan",
]);

const DANGEROUS_PROTOCOLS = /^(javascript|vbscript|data):/i;

export function sanitizeHtml(dirty: string): string {
  // Remove script tags and their content
  let clean = dirty.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove event handlers (onclick, onerror, onload, etc.)
  clean = clean.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "");

  // Remove style tags and their content
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Remove iframe, object, embed, form, input, textarea
  clean = clean.replace(/<\/?(iframe|object|embed|form|input|textarea|button|select|option)\b[^>]*>/gi, "");

  // Remove dangerous protocols from href/src
  clean = clean.replace(/(href|src)\s*=\s*"([^"]*)"/gi, (match, attr, url) => {
    if (DANGEROUS_PROTOCOLS.test(url.trim())) {
      return `${attr}="#"`;
    }
    return match;
  });
  clean = clean.replace(/(href|src)\s*=\s*'([^']*)'/gi, (match, attr, url) => {
    if (DANGEROUS_PROTOCOLS.test(url.trim())) {
      return `${attr}='#'`;
    }
    return match;
  });

  return clean;
}
