const loginUrl =
  "https://blogpost-server-production-d92d.up.railway.app/api/v1/user/login";
const signUpUrl =
  "https://blogpost-server-production-d92d.up.railway.app/api/v1/user/register";

const passwordToggle = document.querySelector(".password-toggle img");
const passwordInput = document.getElementById("password");

passwordToggle.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

let isLoading = false;

const loginForm = document.getElementById("login-form");
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (isLoading) return;

  const submitButton = document.getElementById("submit-button");
  const errorMessage = document.getElementById("error-message");

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const body = {
    email: email.value,
    password: password.value,
  };

  try {
    submitButton.classList.add("primary-button--loading");
    errorMessage.hidden = true;
    isLoading = true;

    const response = await fetch(loginUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const reponseBody = await response.json();
      localStorage.setItem("token", reponseBody.data.token);
      localStorage.setItem("name", reponseBody.data.user.name);
      localStorage.setItem("email", reponseBody.data.user.email);
      localStorage.setItem("role", reponseBody.data.user.role);

      window.location.href = "/dashboard.html";
    } else {
      errorMessage.hidden = false;
      console.error(response);
    }
  } catch (e) {
    errorMessage.hidden = false;
    console.error(e);
  }
  isLoading = false;
  submitButton.classList.remove("primary-button--loading");
});

const signupForm = document.getElementById("signup-form");
signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = document.getElementById("submit-button");
  const errorMessage = document.getElementById("error-message");

  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const body = {
    name: firstName.value + " " + lastName.value,
    email: email.value,
    password: password.value,
  };

  try {
    submitButton.classList.add("primary-button--loading");
    errorMessage.hidden = true;
    isLoading = true;

    const response = await fetch(signUpUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      window.location.href = "/login.html";
    } else {
      const error = await response.json();
      console.log({ error });
      errorMessage.innerText = error.errors[0].msg;
      errorMessage.hidden = false;
      console.error(response);
    }
  } catch (e) {
    errorMessage.hidden = false;
    console.error(e);
  }
  isLoading = false;
  submitButton.classList.remove("primary-button--loading");
});
