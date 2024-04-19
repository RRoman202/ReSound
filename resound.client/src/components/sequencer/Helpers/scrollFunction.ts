export function backUp() {
  var element = document.getElementById("contentLayout");
  element?.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
export function backDown() {
  var element = document.getElementById("contentLayout");
  element?.scrollTo({
    top: element.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}
