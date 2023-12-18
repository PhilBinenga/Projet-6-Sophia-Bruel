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



  // Apparition des travaux sur le DOM et la modale// 

  function createGallery(objet) {
    let galleries = "";
    let galleryModale =""
    for (let work of objet) {
        galleries += `
        <figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>`;  }

    
    for (let work of objet) {
      galleryModale += `
      <figure>
      <img src="${work.imageUrl}" alt="${work.title}">
      <i class="fa-solid fa-trash-can" name="${work.id}"></i>
      <figcaption>${work.title}</figcaption>
      </figure>`;
    
    }
  gallery.innerHTML = galleries;
  document.getElementById("modalGallery").innerHTML = galleryModale

  // Fonction delete work //

  const deleteRequest = {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${token}`
    }
};
  
  document.querySelectorAll('.fa-trash-can').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const workId = elem.getAttribute("data-id");
      fetch(`http://localhost:5678/api/works/${workId}`, deleteRequest)
      .then((respons) => {
        if (respons.ok) {
          console.log("Projet supprimé avec succès !");
          elem.parentElement.remove();
          const deleteFigure = document.querySelector(`figure[data-id="${workId}"]`);
          deleteFigure.remove();
        }
      })

    })
  })
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

if (token !== null) {
  EditMode();
  btnLogout.addEventListener("click", disableEditMode);  

}

// Modale //
 
const dialog = document.getElementById("modal");
const btnEdition = document.querySelector(".btnEdition");
const modalGallery = document.getElementById("modalGallery")

btnEdition.addEventListener("click", function(){
  modal.showModal()
});

// Modale ajout  //

const addPicsBtn = document.getElementById("addPicsBtn");
const modalAdd = document.querySelector(".modalAdd");

addPicsBtn.addEventListener("click", function() {
  modalAdd.showModal()
});

// Fermeture modale //
const close2 = document.querySelector(".closeModal2");

close2.addEventListener("click", function(){
  modalAdd.close()
});


