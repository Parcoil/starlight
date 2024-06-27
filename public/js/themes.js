const theme = localStorage.getItem("theme");

function getSavedTheme() {
  document.body.setAttribute("theme", theme);
}

getSavedTheme();

function setTheme(theme) {
  document.body.setAttribute("theme", theme);
  localStorage.setItem("theme", theme);
}
