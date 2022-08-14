"use strict";

const cardInner = document.querySelector(".cart__inner");
const ratings = document.querySelectorAll(".rating");
const rangeInput = document.querySelectorAll(".range__input input"),
  progress = document.querySelector(".range .progress"),
  priceInput = document.querySelectorAll(".selection__inputs input");

const btnCart = document.querySelector(".btn__icon"),
  btnMore = document.querySelector(".btn__load-more"),
  btnBack = document.querySelector(".btn__back"),
  btnFilter = document.querySelector(".filter__icon"),
  btnScroll = document.querySelector(".btn__scroll"),
  btnsAdd = document.querySelectorAll(".btn__add"),
  btnBuy = document.querySelector(".btn__buy"),
  btnsView = document.querySelectorAll(".btn__view"),
  btnClose = document.querySelector(".btn__close"),
  btnsDelete = document.querySelectorAll(".btn__delete"),
  btnCheckout = document.querySelector(".btn__checkout"),
  btnsCheckbox = document.querySelectorAll(".checkbox"),
  titleEmpty = document.querySelector(".title__empty"),
  itemList = document.querySelector(".inner__items"),
  items = document.querySelectorAll(".inner__item"),
  itemsTitle = document.querySelectorAll(".item__title"),
  inputSearch = document.querySelector(".input__search"),
  popup = document.querySelector(".popup");

const selectContainer = document.querySelector(".select__container"),
  cardsContainer = document.querySelectorAll(".card"),
  cards = document.querySelectorAll(".card"),
  filterMenu = document.querySelector(".filter"),
  priceContainer = document.querySelector(".price__container"),
  cardContainer = document.querySelector(".card__container"),
  cardDescription = document.querySelector(".card__description"),
  ratingValues = document.querySelectorAll(".rating__value");

let priceGap = 100,
  priceInner = document.querySelector(".total__price span"),
  counters = document.querySelectorAll(".counter"),
  numberForProducts = 0,
  priceCount = 0;

let MasCard = [],
  Massive = [],
  selection = [],
  arr = [],
  selectedValue,
  iteration = 0,
  item = 0;
cards.forEach((cur) => {
  if (item > 3) {
    MasCard.push(cur);
    cur.style.display = "none";
  }
  item++;
});

window.onload = function () {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index],
      btnCardView = card.querySelector(".btn__view");
    btnCardView.onclick = function () {
      let cardSrc = card.querySelector(".card__img img").src,
        cardAlt = card.querySelector(".card__img img").alt,
        cardTitle = card.querySelector(".card__title").textContent,
        cardPrice = card.querySelector(".card__price").textContent;

      let popupImgSrc = cardContainer.querySelector(".card__img img"),
        popupImgAlt = cardContainer.querySelector(".card__img img"),
        popupTitle = cardContainer.querySelector(".card__title"),
        popupDescrTitle = document.querySelector(".description__title"),
        popupPrice = cardContainer.querySelector(".card__price");

      popupImgSrc.src = cardSrc;
      popupImgAlt.alt = cardAlt;
      popupTitle.textContent = cardTitle;
      popupDescrTitle.textContent = cardTitle;
      popupPrice.textContent = cardPrice;
      popup.classList.add("show");

      let request = new XMLHttpRequest(),
        lets = "popup=" + cardTitle;
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          mySelect.innerHTML = "";
          JSON.parse(request.response)[0]
            .selectValue.split(", ")
            .forEach((cur) => {
              let opt = document.createElement("option");
              opt.value = cur;
              opt.textContent = cur;
              mySelect.append(opt);
            });
        }
      };
      request.open("POST", "assets/php/popup/getOptions.php", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      request.send(lets);

      let xhttp = new XMLHttpRequest(),
        descr = "desc=" + cardTitle;
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          let description = JSON.parse(xhttp.response)[0].description;
          cardDescription.textContent = description;
        }
      };
      xhttp.open("POST", "assets/php/popup/getDescription.php", true);
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send(descr);
    };
  }
};

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

itemList.addEventListener("click", deleteItem);

for (let btnCheckbox of btnsCheckbox) {
  let checkBox = btnCheckbox.value;
  btnCheckbox.onchange = function () {
    if (btnCheckbox.checked) {
      cardsContainer.forEach(function (e) {
        if (e.textContent.search(checkBox) == -1) {
          e.classList.add("hide");
        } else {
          e.classList.remove("hide");
        }
      });
    } else {
      cardsContainer.forEach(function (e) {
        e.classList.remove("hide");
        btnMore.style.display = "none";
      });
    }
  };
}

