/* eslint-disable no-unused-vars */

'use strict';

function assignDifficultyToUser(){

  var $difficultyElement = $('mode');
  for (var i=0; i<$difficultyElement.length; i++) {
    if($difficultyElement[i].checked){
      //Assign to User Object;
    }
  }
}

// assignDifficultyToUser();

function User(name, difficulty, theme) {
  this.name = name;
  this.difficulty = difficulty;
  this.theme = theme;
  this.finalTimes = []; // where to collect their times/scores
}

var gameStart = document.getElementById('nameForm');
gameStart.addEventListener('submit', beginningTheGame);
function beginningTheGame(click){
  click.preventDefault();

  var newUsername = click.target.fname.value; // OR User.name = ...
  var newThemeSelect = click.target.theme.value; // OR User.name = ...
  var newDifficultySelect = click.target.mode.value; // OR difficultySelect = ...

  while (newUsername === '') {
    newUsername = prompt('Hi! Enter your name so we can get this party started!');
  }

  while (newThemeSelect === '') {
    alert('Hi '+ newUsername + '! Make sure to select a theme.');
    return;
  }

  while (newDifficultySelect === '') {
    alert('Hi '+ newUsername + '! Make sure to select a difficulty.');
    return;
  }

  var newUser = new User(newUsername, newDifficultySelect, newThemeSelect);

  var stringifiedUser = JSON.stringify(newUser);
  localStorage.setItem('userData', stringifiedUser);

  alert('Okay ' + newUser.name + ' you are ready to play the game? It starts soon as you push the button!');

  window.location.href = 'game.html';
}

// When selected, 'Begin the Game' button will save all indicated choices to local storage and then move the user to the Game page
// -stringify the User Object
// -set User Object to local storage
// -redirect user to game.html
