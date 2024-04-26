const article = document.querySelector("article");

console.log(`[yanle] - 1234`);

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent as string;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression

  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode as HTMLElement;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
