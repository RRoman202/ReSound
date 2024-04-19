function changeTheme() {
  var element = document.getElementById("App");
  var btn = document.getElementById("themeButton");
  if (localStorage.getItem("theme") !== "dark") {
    element!.className = "dark";
    btn!.style.backgroundColor = "darkblue";
    btn!.style.borderColor = "darkblue";
    localStorage.setItem("theme", "dark");
  } else {
    element!.className = "light";
    btn!.style.backgroundColor = "white";
    localStorage.setItem("theme", "light");
  }
}

export default changeTheme;
