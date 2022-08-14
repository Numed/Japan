const loginSection = document.querySelector(".login__inner"),
  btnReg = document.querySelector(".btn__reg"),
  btnLogin = document.querySelector(".btn__login"),
  inputPassword = document.getElementById("password"),
  label = document.querySelectorAll(".input__field label"),
  inputEmail = document.getElementById("login"),
  errorMsg = document.querySelectorAll(".error-text"),
  regSection = document.querySelector(".reg__inner");

if (document.querySelector(".disclaimer")) {
  document.querySelector(".disclaimer").style.display = "none";
}

inputEmail.oninput = function () {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!inputEmail.value.match(pattern)) {
    errorMsg[0].textContent = "Enter a valid email";
    errorMsg[0].style.display = "inline";
  } else {
    errorMsg[0].style.display = "none";
  }

  if (inputEmail.value != "") {
    label[0].style.transform = "translate(-10px, -35px)";
  } else {
    label[0].style.transform = "translate(0, 0)";
  }
};

inputPassword.oninput = function () {
  if (inputPassword.value != "") {
    label[1].style.transform = "translate(-10px, -35px)";
  } else {
    label[1].style.transform = "translate(0, 0)";
  }
};

btnLogin.onclick = function (e) {
  e.preventDefault();
  if (inputPassword.value == "" && inputEmail.value == "") {
    errorMsg[0].classList.add("visible");
    inputEmail.classList.add("shake");
    errorMsg[1].classList.add("visible");
    inputPassword.classList.add("shake");
  } else if (inputEmail.value == "") {
    errorMsg[0].classList.add("visible");
    inputEmail.classList.add("shake");
  } else if (inputPassword.value == "") {
    errorMsg[1].classList.add("visible");
    inputPassword.classList.add("shake");
  }

  setTimeout(() => {
    inputEmail.classList.remove("shake");
    inputPassword.classList.remove("shake");
  }, 500);

  let xhttp = new XMLHttpRequest(),
    arg = "Login=" + inputEmail.value + "&Password=" + inputPassword.value;
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      if (xhttp.responseText.includes("admin")) {
        window.location.href = "../../admin.php";
      } else {
        errorMsg[0].textContent = "Email or password is invalid";
        errorMsg[0].style.display = "inline";
      }
    }
  };
  xhttp.open("POST", "assets/php/DB/signIn.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(arg);
};
