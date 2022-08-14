const input = document.getElementById("city");
const select = document.getElementById("select");

let rumass = [];
let uamass = [];
let ref = [];
let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (request.readyState == 4 && request.status == 200) {
    autocomplete(input, JSON.parse(request.response).ua);
    rumass = JSON.parse(request.response).ru;
    uamass = JSON.parse(request.response).ua;
    ref = JSON.parse(request.response).ref;
  }
};
request.open("GET", "assets/php/checkout/getCity.php", true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.send({});

input.oninput = function () {
  let searchData = input.value.trim();
  let request2 = new XMLHttpRequest();
  if (uamass.indexOf(searchData)) {
    if (rumass.includes(rumass[uamass.indexOf(searchData)])) {
      request2.onreadystatechange = function () {
        if (request2.readyState == 4 && request2.status == 200) {
          autocomplete(input, JSON.parse(request2.response));
          select.innerHTML = "";
          JSON.parse(request2.response).forEach((cur) => {
            let opt = document.createElement("option");
            opt.value = cur;
            opt.textContent = cur;
            select.append(opt);
          });
        }
      };
      request2.open("POST", "assets/php/checkout/getHizha.php", true);
      request2.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      request2.send(`warehouses=${ref[uamass.indexOf(searchData)]}`);
    }
  }
};
