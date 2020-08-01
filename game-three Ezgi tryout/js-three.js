//cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]; //spliting up the list card in it seperate items

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard); //rotates the cards
  card.addEventListener("click", cardOpen); // checks if 2 cards matching or not
}
// displayCard is a function I'll define below.
//It will say all the things happen when I'll click the cards
//In the code block above, the cards' array[1] was created and the for loop helps to loop through each card till the full length of cards array is covered.
// Each loop will add an event listener which listens for a click on the card and runs the displayCard function on click.

//below: creation of function "displayCard
//this function is called when a card is clicked
//it adds or removes classes to the cards which therefore changes its styling
// "this. means only the card I click will be change
//classList is calling all the classes from HTML for this card
//toggle means add or remove the class
function displayCard() {
  this.classList.toggle("open"); //change the style to an "open" "shown" card
  this.getElementsByTagName("img")[0].classList.toggle("open"); //add class to the img to rotate it
  this.getElementsByTagName("img")[1].classList.toggle("open");
  this.classList.toggle("disabled"); //disables the card. You cannot click on it anymore.

  // console.log(this.getElementsByTagName("img"));
}
//classes to be defined in CSS
// Fisher-Yates (aka Knuth) Shuffle has invented the below function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const carddeck = document.querySelector(".memory-game-Ezgi");
function startGame() {
  let shuffleCards = shuffle(cards);
  for (let i = 0; i < shuffleCards.length; i++) {
    carddeck.appendChild(shuffleCards[i]); // pushing back the shuffled cards to HTML by adding them as a child to the parent div
  }
}
//In the code above is the startGame function and it will shuffle cards and display each card in the deck on game board.
//Since we know the startGame function shuffles the card in order to shuffle the cards on load, we add this to our JS:

window.onload = startGame();
//Simply saying once this window (page) is loaded, run the startGame function.

//add opened cards to openedCards list and check if cards are match or not
let openedCards = []; // created empty array
function cardOpen() {
  openedCards.push(this); //it adds the cards which is opened to an array list openedCards
  console.log(openedCards);
  if (openedCards.length == 2) {
    //moveCounter();
    let source1 = openedCards[0]
      .getElementsByTagName("img")[0]
      .getAttribute("src");
    let source2 = openedCards[1]
      .getElementsByTagName("img")[0]
      .getAttribute("src");
    // console.log(source1, source2);
    if (source1 == source2) {
      matched();
    } else {
      unmatched();
    }
  }
}

//for when cards match
function matched() {
  openedCards[0].classList.add("match"); //adding a new style to the 2 cards: green + animation
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("open"); // removing the old style in this case blue
  openedCards[1].classList.remove("open");
  openedCards = []; // it is emptying the array of opened cards
}
//for when cards don't match
function unmatched() {
  openedCards[0].classList.add("unmatch"); //adding a new style to the 2 cards: red + animation
  openedCards[1].classList.add("unmatch");
  //make it impossible to click to card while the time out is running otherwise it gives a bug
  disable();
  //1sec later turn around the cards back to the original logo
  setTimeout(function () {
    openedCards[0].classList.remove("open", "unmatch"); //remove the added styles from the cards
    openedCards[1].classList.remove("open", "unmatch");
    openedCards[0].getElementsByTagName("img")[0].classList.remove("open"); //remove the added styles from the imgs 0=front 1=backimg
    openedCards[1].getElementsByTagName("img")[1].classList.remove("open");
    openedCards[1].getElementsByTagName("img")[0].classList.remove("open");
    openedCards[0].getElementsByTagName("img")[1].classList.remove("open");
    //make the cards clickable again except for the matched ones
    enable();
    openedCards = []; //after the match and unmatched check empthy the array again for the next 2 cards
  }, 1100);
}
//disable the cards temporarily
function disable() {
  for (i = 0; i < cards.length; i++) {
    cards[i].classList.add("disabled");
  }
}
//enable all cards again, then disable the matched ones
function enable() {
  for (i = 0; i < cards.length; i++) {
    cards[i].classList.remove("disabled");
  }
  let matchedCards = document.getElementsByClassName("match");
  for (i = 0; i < matchedCards.length; i++) {
    matchedCards[i].classList.add("disabled");
  }
}
