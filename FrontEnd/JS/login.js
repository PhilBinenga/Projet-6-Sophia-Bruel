// Récupération des balises dans le DOM

const emailInput = document.querySelector("email");
const passwordInput = document.querySelector("password");
const form = document.querySelector("input-position");
const error = document.querySelector("error-message");

// 

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const stockEmailInput = emailInput.value;
    const stockPasswordInput = passwordInput.value;
})
const fetchUsers () => {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: stockEmailInput,
          password: stockPasswordInput,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 404) {
            errorDisplay.innerHTML = "Nous n'avons pas trouvé votre adresse mail";
            form.reset();
          } else {
            errorDisplay.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
            form.reset();
          }
        })
        .then((data) => {
          if (data.token) {
            // Je sauvegarde le token dans le local storage
            sessionStorage.setItem("token", data.token);
            // Je renvoie sur la page d'accueille
            window.location.href = "./index.html";
          }
          // Je vide le formulaire
          form.reset();
        });
    });