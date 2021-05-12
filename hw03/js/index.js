/**
 *
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 *
 * 1. Create and attach an event handler (function) to each ".image"
 * element so that when the ".image" element is clicked, the corresponding
 * image loads in the .featured image element.
 *
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 *
 * 3. If you get to the end, start at the beginning.
 *
 * 4. If you get to the beginning, loop around to the end.
 *
 *
 */

const images = [
  "images/field1.jpg",
  "images/purple.jpg",
  "images/jar.jpg",
  "images/green.jpg",
  "images/green1.jpg",
  "images/purple1.jpg",
  "images/magnolias.jpg",
  "images/daisy1.jpg",
];

let currentScreen = 0;

function changeFeaturedImg(idx) {
  const img = document.querySelector(".featured_image");

  img.style = `background-image:url('${images[idx]}')`;
}

const initScreen = () => {
  images.forEach((image, idx) => {
    document.querySelector(".cards").innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
  });

  document.querySelectorAll(".image").forEach((el) => {
    el.addEventListener("click", (e) => {
      const img = document.querySelector(".featured_image");
      const idx = e.target.dataset.index;

      changeFeaturedImg(idx);
    });
  });
};

function setupHandlers() {
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  function handleNext() {
    if (currentScreen === images.length - 1) {
      currentScreen = 0;
    } else {
      currentScreen++;
    }

    changeFeaturedImg(currentScreen);
  }

  function handlePrev() {
    if (currentScreen === 0) {
      currentScreen = images.length - 1;
    } else {
      currentScreen--;
    }

    changeFeaturedImg(currentScreen);
  }

  nextBtn.addEventListener("click", handleNext);
  prevBtn.addEventListener("click", handlePrev);

  const featuredImgContainer = document.querySelector(".featured_image");

  featuredImgContainer.addEventListener("click", handleNext);
}

initScreen();
setupHandlers();
