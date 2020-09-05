/* eslint-disable no-unused-vars */
'use strict';

// =/= FUNCTION IMPORT =/=

// import { knuthShuffle } from './modules/knuth-shuffle.js'; // thanks to https://www.youtube.com/watch?time_continue=225&v=s9kNndJLOjg&feature=emb_logo for the walk-through to get this working.

// === VARIABLES TO HAVE AROUND ===

let number = 1;
Card.deck = [];
let gameDeck = [];
var startTime;
var endTime;

var clickCounter = 0;
var pairCounter = 0;

var stringyUser = localStorage.getItem('userData');
var userData = JSON.parse(stringyUser);

var userName = userData.name;
var mode = userData.difficulty;
var theme = userData.theme;

// -Fill game board with Style and Difficulty settings from User Object: Wrapped into other functions
// -Based on Difficulty, fill Array A with Difficulty # of Cards from Card Constructor: went different direction for logic, no long needed.

// -Fill Array B with an exact copy of Array A cards: went different direction for logic, no long needed.
// -Pull from Array A & B to fill game grid // went different direction for logic, no long needed.

var $sidebarUsername = $('#name');
$sidebarUsername.text(userName);

var $sidebarDifficulty = $('#mode');
$sidebarDifficulty.text(mode);

// -Preferences will be retrieved from destringifyed User Object above)

var $allCards = $('.memory-card');

// for (var i = 0; i < $allCards.length; i++){
//   $allCards[i].classList.add('never-show');
// }

// Mode Selection applied to deck=======================
if (mode === 'easy'){ // TODO: ADD gameDeckshuffle()
  var cards = document.querySelectorAll('.easy');
  $('.easy').removeClass('never-show');
  var cardsDisplayed = 12;
  var maxPair = 6;
} else if (mode === 'normal'){
  cards = document.querySelectorAll('.normal');
  $('.normal').removeClass('never-show');
  cardsDisplayed = 16;
  maxPair = 8;
} else if (mode === 'hard'){
  cards = document.querySelectorAll('.hard');
  $('.hard').removeClass('never-show');
  cardsDisplayed = 20;
  maxPair = 10;
}

// Theme Selection applied to deck=========================

function setCardTheme(theme){
  if (theme === "blue") {
    return 'img/blue.jpg';
  } else {
    return 'img/red.jpg';
  }
}

function setThemeRed() { // TODO: Won't need once my method is implemented
  $allCards.each(function(i, el) {
    $(this).children('.back-face').attr('src', 'img/red.jpg') // https://www.tutorialspoint.com/jquery/traversal-children.htm to target child of $(this)
  }); // https://stackoverflow.com/questions/54203234/does-not-have-class-selector-in-jquery-select-an-element-by-particular-class#:~:text=You%20are%20not%20capturing%20the%20this%20reference%20correctly%2C,have%20its%20own%20this%2C%20arguments%2C%20super%2C%20or%20new.target. breaks down why arrow notation doesn't work here - arrow notation doesn't support the implicit "this".  
}

function setThemeBlue() { // TODO: Won't need once my method is implemented
  $allCards.each(function(i, el) {
    $(this).children('.back-face').attr('src', 'img/blue.jpg')
  });
}

theme === 'red' ?  setThemeRed() : setThemeBlue();

// Card Flip Function========================================

var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

function flipCard() {
  if(clickCounter <= 0){
    startTime = new Date();
    console.log('Start Time:', startTime);
    clickCounter++;
  }
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
  checkWinCondition();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.nature === secondCard.dataset.nature;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  pairCounter++;
  // pairCounter will count increase with each successful match until it reaches maxPair for the chosen mode

  console.log('Game time at this match is: ' + startTime);


  firstCard.removeEventListener('click', flipCard);
  firstCard.classList.add('hide-it');

  secondCard.removeEventListener('click', flipCard);
  secondCard.classList.add('hide-it');

  resetBoard();
}

function unflipCards() {

  console.log('Game time at this not-match is: ' + startTime);

  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cardsDisplayed);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function checkWinCondition(){
// When all pairs are selected (pairCounter === maxPair, based on mode)
  if (pairCounter === maxPair){
    endTime = new Date();
    console.log('End Time:', endTime);
  }
  // Once the end time is captured, a 'score' is deduced by extracting and comparing time codes and converting from milliseconds to seconds.  That value in seconds is added to the userData object
  if (endTime) {
    var numStartTime = startTime.getTime();
    var numEndTime = endTime.getTime();
    var elapsedTimeInSec = Math.floor((numEndTime-numStartTime)/1000);
    userData.finalTimes.push(elapsedTimeInSec);
    // At this point, we have updated all necessary userData information and are ready to re-stringify it and send it back to local storage
    stringyUser = JSON.stringify(userData);
    localStorage.setItem('userData', stringyUser);
    // And now we send the user on to the About Me page to view their results
    window.location.href = 'about.html';
  }
}

function Card(src) {
  this.number = number++;
  this.picture = src;
  this.theme = setCardTheme(theme);
  // this.theme = userData.theme;
  // this.alt = alt; TODO: incorporate into args after it's working.
  Card.deck.push(this); // all the compiled cards, the "deck", so to speak
}

new Card('img/PVO Goat 1.jpg');
new Card('img/PVO Goat 2.jpg');
new Card('img/PVO Goat 3.jpg');
new Card('img/PVO Goat 4.png');
new Card('img/PVO Goat 5.png');
new Card('img/PVO Goat 6.jpg');
new Card('img/PVO Goat 7.png');
new Card('img/PVO Goat 8.jpg');
new Card('img/PVO Goat 9.jpg');
new Card('img/PVO Goat 10.jpg');

gameDeckShuffle();

function deckCreation(num) {
  for (let i = 0; i < num; i++) {
    gameDeck.push(Card.deck[i])
  }
  gameDeck = gameDeck.concat(gameDeck);
  knuthShuffle(gameDeck);
  return gameDeck;
}

function gameDeckShuffle() {
  knuthShuffle(Card.deck);
  switch (mode) {
    case 'easy':
      deckCreation(6);
      return gameDeck;
    case 'normal':
      deckCreation(8);
      return gameDeck;
    case 'hard':
      deckCreation(10);
      return gameDeck;
  }
}

function knuthShuffle(array) { // still want to try and "import" this (and the Card constructor, if the "module" type will let me)
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function cardPlacer(){
  var $board = $('.concentration');
  for (let i = 0; i < gameDeck.length; i++) {
    let cardFrontPic = $('<img>').attr('src', gameDeck[i].picture).addClass('new-cards'); //
    var $cardFrontDiv = $('<div></div>').addClass('new-cards-holder').append(cardFrontPic); // .addClass('memory-card')

    $board.append($cardFrontDiv);
  }
}

cardPlacer();