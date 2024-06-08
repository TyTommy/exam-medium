window.addEventListener("load", function () {
  const token = localStorage.getItem("token");

  if (!token) {
    signOut();
  } else {
    const name = localStorage.getItem("name");
    const nameHeader = document.getElementById("user-name");

    nameHeader.innerText = name;
  }
});

function signOut() {
  localStorage.clear();
  window.location.href = "/";
}

let isLoading = false;
const createNewPostUrl =
  "https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs/";

const createNewPostForm = document.getElementById("create-new-post-form");
createNewPostForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = document.getElementById("submit-button");
  const successMessage = document.getElementById("success-message");

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  let title = document.getElementById("title");
  let image = document.getElementById("image");
  let tag = document.getElementById("tag");
  let description = document.getElementById("description");

  const tags = tag.value.split(",").map((tag) => tag.trim());
  const body = {
    name,
    author: name,
    title: title.value,
    description: description.value,
    image: image.value,
    tags,
  };

  try {
    submitButton.classList.add("primary-button--loading");
    isLoading = true;

    const response = await fetch(createNewPostUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      title.value = "";
      image.value = "";
      tag.value = "";
      description.value = "";

      successMessage.hidden = false;

      setTimeout(() => {
        successMessage.hidden = true;
      }, 3000);
    } else {
      console.error(response);
    }
  } catch (e) {
    console.error(e);
  }
  isLoading = false;
  submitButton.classList.remove("primary-button--loading");
});
