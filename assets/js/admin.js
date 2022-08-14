const orderSec = document.querySelector(".order__switcher"),
  createCard = document.querySelector(".create__card"),
  orderContainer = document.querySelector(".order__container"),
  btnsClose = document.querySelectorAll(".btn__close"),
  inputTitle = document.getElementById("title"),
  inputPrice = document.getElementById("price"),
  inputRating = document.getElementById("rating"),
  inputSelection = document.getElementById("selection"),
  inputDescription = document.getElementById("description"),
  btnCreate = document.querySelector(".btn__submit"),
  deleteCard = document.querySelector(".delete__card"),
  deleteSection = document.querySelector(".delete__card-container"),
  btnsRemove = document.querySelectorAll(".btn__remove"),
  cardSec = document.querySelector(".create-card__container");

createCard.onclick = function () {
  cardSec.style.display = "block";
  orderContainer.style.display = "none";
  deleteSection.style = "none";
};

orderSec.onclick = function () {
  orderContainer.style.display = "block";
  cardSec.style.display = "none";
  deleteSection.style = "none";
};

deleteCard.onclick = function () {
  orderContainer.style.display = "none";
  cardSec.style.display = "none";
  deleteSection.style.display = "block";
};

for (let btnClose of btnsClose) {
  btnClose.onclick = function (e) {
    let target = e.target;
    const item = target.parentElement.parentElement;
    if (target.className === "btn__close") {
      if (target.classList.contains("btn__close")) {
        item.remove();
      }
    }
    let xhttp = new XMLHttpRequest(),
      customer = item.querySelector(".order__customer").textContent,
      vars = "Customer=" + customer;
    xhttp.open("POST", "assets/php/order/deleteOrder.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(vars);
  };
}

for (let btnRemove of btnsRemove) {
  btnRemove.onclick = function () {
    let parentCard = btnRemove.parentElement.parentElement;
    let cardTitle = parentCard.querySelector(".card__title").textContent;
    parentCard.remove();

    let request = new XMLHttpRequest(),
      vars = "cardTitle=" + cardTitle;
    request.open("POST", "assets/php/cards/deleteCard.php", true);
    request.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    request.send(vars);
  };
}

inputTitle.oninput = function () {
  if (inputTitle.value == "") {
    inputTitle.classList.add("shake");
  }
};

inputPrice.oninput = function () {
  if (inputPrice.value == "") {
    inputPrice.classList.add("shake");
  }
};

inputRating.oninput = function () {
  if (inputRating.value == "") {
    inputRating.classList.add("shake");
  }
};

inputSelection.oninput = function () {
  if (inputSelection.value == "") {
    inputSelection.classList.add("shake");
  }
};

inputDescription.oninput = function () {
  if (inputDescription.value == "") {
    inputDescription.classList.add("shake");
  }
};
