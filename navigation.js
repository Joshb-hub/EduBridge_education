function loadPage(pagePath) {
  const mainContent = document.getElementById("main-content")

  fetch(pagePath)
    .then((response) => response.text())
    .then((html) => {
      mainContent.innerHTML = html
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
    .catch((error) => console.error("Error loading page:", error))
}

function toggleSubject(subjectId) {
  const element = document.getElementById(subjectId + '-resources');
  const button = event.target;
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
    button.textContent = '▲';
  } else {
    element.classList.add('hidden');
    button.textContent = '▼';
  }
}
