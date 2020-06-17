const triggerBtn = document.querySelector("#triggerSideBar");

triggerBtn.addEventListener("click", () => {
  document.body.classList.toggle("showSidBar");
});
