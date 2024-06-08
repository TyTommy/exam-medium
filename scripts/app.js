const postsUrl =
  "https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs/";

function createArticleElement(_id, author, title, image, description) {
  const article = document.createElement("div");
  article.className = "article";

  const articleImg = document.createElement("img");
  articleImg.alt = "Article cover image";
  article.appendChild(articleImg);

  const articleContent = document.createElement("div");
  articleContent.className = "article-content";
  article.appendChild(articleContent);

  const articleTitle = document.createElement("h3");
  articleContent.appendChild(articleTitle);

  const articleDescriptionContainer = document.createElement("div");
  articleDescriptionContainer.className = "article-description";
  articleContent.appendChild(articleDescriptionContainer);

  const articleDescription = document.createElement("p");
  articleDescriptionContainer.appendChild(articleDescription);

  const authorContainer = document.createElement("div");
  authorContainer.className = "author";
  articleContent.appendChild(authorContainer);

  const profileImg = document.createElement("img");
  profileImg.src = "assets/icons/user-profile.png";
  profileImg.alt = "Profile image";
  authorContainer.appendChild(profileImg);

  const authorDetails = document.createElement("div");
  authorContainer.appendChild(authorDetails);

  const authorName = document.createElement("h4");
  authorName.id = "author-name";
  authorDetails.appendChild(authorName);

  const authorRole = document.createElement("p");
  authorRole.id = "author-role";
  authorRole.innerText = "Author";
  authorDetails.appendChild(authorRole);

  articleTitle.onclick = goToPost(_id);
  articleTitle.innerText = title;
  articleImg.src = image;
  articleDescription.innerText = description;
  authorName.innerText = author;

  return article;
}

window.addEventListener("load", async function () {
  const carousel = document.getElementById("carousel");

  try {
    const response = await fetch(postsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (response.ok) {
      const { data } = await response.json();

      data.forEach(({ _id, title, image, description, tags }) => {
        const article = createArticleElement(
          _id,
          "Ibrohim Jalolov",
          title,
          image,
          description
        );
        carousel.appendChild(article);
      });
    } else {
      console.error(response);
    }
  } catch (e) {
    console.error(e);
  }

  $("#carousel").slick({
    dots: false,
    prevArrow: false,
    nextArrow: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

function goToPost(postId) {
  return function () {
    window.location.href = `post.html?id=${postId}`;
  };
}
