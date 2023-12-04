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

// Création des boutons par catégorie //

async function fetchCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  return await response.json();
}
fetchCategories();

// Filtres //

document.getElementById('filterst').addEventListener('click', () => {
  createGallery(works);
});

document.getElementById('filterso').addEventListener('click', () => {
  const objets = works.filter((event) => {
    return event.category.id == 1;
  });
  createGallery(objets);
});

document.getElementById('filtersa').addEventListener('click', () => {
  const appartements = works.filter((event) => {
    return event.category.id == 2;
  });
  createGallery(appartements);
});

document.getElementById('filtersh').addEventListener('click', () => {
  const hotels = works.filter((event) => {
    return event.category.id == 3;
  });
  createGallery(hotels);
});