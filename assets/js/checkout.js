const msgPopup = document.querySelector(".popup__message"),
  btnCLoseModal = document.querySelector(".btn__close-modal"),
  btnSubmit = document.querySelector(".btn__submit");

msgPopup.addEventListener("click", function () {
  document.body.onclick = function () {
    if (msgPopup.classList.contains("show")) {
      msgPopup.classList.remove("show");
      document.body.style.overflow = "visible";
    }
  };
});

btnSubmit.onclick = function () {
  msgPopup.classList.add("show");
  document.body.style.overflow = "hidden";
};

btnCLoseModal.onclick = function () {
  msgPopup.classList.remove("show");
  document.body.style.overflow = "visible";
};
