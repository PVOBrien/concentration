'use strict';

displayResults();

function displayResults(){

  // -Destringify User Object from local storage
  var stringyUser = localStorage.getItem('userData');
  var userData = JSON.parse(stringyUser);

  // -Parse User Object from local storage to access User Name, Difficulty and Time
  var name = userData.name;
  var mode = userData.difficulty;
  var score = userData.finalTimes[0] + ' seconds';
  console.log('User Data Accessed:', name +' '+ mode +' '+ score);

  // -Add relevant content to results form on about.html
  var $targetName = $('#resultName');
  $targetName.empty(); // https://api.jquery.com/empty/ for this command to empty everything within it.
  var nameHolder = $("<p></p>").text(name); // creates the <p> tag and then the .text method takes in the name variable as the argument to fill that elements text.
  $targetName.append(nameHolder); // targets the targetName and appends the var nameHolder to it.

  var $targetMode = $('#resultMode');
  $targetMode.empty();
  var modeHolder = $("<p></p>").text(mode);
  $targetMode.append(modeHolder);

  var $targetTime = $('#resultScore');
  $targetTime.empty();
  var $timeHolder = $("<p></p>").text(score);
  $targetTime.append($timeHolder);
}
