const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");


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

  async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}
fetchCategories();

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

function createAllButtons() {
    fetchCategories().then((data) => {
        console.log(data);
        data.forEach((category) => {
            createAllButtons(category);
        });
    });
}

const filterButton = document.createElement('button');
categories.forEach(category => {

    //Création de bouttons pour chaques catégories
    const filterButton = document.createElement('button');

    //Ajout du texte sur les boutons en fonction du nom de la catégorie
    filterButton.textContent = category.name;

    //Ajout d'un ID sur chaque bouttons en fonction des catégories
    filterButton.id = category.id;

    // "filterButton" enfant lié à son parent "filtersElement"
    filtersElement.appendChild(filterButton);

    //Ajout évenement au clic du boutton affichant des éléments en fonction de la catégorie sélectionnée.
    filterButton.addEventListener('click', (event) => {
        const filteredWorks = event.target.id === 'all' ? works : works.filter(work => work.categoryId == event.target.id);
        displayWorks(filteredWorks);
    });
});