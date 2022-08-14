const btnToggle = document.querySelector(".toggle__navbar");

btnToggle.onclick = function () {
  const icon = document.querySelector(".toggle__navbar i");
  btnToggle.classList.toggle("active");
  if (btnToggle.classList.contains("active")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
};
