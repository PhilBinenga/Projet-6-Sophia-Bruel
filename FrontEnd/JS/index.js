const gallery = document.querySelector(".gallery");
let works = [];
let categories = [];

// Récupération de l'API //
const fetchWorks = () => {
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        works = data;
        createGallery(works);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  fetchWorks();



  // Apparition des travaux sur le DOM // 

  function createGallery(objet) {
    let galleries = "";
    for (let work of objet) {
        galleries += `
        <figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>`;  }
    gallery.innerHTML = galleries;
  }

// Création des boutons filtres par catégorie //

const fetchCategories = () => {
  fetch('http://localhost:5678/api/categories')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(category => {
      const btn = document.createElement('button')
      btn.innerHTML = category.name

      btn.addEventListener('click', () => {
        const workToDisplay = works.filter((work) => {
          return work.category.id == category.id;
        });
        createGallery(workToDisplay);
      })
      document.querySelector('.filters-container').appendChild(btn)
    });
  })
  .catch((error) => {
    console.log(error);
  });
};

fetchCategories()

function createFilters() {
  console.log()
}

document.getElementById('filterst').addEventListener('click', () => {
  createGallery(works);
});

// Si l'user est connecté //


const token = window.localStorage.getItem("token");
const btnLogin = document.querySelector(".btnLogin");
const btnLogout = document.querySelector(".btnLogout");
const editionBanner = document.querySelector(".edition");
const filtres = document.querySelector(".filters-container");
const modification = document.querySelector(".modification");
const modalButton = document.querySelector(".modal-button");

function EditMode() {
  btnLogout.classList.remove("inactive");
  btnLogin.classList.add("inactive");
  editionBanner.classList.remove("inactive");
  filtres.classList.add("inactive");
  modification.classList.remove("inactive");
}

function disableEditMode() {
  window.localStorage.removeItem("token");
  btnLogout.classList.add("inactive");
  btnLogin.classList.remove("inactive");
  editionBanner.classList.add("inactive");
  filtres.classList.remove("inactive");
  modification.classList.add("inactive")
}

if (token == null) {
  EditMode();
  btnLogout.addEventListener("click", disableEditMode);

}

// Modale //
 
const modal = document.getElementById("dialog");
const btnEdition = document.querySelector(".edition");
const btnEdition2 = document.querySelector(".btnEdition2");

btnEdition.addEventListener("click", function(){
  modal.showModal()
  showModalGallery()
})

btnEdition2.addEventListener("click", function(){
  modal.showModal()
  showModalGallery()
})

