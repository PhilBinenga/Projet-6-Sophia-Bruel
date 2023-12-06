const inputs = document.querySelectorAll("input");
const errorMessage = document.querySelector(".error-message");
const loginBtn = document.querySelector(".login-btn");
 const form = document.querySelector("input-position")


loginBtn.addEventListener("submit", async (e) => {
    const email = document.querySelector("email").value;
    const password = document.querySelector("password").value;

    e.preventDefault();

    const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Ajoute les informations d'identification dans le corps de la requête
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    sessionStorage.setItem("accessToken", data.token);
    window.location.href = "./index.html"
  }
})