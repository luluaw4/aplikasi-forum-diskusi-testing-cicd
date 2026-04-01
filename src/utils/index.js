function showFormattedDate(date, locale = 'id-ID') {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function stripHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
}

function truncateText(text, maxLength = 120) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

function getCategories(threads) {
  return [...new Set(threads.map((thread) => thread.category).filter(Boolean))];
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export {
  showFormattedDate,
  stripHtml,
  truncateText,
  getCategories,
  getInitials,
};
