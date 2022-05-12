"use strict";

const cardInner = document.querySelector(".cart__inner");
const ratings = document.querySelectorAll(".rating");
const rangeInput = document.querySelectorAll(".range__input input"),
  progress = document.querySelector(".range .progress"),
  priceInput = document.querySelectorAll(".selection__inputs input");

const btnCart = document.querySelector(".btn__icon"),
  btnMore = document.querySelector(".btn__load-more"),
  btnToggle = document.querySelector(".toggle__navbar"),
  btnBack = document.querySelector(".btn__back"),
  btnFilter = document.querySelector(".filter__icon"),
  btnScroll = document.querySelector(".btn__scroll"),
  btnsAdd = document.querySelectorAll(".btn__add"),
  btnSubmit = document.querySelector(".btn__submit"),
  btnsBuy = document.querySelectorAll(".btn__buy"),
  btnsView = document.querySelectorAll(".btn__view"),
  btnClose = document.querySelector(".btn__close"),
  btnCLoseModal = document.querySelector(".btn__close-modal"),
  btnsDelete = document.querySelectorAll(".btn__delete"),
  btnCheckout = document.querySelector(".btn__checkout"),
  titleEmpty = document.querySelector(".title__empty"),
  itemList = document.querySelector(".inner__items"),
  items = document.querySelectorAll(".inner__item"),
  inputSearch = document.querySelector(".input__search"),
  msgPopup = document.querySelector(".popup__message"),
  popup = document.querySelector(".popup");

const selectContainer = document.querySelector(".select__container"),
  cardsContainer = document.querySelectorAll(".card"),
  cards = document.querySelectorAll(".card"),
  filterMenu = document.querySelector(".filter"),
  ratingValues = document.querySelectorAll(".rating__value");

let priceGap = 100,
  counters = document.querySelectorAll(".counter");

let MasCard = [],
  item = 0;
cards.forEach((cur) => {
  if (item > 3) {
    MasCard.push(cur);
  }
  item++;
});

window.onload = function () {
  btnToggle.onclick = function ToggleOpen() {
    const icon = document.querySelector(".toggle__navbar i");
    btnToggle.classList.toggle("active");
    if (btnToggle.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  };

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
};

for (let btnAdd of btnsAdd) {
  btnAdd.addEventListener("click", addToCart);
}

for (let btnBuy of btnsBuy) {
  btnBuy.addEventListener("click", addToCart);
}

for (let index = 0; index < btnsView.length; index++) {
  const btnView = btnsView[index];
  btnView.onclick = function () {
    console.log(btnView);
    popup.classList.add("show");
  };
}

btnClose.onclick = function () {
  popup.classList.remove("show");
};

btnCart.onclick = function () {
  btnCart.classList.add("open");
  for (let index = 0; index < counters.length; index++) {
    const counter = counters[index];
    counter.style.display = "none";
  }
};

btnBack.onclick = function () {
  btnCart.classList.remove("open");
  for (let index = 0; index < counters.length; index++) {
    const counter = counters[index];
    counter.style.display = "block";
  }
};

btnFilter.onclick = function () {
  btnFilter.classList.toggle("toggle");

  if (btnFilter.classList.contains("toggle")) {
    filterMenu.style.display = "inline-block";
  } else {
    filterMenu.style.display = "none";
  }
};

btnMore.onclick = function () {
  for (let i = 0; i < MasCard.length; i++) {
    if (i < 4) {
      MasCard[i].style.display = "flex";
    }
  }
  MasCard.splice(0, 4);
  if (MasCard.length === 0) {
    btnMore.style.display = "none";
  }
};

inputSearch.oninput = function () {
  const cardTitle = document.querySelectorAll(".card");
  let searchData = inputSearch.value.trim();
  if (searchData != "") {
    cardTitle.forEach(function (e) {
      if (e.textContent.search(searchData) == -1) {
        e.classList.add("hide");
      } else {
        e.classList.remove("hide");
      }
    });
  } else {
    cardTitle.forEach(function (e) {
      e.classList.remove("hide");
      btnMore.style.display = "none";
    });
  }
};

selectContainer.onchange = function () {
  let selectSort = selectContainer.value,
    ratingArr = [],
    rateMas = [],
    ratePopular = [];
  for (let i = ratingValues.length - 1; i >= 0; i--) {
    rateMas.push(ratingValues[i].value);
    ratePopular.push(ratingValues[i].value);
    ratingArr.push({
      card: cardsContainer[i],
      rate: ratingValues[i].value,
    });
  }
  if (selectSort === "high to low") {
    rateMas.sort(function (a, b) {
      return b - a;
    });
    for (let i = 0; i < rateMas.length; i++) {
      ratingArr.map((cur) => {
        if (cur.rate === rateMas[i]) {
          cur.card.style.order = rateMas.indexOf(rateMas[i]);
        }
      });
    }
  } else if (selectSort === "low to high") {
    rateMas.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < rateMas.length; i++) {
      ratingArr.map((cur) => {
        if (cur.rate === rateMas[i]) {
          cur.card.style.order = rateMas.indexOf(rateMas[i]);
        }
      });
    }
  } else {
    for (let i = 0; i < ratePopular.length; i++) {
      ratingArr.map((cur) => {
        if (cur.rate === ratePopular[i]) {
          cur.card.style.order = ratePopular.indexOf(ratePopular[i]);
        }
      });
    }
  }
};

