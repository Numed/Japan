const loginSection = document.querySelector(".login__inner"),
  btnReg = document.querySelector(".btn__reg"),
  regSection = document.querySelector(".reg__inner");

btnReg.onclick = function () {
  loginSection.style.display = "none";
  regSection.classList.add("show");
};
