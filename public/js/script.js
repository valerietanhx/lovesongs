// index.html

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/stories")
    .then((response) => response.json())
    .then((stories) => {
      const storyContainer = document.getElementById("stories");

      stories.forEach((story) => {
        const card = document.createElement("div");
        card.className = "glass story-home";
        card.innerHTML = `
          <p class="story__artist">${story.artist}</p>
          <p class="story__song">${story.song}</p>
          <p class="story__memory">${story.memory}</p>
          <p class="story__author">${story.author}</p>
        `;
        storyContainer.appendChild(card);
      });
    });
});

function getRandomStory() {
  stories = document.getElementsByClassName("story-home");
  console.log(stories);
  randomIndex = Math.floor(Math.random() * stories.length);
  console.log(randomIndex);
  for (i = 0; i < stories.length; i++) {
    console.log(stories[i]);
    if (i != randomIndex) {
      stories[i].style.display = "none";
    } else {
      stories[i].style.display = "";
    }
  }
  if (!resetButtonOn) {
    if (searchBarOn) {
      fadeOutSearchBar();
    }
    fadeInResetButton();
  }
}

function resetRandom() {
  stories = document.getElementsByClassName("story-home");
  for (i = 0; i < stories.length; i++) {
    stories[i].style.display = "";
  }
  fadeOutResetButton();
}

let searchBarOn = false; // hidden by default
function toggleSearchBar() {
  if (searchBarOn) {
    fadeOutSearchBar();
  } else {
    if (resetButtonOn) {
      resetRandom();
    }
    fadeInSearchBar();
  }
}

function fadeOutSearchBar() {
  let searchBox = document.getElementById("search-box");
  let searchWrapper = document.getElementById("search-wrapper");
  searchBox.disabled = true;
  searchWrapper.style.opacity = 0;
  searchWrapper.style.visibility = "hidden";
  searchBarOn = !searchBarOn;
}

function fadeInSearchBar() {
  let searchBox = document.getElementById("search-box");
  let searchWrapper = document.getElementById("search-wrapper");
  searchBox.value = "";
  searchBox.disabled = false;
  searchWrapper.style.opacity = 1;
  searchWrapper.style.visibility = "visible";
  searchBarOn = !searchBarOn;
}

let resetButtonOn = false; // hidden by default
function toggleResetButton() {
  if (resetButtonOn) {
    fadeOutResetButton();
  } else {
    if (searchBarOn) {
      fadeOutSearchBar();
    }
    fadeInResetButton();
  }
}

function fadeOutResetButton() {
  let resetButton = document.getElementById("reset-button");
  let resetWrapper = document.getElementById("reset-wrapper");
  resetButton.disabled = true;
  resetButton.style.cursor = "auto";
  resetWrapper.style.opacity = 0;
  resetWrapper.style.visibility = "hidden";
  resetButtonOn = !resetButtonOn;
}

function fadeInResetButton() {
  let resetButton = document.getElementById("reset-button");
  let resetWrapper = document.getElementById("reset-wrapper");
  resetButton.disabled = false;
  resetButton.style.cursor = "pointer";
  resetWrapper.style.opacity = 1;
  resetWrapper.style.visibility = "visible";
  resetButtonOn = !resetButtonOn;
}

function searchStories() {
  let searchBox = document.getElementById("search-box");
  searchInput = searchBox.value.toLowerCase();
  stories = document.getElementsByClassName("story-home");
  selected = document.getElementById("search-filter").value;

  for (i = 0; i < stories.length; i++) {
    story = stories[i];
    if (selected === "all") {
      storyText = story.getElementsByTagName("p");
    } else {
      storyText = story.getElementsByClassName(`story__${selected}`);
    }

    storyTextArray = [...storyText].map(
      (elem) => elem.textContent || elem.innerText
    );
    if (
      storyTextArray.some(
        (text) => text.toLowerCase().indexOf(searchInput) > -1
      )
    ) {
      story.style.display = "";
    } else {
      story.style.display = "none";
    }
  }
}