const imageContainer = document.getElementById("image-container");
const pageLoader = document.getElementById("loader");

let photosArray = [];

//Unsplash API
const search = "Japan";
const count = 10;
const apiKey = "PA1ByiZokjCgb1TXlM0AXtu7ayp7Qt_KnbWwf3FM2nI";
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${search}`;

//create helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links & images, add to DOM
function displayPhotos() {
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

//on load
getPhotos();
