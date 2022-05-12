const galleryContainer = document.querySelector(".gallery-container");
const cardCont = document.querySelector(".cards");
const galleryControls = [".left", ".right"];
const galleryItems = document.querySelectorAll(".gallery-item");
const currentCardEl = document.querySelector(".card-home.selected");

class Carousel {
  constructor(container, items, controls) {
    this.cards = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
      currentCardEl.classList.remove("selected");
    });

    this.carouselArray.slice(0, 3).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  setCurrentState(control) {
    if (control.className == "slider left") {
      this.carouselArray.unshift(this.carouselArray.pop());
      this.carouselArray[1].classList.add("selected");
      this.carouselArray[0].classList.remove("selected");
      this.carouselArray[2].classList.remove("selected");
    } else {
      this.carouselArray.push(this.carouselArray.shift());
      this.carouselArray[1].classList.add("selected");
      this.carouselArray[0].classList.remove("selected");
      this.carouselArray[2].classList.remove("selected");
    }
    this.updateGallery();
  }
  useControls() {
    const prevSlider = document.querySelector(".slider.left"),
      nextSlider = document.querySelector(".slider.right");
    const triggers = [prevSlider, nextSlider];
    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

const slider = new Carousel(cardCont, galleryItems, galleryControls);
slider.useControls();
