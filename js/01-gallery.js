import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');
const galleryMarkup = createGallery(galleryItems);

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGallery(items) {
  return items.map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `
  }).join('');
}

gallery.addEventListener('click', onItemClick)

let modalWindow

function onItemClick(event) {
    event.preventDefault();

    if(event.target.nodeName !== 'IMG') {
        return;
    }

    const modalWindow = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">`,
    {
        onShow: modalWindow => {
            document.addEventListener('keydown', onEscClick)
        },
        onClose: modalWindow => {
            document.addEventListener('keydown', onEscClick)
        }
    }
    )

    function onEscClick(e) {
        if(e.code === "Escape" && basicLightbox.visible()) {
            modalWindow.close()
        }
    }

    modalWindow.show()
}
