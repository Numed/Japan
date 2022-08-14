const inputPhoto = document.querySelectorAll(".input__photo");

inputPhoto.forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".create-card__photo");

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumb(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("active");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("active");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumb(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("active");
  });
});

function updateThumb(dropZoneElement, file) {
  let thumbELement = dropZoneElement.querySelector(".card__thumb");

  if (dropZoneElement.querySelector(".card__text")) {
    dropZoneElement.querySelector(".card__text").remove();
  }

  if (!thumbELement) {
    thumbELement = document.createElement("div");
    thumbELement.classList.add("card__thumb");
    dropZoneElement.appendChild(thumbELement);
  }

  thumbELement.dataset.label = file.name;

  if (file.type.startsWith("image/")) {
    thumbELement.style.display = "block";
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      thumbELement.style.backgroundImage = `url("${reader.result}")`;
    };
  } else {
    alert("Upload an image");
    thumbELement.style.display = "none";
  }
}
