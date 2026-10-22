// tabs

let tabLinks = document.querySelectorAll(".tablinks");
let tabContent = document.querySelectorAll(".tabcontent");

tabLinks.forEach(function (el) {
  el.addEventListener("click", openTabs);
});

function openTabs(el) {
  let btnTarget = el.currentTarget;
  let program = btnTarget.dataset.program;
  let targetContent = document.getElementById(program);

  if (!targetContent) {
    console.error("Tab content not found for program:", program);
    return;
  }

  tabContent.forEach(function (el) {
    el.classList.remove("active-tab");
  });

  tabLinks.forEach(function (el) {
    el.classList.remove("active-tab");
  });

  targetContent.classList.add("active-tab");

  btnTarget.classList.add("active-tab");
}
