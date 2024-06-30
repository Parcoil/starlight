if (window.location.pathname === "/") {
  const se = localStorage.getItem("search-eng");

  const seinput = document.getElementById("uv-search-engine");

  if (se === "google") {
    seinput.value = "https://www.google.com/search?q=%s";
  } else if (se === "bing") {
    seinput.value = "https://www.bing.com/search?q=%s";
  } else if (se === "brave") {
    seinput.value = "https://search.brave.com/search?q=%s";
  } else if (se === "ddg") {
    seinput.value = "https://duckduckgo.com/?q=%s";
  } else if (se === "youtube") {
    seinput.value = "https://www.youtube.com/results?search_query=%s";
  }
}
