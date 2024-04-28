// переменные

const inputName = document.getElementById("input-name");
const inputComment = document.getElementById("input-comment");
const buttonToWrite = document.getElementById("to-write");
const commentsListElement = document.getElementById("comments-list");
const listCommentsElements = document.querySelectorAll(".comment");

//Функция определения текущей даты времени:

function timeNow() {
  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  const optionsDay = { year: "2-digit", month: "numeric", day: "numeric" };
  return (
    new Date().toLocaleDateString("ru-RU", optionsDay) +
    " " +
    new Date().toLocaleTimeString("ru-RU", optionsTime)
  );
}

// массив данных

const comments = [
  {
    name: "Глеб Фокин",
    textMessage: "Это будет первый комментарий на этой странице",
    time: "12.02.22 12:18",
    inputLikes: 3,
    isLike: false,
  },
  {
    name: "Варвара Н.",
    textMessage: "Мне нравится как оформлена эта страница! ❤",
    time: "13.02.22 19:22",
    inputLikes: 75,
    isLike: false,
  },
];

// ответ на комментарий

const inputReviewListener = () => {
    const listCommentsElements = document.querySelectorAll(".comment");
for (const listCommentsElement of listCommentsElements) {
    const commentNumber = listCommentsElement.dataset.commentNumber;
    listCommentsElement.addEventListener('click', () => {
        inputComment.value = `\> ${comments[commentNumber].textMessage} \n\n ${comments[commentNumber].name}, `;
        renderComments(); 
    })
}

};

// обновление списка - рендеринг

function renderComments() {
  const commentHtml = comments
    .map((comments, index) => {
    //   let classInputLikes = "";
      return `<li data-comment-number="${index}" class="comment"><div class="comment-header"><div>${
        comments.name
      }</div><div>${
        comments.time
      }</div></div><div class="comment-body"><div class="comment-text">${
        comments.textMessage
      }</div></div>
      <div class="comment-footer"><div class="likes"><span class="likes-counter">${
        comments.inputLikes
      }</span><button data-index="${index}" data-like="${
        comments.isLike
      }" class="like-button${
        comments.inputLikes ? " -active-like" : ""
      }"></button></div></div></li>`;
    })
    .join("");

  commentsListElement.innerHTML = commentHtml;
  inputLikesListeners();
  inputReviewListener();
}

renderComments();

// событие на клик по кнопке "Написать"

buttonToWrite.addEventListener("click", () => {
  inputReviewListener();
  if (inputName.value === "" || inputComment.value === "") {
    inputName.classList.add("error");
    return;
  } else {
    comments.push({
      name: inputName.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&prime;"),
      textMessage: inputComment.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&prime;"),
      time: timeNow(),
      inputLikes: 0,
      isLike: false,
    });
    renderComments();
  }
  inputName.value = "";
  inputComment.value = "";
  inputName.classList.remove("error");
  inputComment.classList.remove("error");
});

// добавление, удаление лайков

function inputLikesListeners() {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButtonsElement of likeButtonsElements) {
    likeButtonsElement.addEventListener("click", (event) => {
        event.stopPropagation();
      const index = likeButtonsElement.dataset.index;
      if (likeButtonsElement.dataset.like === "false") {
        comments[index].inputLikes += 1;
        comments[index].isLike = true;
      } else {
        comments[index].inputLikes -= 1;
        comments[index].isLike = false;
      }
      renderComments();
    });
  }
}

console.log(comments);
