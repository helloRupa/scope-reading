# More About the Scope Chain
If you're having trouble understanding the scope chain, here's what you need to know so far.

## Window
The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is global, for other environments it may have another name.

Description taken from: https://javascript.info/global-object (They did a good job, so I copied and pasted it!)

You can think of `window` being like document in the DOM: it is at the top of the tree, or in the outermost scope.

You can type `window` in the browser's console and check it out!

## A Most Basic Explanation
When JS looks for a named value, like a function or variable, it looks up the scope chain. In other words, it starts at its innermost location (between curly braces), and then starts looking up the chain into outer scopes, until it finds what it's looking for or finishes looking through the global scope (if it doesn't find anything, you're getting an error as a speical gift).

```
const charlie = 'Scottish Fold';

function catType() {
  return charlie;
}

catType(); // returns 'Scottish Fold'
```

When `catType` is called, JS:
1. Looks for `charlie` inside of `catType` and doesn't find it
2. Looks in the global scope, since that's the next level up, and finds it
3. Stops looking

If a variable named charlie were declared inside catType, JS would have stopped looking right then and there:
```
const charlie = 'Scottish Fold';

function catType() {
  const charlie = 'Russian Blue';
  return charlie
}

catType(); // returns 'Russian Blue'
```

JS is in some ways is a bit like us: it stops looking for things once it has found them.

We can also think of the scope chain as being kind of like this house analogy: I lost my whisk. My house (curly braces) belongs to me, so I searched all over. I did not find it. My house exists in my neighborhood, so I went outside and searched there. However, I could not search inside the other houses, because they're not mine. I didn't find my whisk in my neighborhood, so I looked all over the city. I found it outside on a bench in a park 10 miles away from my home. In the city, I could not look inside the office buildings or other people's houses, since I didn't have access to them, but I could look in the outdoors.

```
function city() {
  const whisk = "My whisk";

  function officeBuilding() {
    const whisk = "Office's whisk";
    return whisk;
  }

  function hamtarosHouse() {
    const whisk = "Hamtaro's whisk";
    return whisk;
  }

  function neighborhood() {
    function lousHouse() {
      const whisk = "Lou's whisk";
      return whisk;
    }

    function myHouse() {
      // I lost my whisk! I'm gonna search the neighborhood and city for it!
      console.log(whisk);
    }

    function jansHouse() {
      const whisk = "Jan's whisk";
      return whisk;
    }

    myHouse();
  }

  neighborhood(); 
}

city(); // logs 'My whisk'
// when city is called, it calls neighborhood, 
// which then calls myHouse (in case you're wondering)

```

## Global Variables
Any variable declared without a keyword is a global variable. It is available as a property on window (the global scope of our browser). The variable will be available for use on every line _after_ its declaration:
```
trulyGlobal = "I'm so global it hurts.";

function printSomething() {
  console.log(trulyGlobal);
}

printSomething(); // logs "I'm so global it hurts."
console.log(window.trulyGlobal); // logs "I'm so global it hurts." because 
                          // a truly global variable is available on window
```

Global variables declared inside of function declarations will be available globally once the function has run. That's because the lines inside a function don't execute until the function is executed.
```
function addVariableToWindow() {
  forWindow = 'I was made just for you, window';
}

forWindow; // ReferenceError: forWindow not defined
addVariableToWindow();
console.log(forWindow); // 'I was made just for you, window'
console.log(window.forWindow); // 'I was made just for you, window'
```

Please don't use global variables like those described above. As a project gets larger, you'll likely end up with a naming collision. In other words, you might try to define a variable with the same name as one you've already used and not realize it. Or you might get confused about which variable is storing which value at any given point in your code. This problem gets bigger, the larger your codebase gets and when you start using third-party libraries/scripts (because they have their own variable names going on too, ya know). Also, as you scan your code, it can be confusing to see `myVariable = 'whatever';` and differentiate it from a variable reassignment: In other words, how will you know this is a variable declaration?

## Global Variable Declared with Var Keyword
Any variable declared with the `var` keyword in the _outermost_ scope (not inside any curly braces) is global. It is available as a property on window, the global object in the browser.
```
var anotherGlobal = "I'm special in my own way";

console.log(window.anotherGlobal); // logs "I'm special in my own way"
```

Many devs nowadays avoid the use of `var`.

**Hoisting Var**

It's important to know that `var` declarations are hoisted. In other words, you can use the variable on a line before it has even been declared without producing an error.

However, the value assigned to `var` is not hoisted.
```
console.log(`But why ${whyEvenDoThis}`); // logs 'But why undefined'

var whyEvenDoThis = 'But why var, why?';

console.log(`But why ${whyEvenDoThis}`); // logs 'But why But why var, why?'
```

The variable declaration will be hoisted to the nearest opening curly brace, but not the assignment.

A quick analogy: Jonathan flies hot air balloons and wants to meet Nirnia in the sky, who is a pilot. Jonathan gets in the hot air balloon's basket, and turns on the fire thingie, but the balloon takes off without him. Nirnia flies by the balloon in the sky but does not see Jonathan. In this story, the variable declaration is the balloon, and Jonathan is the value that was supposed to be stored in it.

