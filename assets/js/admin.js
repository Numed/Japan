const orderSec = document.querySelector(".order__switcher"),
  createCard = document.querySelector(".create__card"),
  orderContainer = document.querySelector(".order__container"),
  btnClose = document.querySelector(".btn__close"),
  cardSec = document.querySelector(".create-card__container");

createCard.onclick = function () {
  cardSec.style.display = "block";
  orderContainer.style.display = "none";
};

orderSec.onclick = function () {
  orderContainer.style.display = "block";
  cardSec.style.display = "none";
};

btnClose.onclick = function (e) {
  let target = e.target;
  if (target.className === "btn__close") {
    if (target.classList.contains("btn__close")) {
      const item = target.parentElement.parentElement;
      item.remove();
    }
  }
};
