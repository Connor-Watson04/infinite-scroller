const imageContainer = document.getElementById("image-container");
const pageLoader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const search = "Japan";
const count = 30;
const apiKey = "PA1ByiZokjCgb1TXlM0AXtu7ayp7Qt_KnbWwf3FM2nI";
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${search}`;

//check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    pageLoader.hidden = true;
  }
}

//create helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links & images, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //create Img for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //event listner, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //put img inside <a> then both inside image-container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//get photos from API
async function getPhotos() {
  try {
    const response = await fetch(unsplashApiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch errors
  }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
