const msgPopup = document.querySelector(".popup__message"),
  total = document.querySelector(".total__price output"),
  iteminput = document.querySelector(".item__input"),
  inputHidden = document.querySelector("#inputHidden"),
  inputFirstName = document.getElementById("name"),
  inputSurname = document.getElementById("surname"),
  inputTel = document.getElementById("phone"),
  inputCity = document.getElementById("city"),
  selectWare = document.getElementById("select"),
  radioBtns = document.querySelectorAll(".btn__radio"),
  btnCLoseModal = document.querySelector(".btn__close-modal"),
  btnSubmit = document.querySelector(".btn__submit");

let radioValue = "Payment by upon receipt";

for (let radioBtn of radioBtns) {
  radioBtn.onchange = function () {
    if (radioBtn.checked == true) {
      radioValue = radioBtn.value;
    }
  };
}

msgPopup.addEventListener("click", function () {
  document.body.onclick = function () {
    if (msgPopup.classList.contains("show")) {
      msgPopup.classList.remove("show");
      document.body.style.overflow = "visible";
    }
  };
});

let getInfo = localStorage.getItem("items"),
  items = JSON.parse(getInfo);

iteminput.value = items.title;
inputHidden.value = items.totalPrice + "$";
total.value = items.totalPrice + "$";
iteminput.readOnly = true;

btnSubmit.onclick = function (e) {
  e.preventDefault();
  if (
    inputFirstName.value == "" &&
    inputSurname.value == "" &&
    inputTel.value == ""
  ) {
    inputFirstName.classList.add("shake");
    inputSurname.classList.add("shake");
    inputTel.classList.add("shake");
  } else if (inputFirstName.value == "") {
    inputFirstName.classList.add("shake");
  } else if (inputSurname.value == "") {
    inputSurname.classList.add("shake");
  } else if (inputTel.value == "") {
    inputTel.classList.add("shake");
  } else if (
    inputFirstName.value != "" &&
    inputSurname.value != "" &&
    inputTel.value != ""
  ) {
    let xhttp = new XMLHttpRequest(),
      args =
        "firstName=" +
        inputFirstName.value +
        "&secondName=" +
        inputSurname.value +
        "&phone=" +
        inputTel.value +
        "&city=" +
        inputCity.value +
        "&select=" +
        selectWare.value +
        "&items=" +
        iteminput.value +
        "&total=" +
        total.value +
        "&radio__btn=" +
        radioValue;
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        if (xhttp.responseText.includes("admin")) {
          window.location.href = "../../products.php";
        }
      }
    };
    xhttp.open("POST", "assets/php/order/createOrder.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(args);
    msgPopup.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  setTimeout(() => {
    inputTel.classList.remove("shake");
    inputFirstName.classList.remove("shake");
    inputSurname.classList.remove("shake");
  }, 500);
};

btnCLoseModal.onclick = function () {
  msgPopup.classList.remove("show");
  document.body.style.overflow = "visible";
};
