window.addEventListener("load", async function () {
  const postId = new URLSearchParams(window.location.search).get("id");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const postUrl = `https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs/${postId}`;

  try {
    const response = await fetch(postUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    if (response.ok) {
      const { data } = await response.json();

      const postTitle = document.getElementById("post-title");
      const postTags = document.getElementById("post-tags");
      const postImage = document.getElementById("post-image");
      const postDescription = document.getElementById("post-description");

      postTitle.innerText = data.title;
      postTags.innerText = data.tags.map((tag) => `#${tag}`).join(" ");
      postImage.src = data.image;
      postDescription.innerText = data.description;
    } else {
      console.error(response);
    }
  } catch (e) {
    console.error(e);
  }
});
