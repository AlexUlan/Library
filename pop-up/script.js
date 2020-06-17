const popupLinks = document.querySelectorAll(".popupShow");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");
const popUpCloseIcon = document.querySelectorAll(".close-popup");

/* Предотвратить двойное нажатие */
let unlcok = true;

/* Значение необходимо устанавливать такое же к и в CSS transition 0.8s .popup*/
const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", (e) => {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popUpOpen(curentPopup);
      e.preventDefault();
    });
  }
}

if (popUpCloseIcon.length > 0) {
  for (let i = 0; i < popUpCloseIcon.length; i++) {
    const element = popUpCloseIcon[i];
    element.addEventListener("click", (e) => {
      popUpClose(element.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popUpOpen(currentPopUp) {
  if (currentPopUp && unlcok) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popUpClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopUp.classList.add("open");
    currentPopUp.addEventListener("click", (e) => {
      if (!e.target.closest(".popup__content")) {
        popUpClose(e.target.closest(".popup"));
      }
    });
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  document.body.style = "";

  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlcok = false;
  /* Отключить повторное нажатие, иначе не корректно считаеться падинг */
  setTimeout(() => {
    unlcok = true;
  }, timeout);
}
/* doUnlock = true Если открываем попап в попапе, для блока скрола */
function popUpClose(popipActive, doUnlock = true) {
  if (unlcok) {
    popipActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyUnlock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlcok = false;
  /* Отключить повторное нажатие, иначе не корректно считаеться падинг */
  setTimeout(() => {
    unlcok = true;
  }, timeout);
}

document.addEventListener("keydown", (e) => {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popUpClose(popupActive);
  }
});
