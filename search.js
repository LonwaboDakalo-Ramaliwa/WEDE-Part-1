
document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("searchToggle");
  const searchPanel = document.getElementById("searchPanel");
  const searchInput = document.getElementById("site-search");
  const previewContainer = document.getElementById("searchPreview");

  if (!searchToggle || !searchPanel) return; 

  
  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    searchPanel.classList.toggle("hidden");
    if (!searchPanel.classList.contains("hidden")) {
      searchInput.focus();
    }
  });

 
  document.addEventListener("click", (e) => {
    if (!searchPanel.contains(e.target) && !searchToggle.contains(e.target)) {
      searchPanel.classList.add("hidden");
    }
  });

 
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    previewContainer.innerHTML = "";
    if (!q) return;

    const filtered = siteData.filter(item =>
      item.title.toLowerCase().includes(q) ||
      (item.keywords && item.keywords.some(k => k.includes(q)))
    );

    if (filtered.length) {
      filtered.forEach(item => {
        const a = document.createElement("a");
        a.href = item.url;
        a.textContent = item.title;
        previewContainer.appendChild(a);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No results found";
      previewContainer.appendChild(p);
    }
  });
});

 