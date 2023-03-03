const searchBar = document.querySelector('.search-bar');
const results = document.querySelector('.results');
const items = results.children;

searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.textContent.toLowerCase();

    if (text.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  }

  results.classList.add('show');
});
