localStorage.serverurl = "https://parcoil-assets.onrender.com";
console.log(
  "%c[ %cStarlight%c ] %cSite loaded",
  "font-weight: bold; color: white; font-size: 20px;",
  "font-weight: bold; color: black; font-size: 20px;",
  "font-weight: normal; font-size: 20px;",
  "font-weight: normal; font-size: 20px;"
);

function createBlank() {
  win = window.open();
  win.document.body.style.margin = "0";
  win.document.body.style.height = "100vh";
  var iframe = win.document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.margin = "0";
  iframe.referrerpolicy = "no-referrer";
  iframe.allow = "fullscreen";
  iframe.src = location.origin;
  win.document.body.appendChild(iframe);

  window.location.href = "https://www.google.com/search?q=what+day+is+today";
}
function displayCurrentTime() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedTime =
    hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + period;

  document.getElementById("current-time").textContent = formattedTime;
}

displayCurrentTime();
setInterval(displayCurrentTime, 1000);
