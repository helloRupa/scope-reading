// All of the outermost functions and variables are global
// You can run them in the console to see what happens
const yell = 'You are tearing me apart Lisa!';

function highFive() {
  const yell = 'High Five!!';

  console.log(yell);  // will log 'High Five!!'
}

function downLow() {
  console.log(yell); // will log 'You are tearing me apart Lisa!'
}

function handShake() {
  const hands = 'Shake those hands';

  console.log(hands); // will log 'Shake those hands'
}

function notGonnaShakeHands() {
  console.log(hands); // will produce ReferenceError: hands is not defined (buy why?)
}

const div = document.createElement('div');
div.textContent = 'The DIV is on the page. Click for pointless yelling in the console.';

// document.body.appendChild(div); // appends div just fine

div.addEventListener('click', e => {
  console.log(`Yell: ${yell} inside event handler`); // will log 'You are tearing me apart Lisa!'
  console.log(e.currentTarget);  // will log the div itself

  const whisper = 'Shh, think sleepy thoughts';

  function speakQuietly() {
    console.log(whisper); // will log 'Shh, think sleepy thoughts'
  }

  speakQuietly(); // logs 'Shh, think sleepy thoughts'
});

highFive(); // log 'High Five!!'
downLow(); // log 'You are tearing me apart Lisa!'
handShake(); // log 'Shake those hands'

// TO SEE EACH ERROR, YOU'LL HAVE TO COMMENT OUT ALL THE FUNCTIONS EXCEPT ONE
// OR JUST ATTEMPT TO RUN EACH LINE ONE AT A TIME BY COPYING AND PASTING INTO
// THE BROWSER'S CONSOLE
notGonnaShakeHands(); // ReferenceError: hands is not defined (buy why?)
speakQuietly(); // ReferenceError: speakQuietly is not defined (buy why?)
console.log(e); // ReferenceError: e is not defined (buy why?)
console.log(whisper); // ReferenceError: whisper is not defined (buy why?)