// tabs

var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".tabcontent");

tabLinks.forEach(function (el) {
  el.addEventListener("click", openTabs);
});

function openTabs(el) {
  var btnTarget = el.currentTarget;
  var program = btnTarget.dataset.program;

  tabContent.forEach(function (el) {
    el.classList.remove("active-tab");
  });

  tabLinks.forEach(function (el) {
    el.classList.remove("active-tab");
  });

  document.querySelector("#" + program).classList.add("active-tab");

  btnTarget.classList.add("active-tab");
}