## Global Functions
Any function declared with the `function` keyword in the outermost scope, i.e. not in any curly braces, is global and available on window. The interesting thing about these functions is that they can be called before they're declared due to how the JS interpreter works (hoisting).
```
globalAllTheWay(); // logs 'I am everywhere all the time!'

function globalAllTheWay() {
  console.log('I am everywhere all the time!');
}

globalAllTheWay(); // logs 'I am everywhere all the time!'

function earthToGlobal() {
  globalAllTheWay();
}

earthToGlobal(); // logs 'I am everywhere all the time!'
window.globalAllTheWay(); // logs 'I am everywhere all the time!'
window.earthToGlobal(); // logs 'I am everywhere all the time!'
```
You can think of them as being hoisted to the top of the file.

**Hoisting Functions**

Function declarations are hoisted up to the nearest opening curly brace when they are declared inside another function (including anonymous functions).

```
function suspenders() {
  pants(); // This is as far up as these pants can even go

  function pants() {
    console.log('Hold up my pants please');
  }
}

suspenders(); // logs 'Hold up my pants please'
```

## Globally Available Variables
Any function or variable declared in the outermost scope, or in other words, not inside any curly braces, can be considered a globally available variable. Regardless of which keyword (`let` or `const`) you use to declare it, that variable is available globally and in the console of the Dev Tools. It is accessible to all functions in your file and any scripts loaded after it. However, `let` and `const` variables are not available as properties on window and they are NOT hoisted.

```
const imGloballyAvailable = 'I am everywhere!';

function iSeeYou() {
  return imGloballyAvailable;
}

iSeeYou(); // returns 'I am everywhere!'
```

However, it's important to note that it is possible to use a `const` or `let` variable inside a function declaration declared before it as long as that function is _called after_ the `const` or `let` variable has been declared:
```
function bitWeird() {
  console.log(weirdness);
}

// put the function call here and prepare for errors

const weirdness = 'No error if function is called after my declaration';

bitWeird(); // logs 'No error if function is called after my declaration'
```

JS doesn't look for the value of `weirdness` until the function is called.

## Rule of Thumb
To determine if a variable or function is globally available, just type its name in the console of the Dev Tools. If you get a return value, and not an error, that variable or function is globally available.

## Summary Table on Globals

Keyword | Declared Where | Globally Available | Property on window | Hoisted | Example
--- | --- | --- | --- | --- | ---
N/A | anywhere | YES | YES | NO | `suchGlobal = 'wow';`
var | outermost scope | YES | YES | YES | `var alsoGlobal = true;`
const | outermost scope | YES | NO | NO | `const globallyAvailable = true;`
let | outermost scope | YES | NO | NO | `let reallyAvailable = true;`
function | outermost scope | YES | YES | YES | `function soGlobal() { return 'wow'; }`

## Local
Variables and functions defined inside a function (between its curly braces) are not accessible (visible) from outside the function.

Variables and functions declared within a JavaScript function, become LOCAL to the function. They have Function scope: They can only be accessed from within the function.

Since local variables and functions are only recognized inside their functions, variables with the same name can be used in different functions.

Functions and variables declared inside of functions can access variables and functions in their outer scope.

```
function thisIsFine() {
  const dogSaying = 'This is fine';

  return dogSaying;
}

function alsoFine() {
  const dogSaying = 'Also fine';

  function thisIsFine() {
    return dogSaying;
  }

  return thisIsFine();
}

console.log(thisIsFine()); // logs 'This is fine'
console.log(alsoFine()); // logs 'Also fine'

function thisIsFineToo() {
  return alsoFine();
}

console.log(thisIsFineToo()); // logs 'Also fine'

function thisIsNotFine() {
  return dogSaying;
}

console.log(thisIsNotFine()); // ReferenceError: dogSaying is not defined

function alsoNotFine() {
  function dontEvenTryIt() {
    const warning = 'stop now!';

    return warning;
  }

  return warning;
}

console.log(alsoNotFine()); // ReferenceError: warning is not defined
```

## Function Scope vs Block Scope and General Weirdness of Var
One of the reasons many devs prefer `let` and `const` over `var` is that they are block scoped, whereas `var` is function scoped or globally scoped depending on where it was defined.

Block scoping means that the function or variable is limited to the block `{ }` in which it was defined. If I define a block-scoped variable inside of an `if` statement or `for` loop, for example, it will only be accessible within the curly braces of that `if` statement or `for` loop. The same is not true of function-scoped variables. They only care about the curly braces of functions.

Take a look at this code. What do you think it'll log to the console?
```
var x = 1;

if (x === 1) {
  var x = 2;

  console.log(x);
}

console.log(x);
```
Answer:
* 2
* 2

How about this?
```
for (let i = 0; i <= 10; i++) {
  var num = i;
}

console.log(num);
```
Answer: 10

Look at what else we can do with `var` (I don't mean this in a good way at all):
```
var x = 5;
var x = 6;

console.log(x); // logs 6
```

Now look at this code. What do you think it'll log to the console?
```
let x = 1;

if (x === 1) {
  let x = 2;

  console.log(x);
}

console.log(x);
```
Answer: 
* 2
* 1

And this: 
```
for (let i = 0; i <= 10; i++) {
  let num = i;
}

console.log(num);
```
Answer: ReferenceError: num is not defined

How about this?
```
let x = 5;
let x = 6;

console.log(x);
```
Answer: Error: Identifier 'x' has already been declared

That's probably what a lot of people expect to happen when a variable with the same name is declared twice in the same scope!