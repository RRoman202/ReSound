export function hideNav() {
  var element = document.getElementById("navbar");
  if (element) {
    element.style.display = "none";
  }
}
export function viewNav() {
  var element = document.getElementById("navbar");
  if (element) {
    element.style.display = "flex";
  }
}
