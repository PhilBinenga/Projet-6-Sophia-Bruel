// VARIABLE //

const galleryElement = document.querySelector("#portfolio .gallery");
const filterDom = document.querySelector(".filters");
const token = sessionStorage.getItem("token");

// Création d'une variable constante route de l'API
const API = "http://localhost:5678/api";

// WORK //
async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// CATEGORIES // 
async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const displayWorksGallery = (works) => {
    const galleryElement = document.querySelector(".gallery"); 
    galleryElement.innerHTML = "";
    works.forEach(work => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = work.imageUrl;
        const figCaption = document.createElement("figcaption");

        figure.appendChild(image);
        figure.appendChild(figCaption);
        galleryElement.appendChild(figure);
    })
}

const filterButtons = () => {
    filters.innerHTLM = "
    <button class="btn-tous">Tous</button>
    <button class="btn-objets">Objets</button>
    <button class="btn-appartements">Appartements</button>
    <button class="btn-hotel">Hôtels & restaurants</button>
    "
};

filtersButtons();
