/*
 * Create a list that holds all of your cards
 */

var papers = [...document.querySelectorAll(".paper")];
var storePapers = [];
var state = 0;
var ratingcount = 0;
var startTimepiece = true;
var rate = 3;
papers.map(i => {
  i.addEventListener("click", displayPapers);
});

function displayPapers() {
  if (startTimepiece == true) {
    startTimepiece = false;
    TimepieceStart();
  }
  if (!this.classList.contains('open') && storePapers.length<2) {
    this.classList.add("open", "show", "disable");
    storePapers.push(this);
    matchPapers();
  }

}
// Shuffle: used to shuffle the papers.
var boxs = document.querySelector('.boxs');
shuffle(papers).forEach(() => {
  [].forEach.call(papers, i => {
    boxs.appendChild(i);
  })
});

// match papers: used to match the papers
function matchPapers() {
  setTimeout(function() {
    if (storePapers.length == 2) {
      stateCounter();
      if (storePapers[0].children[0].className === storePapers[1].children[0].className) {
        storePapers.map(i => {
          i.classList.add("match");
          i.classList.remove("open", "show", "disable");

        });
        ratingcount++;
        if (ratingcount == 8) {
          clearInterval(int);
          win();
          // setTimeout(function () {
          //
          // }, 2000);
        }
      } else {
        storePapers.map(i => {
          i.classList.remove("open", "show", "disable");
        });
      }
      storePapers = [];
    }
  }, 500);

}
// State Counter: to count the number of moves.
var states = document.querySelector(".states");

function stateCounter() {
  state++;
  states.innerHTML = state;
  starRating();
}

// timer: used to display time.
var time = document.querySelector(".Timepiece");
var sec = 0,
  mins = 0;
var interval;

function TimepieceStart() {
  int = setInterval(function() {
    sec++;
    if (sec == 60) {
      mins++;
      sec = 0;
    }
    time.innerHTML = mins + " : " + sec;
  }, 1000);
}
// restart
function restart() {
  location.reload();
}


// stars: to display stars
var stars = [].slice.call(document.querySelectorAll('.fa-star'));

function starRating() {
  if (state >= 10) {
    stars[2].classList.add("fa-star-o");
    stars[2].classList.remove("fa-star");
    rate = rate - 1;
    console.log(rate);

  }
  if (state >= 20) {
    stars[1].classList.add("fa-star-o");
    stars[1].classList.remove("fa-star");
    rate = rate - 1;
    console.log(rate);
  }
  if (state >= 21) {
    rating = 1;
    console.log(rate);
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function win() {
  var s = [...document.querySelectorAll(".fa-star")]
  swal({
      title: "Good job!",
      text: "you won the game...congratulations! " + "\n completed game in " + state + " states." + "\n you won " + s.length + " stars\ntime used" + mins + ":" + sec,
      icon: "https://previews.123rf.com/images/anwarsikumbang/anwarsikumbang1606/anwarsikumbang160600910/59098802-you-win-comic-speech-bubble-cartoon-game-assets.jpg",
      buttons: ('play again'),
      dangerMode: false
    })
    .then(function(value) {
      location.reload();
      console.log('returned value:', value);
    });
}






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
