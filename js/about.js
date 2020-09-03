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
  var targetName = document.getElementById('resultName');
  targetName.innerHTML='';
  var nameText = document.createElement('p');
  nameText.textContent= name;
  targetName.appendChild(nameText);

  var targetMode = document.getElementById('resultMode');
  targetMode.innerHTML='';
  var modeText = document.createElement('p');
  modeText.textContent= mode;
  targetMode.appendChild(modeText);

  var targetTime = document.getElementById('resultScore');
  targetTime.innerHTML='';
  var timeText = document.createElement('p');
  timeText.textContent= score;
  targetTime.appendChild(timeText);

}