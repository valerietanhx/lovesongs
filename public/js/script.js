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

let dummy = [
  "taylor swift",
  "newjeans",
  "twice",
  "onf",
  "loona",
  "let's eat grandma",
  "taylor swiftman",
  "twenty one pilots",
  "tripleS",
  "the 1975",
  "tank",
  "the cab",
  "troye sivan",
  "tttt",
  "tfsklhfdskt",
  "tjlehlr",
  "twelve",
];

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a div element that will contain the items (values):*/
    a = document.createElement("div");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the div element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toLowerCase() == val.toLowerCase()) {
        /*create a div element for each matching element:*/
        b = document.createElement("div");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (div element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("artist"), dummy);