if (ratings.length > 0) {
  initRatings();
}

//Основна функція
function initRatings() {
  let ratingActive, ratingValue;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  //Ініціалізація конкретний рейтинг
  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();
    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }

  //Ініціалізація змінних
  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }

  //Зміна ширини активних зірок
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating__item");
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        initRatingVars(rating);
        ratingValue.innerHTML = index + 1;
        setRatingActiveWidth();
      });
    }
  }
}

//Slider price
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input__min") {
        rangeInput[0].value = minPrice;
        progress.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        progress.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
    let massCard = [];
    cards.forEach((el) => {
      massCard.push({
        el: el,
        price: el.querySelector(".card__price"),
      });
    });
    for (let i = 0; i < massCard.length; i++) {
      let cardPrice = +massCard[i].price.textContent.replace("$", "");
      if (cardPrice <= maxPrice && cardPrice >= minPrice) {
        massCard[i].el.style.display = "flex";
      } else {
        massCard[i].el.style.display = "none";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);
    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range__min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
    let massCard = [];
    cards.forEach((el) => {
      massCard.push({
        el: el,
        price: el.querySelector(".card__price"),
      });
    });
    for (let i = 0; i < massCard.length; i++) {
      let cardPrice = +massCard[i].price.textContent.replace("$", "");
      if (cardPrice <= maxVal && cardPrice >= minVal) {
        massCard[i].el.style.display = "flex";
      } else {
        massCard[i].el.style.display = "none";
      }
    }
  });
});

itemList.addEventListener("click", deleteItem);

function deleteItem(e) {
  let target = e.target;
  if (target.className === "btn__delete") {
    if (target.classList.contains("btn__delete")) {
      const item = target.parentElement;
      item.remove();
    }
  }

  for (let index = 0; index < counters.length; index++) {
    const counter = counters[index];
    if (counter.textContent > 0) {
      counter.textContent--;
    } else if (counter.textContent <= 0) {
      counter.textContent = 0;
      titleEmpty.style.display = "block";
      btnCheckout.style.display = "none";
    } else if (counter.textContent == "9+") {
      let count = counter.textContent.replace("+", "");
      counter.textContent = +count;
    } else {
      btnCheckout.style.display = "none";
      titleEmpty.style.display = "block";
    }
  }
}

function addToCart() {
  for (let index = 0; index < counters.length; index++) {
    const counter = counters[index];

    if (counter.textContent >= 9) {
      counter.textContent = 9 + "+";
    } else if (counter.textContent == "9+") {
      return;
    } else {
      counter.textContent++;
    }
  }

  titleEmpty.style.display = "none";
  btnCheckout.style.display = "block";
  let btnDelete = document.createElement("a"),
    item = document.createElement("li"),
    icon = document.createElement("i"),
    itemTitle = document.createElement("a"),
    itemImg = document.createElement("img");
  itemImg.src = "assets/img/items/Tea.png";
  itemImg.alt = "Tea";
  itemTitle.textContent = "Tea";
  btnDelete.classList.add("btn__delete");
  icon.classList.add("fas", "fa-times");
  item.classList.add("inner__item");
  itemTitle.classList.add("item__title");
  btnDelete.append(icon);
  item.append(itemImg, itemTitle, btnDelete);
  itemList.append(item);
}

function scrollItem() {
  window.scrollTo({
    top: 730,
    behavior: "smooth",
  });
}
