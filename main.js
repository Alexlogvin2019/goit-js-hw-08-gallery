"use strict";

import gallery from "./gallery-items.js";

const letUl = document.querySelector("ul.js-gallery");
const lightbox = document.querySelector(".lightbox");
//const btn = document.querySelector('[data-action="close-lightbox"]');

function insertImages(arr) {
  const arrImg = arr.map(key => {
    const imgEl = document.createElement("li");
    imgEl.classList.add("gallery__item");
    imgEl.insertAdjacentHTML(
      "afterbegin",
      `<a class="gallery__link" href='${key.original}'>
      <img class="gallery__image" 
        src='${key.preview}' 
        data-source='${key.original}'
        alt='${key.description}'>
        </a>`
    );
    return imgEl;
  });
  return letUl.prepend(...arrImg);
}
let prewImg;

function onClick(e) {
  e.preventDefault();
  if (e.target.localName === "img") {
    lightbox.classList.add("is-open");
    lightbox.querySelector(".lightbox__image").src = e.target.dataset.source;
    lightbox.querySelector(".lightbox__image").alt = e.target.alt;
  }
}

function onClose(e) {
  if (e.type === "click") {
    if (e.target.tagName === "IMG") {
      return;
    }
    lightbox.classList.remove("is-open");
  } else {
    if (e.key === "Escape") {
      lightbox.classList.remove("is-open");
    }
    if (e.key === "ArrowLeft") {
      const left = function(src) {
        let fIndx = -1;
        const arrLe = gallery.length-1;
        const adrr = Object.values(gallery).find((key, i) => {
          fIndx = i - 1;
          if (fIndx < 0) {
            fIndx = arrLe;
          }
          return key.original === src;
        });
        const adrrLet = gallery[fIndx].original;
        return adrrLet;
      };
      lightbox.querySelector(".lightbox__image").src = left(
        lightbox.querySelector(".lightbox__image").src
      );
    } else if (e.key === "ArrowRight") {
      const right = function(src) {
        let fIndx = 1;
        const arrLe = gallery.length -1;
        const adrr = Object.values(gallery).find((key, i) => {
          fIndx = i + 1;
          if (fIndx > arrLe) {
            fIndx = 0;
          }
          return key.original === src;
        });
        const adrrLet = gallery[fIndx].original;
        return adrrLet;
      };
      lightbox.querySelector(".lightbox__image").src = right(
        lightbox.querySelector(".lightbox__image").src
      );
    }
  }
}

insertImages(gallery);
letUl.addEventListener("click", onClick);
// btn.addEventListener("click", onClose);
document.addEventListener("keydown", onClose);
lightbox.addEventListener("click", onClose);