inputSearch.oninput = function () {
  const cardTitle = document.querySelectorAll(".card");
  let searchData = inputSearch.value.trim().toLowerCase();
  if (searchData != "") {
    cardTitle.forEach(function (e) {
      if (e.textContent.toLowerCase().search(searchData) == -1) {
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
      if (
        cardPrice <= priceInput[1].value &&
        cardPrice >= priceInput[0].value
      ) {
        massCard[i].el.style.display = "flex";
      } else {
        massCard[i].el.style.display = "none";
      }
    }
  });
});

function deleteItem(e) {
  let target = e.target;
  if (target.className === "btn__delete") {
    if (target.classList.contains("btn__delete")) {
      const item = target.parentElement;
      let cardPrice = item.querySelector("h3.price__count").textContent,
        cardTitle = item.querySelector(".item__title").textContent,
        totalPrice = document.querySelector(".total__price span");
      item.remove();
      numberForProducts--;
      if (numberForProducts < 9) {
        counters[0].textContent--;
        counters[1].textContent--;
      }
      if (numberForProducts === 0) {
        btnCheckout.style.display = "none";
        titleEmpty.style.display = "block";
        priceContainer.style.display = "none";
      }
      if (numberForProducts === 9) {
        let count = counters[1].textContent.replace("+", "");
        counters[1].textContent = count;
        counters[0].textContent = count;
      }
      let count = +cardPrice.replace("$", "");
      priceCount -= count;

      let itemsCart = JSON.parse(localStorage.getItem("items")),
        itemsTitle = itemsCart.title,
        itemsPrice = itemsCart.totalPrice;
      itemsPrice -= count;
      priceCount = itemsPrice;
      totalPrice.textContent = priceCount + "$";

      arr.splice(Massive.indexOf(cardTitle), 1);
      Massive.splice(Massive.indexOf(cardTitle), 1);
      arr.join(",");

      const cartItems = {
        title: arr.map((field) => field.title + " " + field.option).toString(),
        totalPrice: priceCount,
      };

      localStorage.setItem("items", JSON.stringify(cartItems));
    }
  }
}

for (let index = 0; index < cards.length; index++) {
  const card = cards[index];
  let btn = card.querySelector(".btn__add");
  btn.addEventListener("click", () => {
    addCart(card);
  });
}

btnBuy.addEventListener("click", () => {
  addCart(cardContainer);
});

function addCart(card) {
  let btnDelete = document.createElement("a"),
    cardSrc = card.querySelector(".card__img img").src,
    cardAlt = card.querySelector(".card__img img").alt,
    cardTitle = card.querySelector(".card__title").textContent,
    cardPrice = card.querySelector(".card__price").textContent,
    priceNumber = document.createElement("h3"),
    item = document.createElement("li"),
    icon = document.createElement("i"),
    itemTitle = document.createElement("a"),
    itemImg = document.createElement("img");
  priceCount += +cardPrice.replace("$", "");
  priceInner.textContent = priceCount + "$";

  itemImg.src = cardSrc;
  itemImg.alt = cardAlt;
  itemTitle.textContent = cardTitle;
  priceNumber.classList.add("price__count");
  priceNumber.textContent = cardPrice;

  Massive.push(cardTitle);
  if (document.getElementById("mySelect") && popup.classList.contains("show")) {
    let selectContainer = document.getElementById("mySelect");
    selectedValue = selectContainer.value;
    selectContainer.onchange = function () {
      selectedValue = selectContainer.value;
    };
    selection.push(selectedValue);
  } else {
    selectedValue = "N/C";
    selection.push(selectedValue);
  }

  arr.push({
    title: Massive[Massive.length - 1],
    option: selection[selection.length - 1],
  });

  const cartItems = {
    title: arr.map((field) => field.title + " " + field.option).toString(),
    totalPrice: priceCount,
  };
  localStorage.setItem("items", JSON.stringify(cartItems));

  btnDelete.classList.add("btn__delete");
  icon.classList.add("fas", "fa-times");
  item.classList.add("inner__item");
  itemTitle.classList.add("item__title");
  btnDelete.append(icon);
  item.append(itemImg, itemTitle, priceNumber, btnDelete);
  itemList.append(item);

  if (numberForProducts >= 9) {
    counters[0].textContent = 9 + "+";
    counters[1].textContent = 9 + "+";
    numberForProducts++;
  } else {
    counters[0].textContent++;
    counters[1].textContent++;
    numberForProducts++;
  }

  titleEmpty.style.display = "none";
  btnCheckout.style.display = "block";
  priceContainer.style.display = "flex";
}
