export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Challenge {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
}

export interface JsSection {
  id: string;
  title: string;
  note: string;
  example: string;
  quizzes: Quiz[];
  challenge?: Challenge;
}

export const jsContent: JsSection[] = [
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    note: 'JavaScript is a dynamically typed language. Variables are declared with let, const, or var. Data types include String, Number, Boolean, Null, Undefined, Object, and Symbol. Control flow uses if/else and switch. Loops include for, while, and do/while. Functions are reusable blocks of code.',
    example: `// Variables & Data Types
const name = "Alice"; // String
let age = 25; // Number
let isStudent = true; // Boolean

// Control Flow & Loops
if (age >= 18) {
  console.log("Adult");
}

for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}

// Functions
function greet(person) {
  return "Hello, " + person;
}
console.log(greet(name));`,
    quizzes: [
      { question: 'Which keyword is used to declare a block-scoped variable that can be reassigned?', options: ['var', 'let', 'const', 'int'], correctAnswer: 1 },
      { question: 'Which of the following is NOT a primitive data type in JavaScript?', options: ['String', 'Number', 'Object', 'Boolean'], correctAnswer: 2 },
      { question: 'What is the result of typeof null?', options: ['"null"', '"undefined"', '"object"', '"number"'], correctAnswer: 2 },
      { question: 'Which operator is used for strict equality (checks value and type)?', options: ['=', '==', '===', '!='], correctAnswer: 2 },
      { question: 'What does the % operator do?', options: ['Calculates percentages', 'Returns the remainder of a division', 'Multiplies two numbers', 'Divides two numbers'], correctAnswer: 1 },
      { question: 'Which loop is guaranteed to execute at least once?', options: ['for loop', 'while loop', 'do...while loop', 'for...in loop'], correctAnswer: 2 },
      { question: 'How do you write an IF statement in JavaScript?', options: ['if i = 5 then', 'if i == 5 then', 'if (i == 5)', 'if i = 5'], correctAnswer: 2 },
      { question: 'What is the correct way to call a function named "myFunction"?', options: ['call function myFunction()', 'call myFunction()', 'myFunction()', 'execute myFunction()'], correctAnswer: 2 },
      { question: 'What will console.log(1 + "2") output?', options: ['3', '"12"', 'NaN', 'Error'], correctAnswer: 1 },
      { question: 'Which keyword is used to return a value from a function?', options: ['get', 'return', 'output', 'yield'], correctAnswer: 1 }
    ],
    challenge: {
      title: "Variable Declaration",
      description: "Declare a constant variable named 'pi' with the value 3.14 and log it to the console.",
      initialCode: "// Write your code here\n",
      solution: "const pi = 3.14;\nconsole.log(pi);"
    }
  },
  {
    id: 'objects-prototypes',
    title: 'Objects & Prototypes',
    note: 'Objects are collections of key-value pairs. Prototypes are the mechanism by which JavaScript objects inherit features from one another. The "this" keyword refers to the object it belongs to, depending on how a function is called.',
    example: `// Object Literal
const person = {
  name: 'John',
  greet() {
    console.log('Hi, I am ' + this.name);
  }
};
person.greet(); // "Hi, I am John"

// Constructor Function & Prototype
function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function() {
  console.log(this.type + ' makes a sound.');
};

const dog = new Animal('Dog');
dog.speak(); // "Dog makes a sound."`,
    quizzes: [
      { question: 'How do you access the "name" property of an object named "person"?', options: ['person[name]', 'person.name', 'person->name', 'Both person.name and person["name"]'], correctAnswer: 3 },
      { question: 'What does the "this" keyword refer to in an object method?', options: ['The global object', 'The function itself', 'The object that owns the method', 'undefined'], correctAnswer: 2 },
      { question: 'Which method creates a new object with the specified prototype object and properties?', options: ['Object.create()', 'Object.assign()', 'Object.new()', 'Object.make()'], correctAnswer: 0 },
      { question: 'What is a constructor function?', options: ['A function that destroys objects', 'A function used with the "new" keyword to create objects', 'A function that returns a string', 'A built-in math function'], correctAnswer: 1 },
      { question: 'How do you add a property to a constructor\'s prototype?', options: ['Constructor.prototype.property = value', 'Constructor.property = value', 'Constructor.__proto__.property = value', 'Constructor.add(property, value)'], correctAnswer: 0 },
      { question: 'What is the prototype chain?', options: ['A series of linked lists', 'A way to chain method calls', 'The mechanism for inheritance in JavaScript', 'A string manipulation technique'], correctAnswer: 2 },
      { question: 'Which property points to the prototype of an object (historically)?', options: ['prototype', '__proto__', 'parent', 'super'], correctAnswer: 1 },
      { question: 'What happens if you call a constructor function without the "new" keyword?', options: ['It throws an error', 'It creates the object normally', '"this" points to the global object (in non-strict mode)', 'It returns null'], correctAnswer: 2 },
      { question: 'How do you check if a property exists directly on an object (not on its prototype)?', options: ['in operator', 'hasOwnProperty()', 'exists()', 'has()'], correctAnswer: 1 },
      { question: 'What is the value of "this" in a standalone function in strict mode?', options: ['The global object', 'null', 'undefined', 'The function itself'], correctAnswer: 2 }
    ]
  },
  {
    id: 'async-js',
    title: 'Asynchronous JavaScript',
    note: 'JavaScript is single-threaded but handles async operations via the Event Loop. Callbacks were the old way. Promises represent future values (pending, fulfilled, rejected). Async/Await provides a synchronous-looking syntax for Promises.',
    example: `// Promises
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data received"), 1000);
});

fetchData.then(data => console.log(data));

// Async/Await
async function getData() {
  try {
    const result = await fetchData;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
getData();`,
    quizzes: [
      { question: 'What is a Callback function?', options: ['A function that calls itself', 'A function passed as an argument to another function to be executed later', 'A function that returns a promise', 'A built-in browser function'], correctAnswer: 1 },
      { question: 'What are the three states of a Promise?', options: ['Start, Run, Stop', 'Pending, Fulfilled, Rejected', 'Waiting, Resolved, Error', 'Init, Success, Fail'], correctAnswer: 1 },
      { question: 'Which keyword is used to wait for a Promise to resolve?', options: ['wait', 'pause', 'await', 'yield'], correctAnswer: 2 },
      { question: 'What must a function be declared as to use the "await" keyword inside it?', options: ['static', 'async', 'promise', 'defer'], correctAnswer: 1 },
      { question: 'How do you handle errors in a Promise chain?', options: ['.catch()', '.error()', '.fail()', '.reject()'], correctAnswer: 0 },
      { question: 'How do you handle errors in an async/await function?', options: ['if/else', 'try/catch', 'then/catch', 'error/success'], correctAnswer: 1 },
      { question: 'What is the Event Loop?', options: ['A loop that iterates over arrays', 'A mechanism that handles asynchronous callbacks in Node.js and browsers', 'A CSS animation loop', 'A way to bind events to DOM elements'], correctAnswer: 1 },
      { question: 'Which queue has higher priority in the Event Loop?', options: ['Macrotask Queue (e.g., setTimeout)', 'Microtask Queue (e.g., Promises)', 'Render Queue', 'They have equal priority'], correctAnswer: 1 },
      { question: 'What does Promise.all() do?', options: ['Returns the first resolved promise', 'Waits for all promises to resolve or any to reject', 'Rejects all promises', 'Runs promises sequentially'], correctAnswer: 1 },
      { question: 'What is "Callback Hell"?', options: ['When a callback throws an error', 'Deeply nested callbacks making code hard to read', 'When a callback never executes', 'A specific JavaScript error message'], correctAnswer: 1 }
    ]
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    note: 'The Document Object Model (DOM) represents the page as a tree. Use selectors (querySelector, getElementById) to find elements. Add event listeners to handle user interactions. You can traverse the tree (parentNode, children) and modify elements (innerHTML, classList).',
    example: `// Select element
const btn = document.querySelector('#myBtn');
const text = document.getElementById('text');

// Modify element
text.textContent = 'New Text';
text.classList.add('highlight');

// Event Listener
btn.addEventListener('click', (event) => {
  console.log('Button clicked!');
  
  // Create and append new element
  const newEl = document.createElement('p');
  newEl.textContent = 'Appended!';
  document.body.appendChild(newEl);
});`,
    quizzes: [
      { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Dynamic Object Manipulation'], correctAnswer: 0 },
      { question: 'Which method selects the first element that matches a CSS selector?', options: ['getElementById()', 'querySelectorAll()', 'querySelector()', 'getElementsByClassName()'], correctAnswer: 2 },
      { question: 'How do you attach a click event to an element?', options: ['element.click(function)', 'element.on("click", function)', 'element.addEventListener("click", function)', 'element.bind("click", function)'], correctAnswer: 2 },
      { question: 'Which property gets or sets the HTML content of an element?', options: ['textContent', 'innerText', 'innerHTML', 'outerHTML'], correctAnswer: 2 },
      { question: 'Which property gets or sets the text content of an element (ignoring HTML tags)?', options: ['innerHTML', 'textContent', 'htmlContent', 'value'], correctAnswer: 1 },
      { question: 'How do you add a class to an element?', options: ['element.class = "new-class"', 'element.className += " new-class"', 'element.classList.add("new-class")', 'Both B and C'], correctAnswer: 3 },
      { question: 'How do you create a new HTML element in JavaScript?', options: ['document.createElement("div")', 'document.makeElement("div")', 'document.add("div")', 'new Element("div")'], correctAnswer: 0 },
      { question: 'Which method adds a child element to a parent element?', options: ['parent.insert(child)', 'parent.appendChild(child)', 'parent.add(child)', 'parent.push(child)'], correctAnswer: 1 },
      { question: 'What is Event Bubbling?', options: ['Events triggering multiple times', 'Events propagating from the target element up to the root', 'Events propagating from the root down to the target', 'A way to create custom events'], correctAnswer: 1 },
      { question: 'How do you stop an event from bubbling up?', options: ['event.stop()', 'event.prevent()', 'event.stopPropagation()', 'event.preventDefault()'], correctAnswer: 2 }
    ]
  },
  {
    id: 'es6-features',
    title: 'ES6+ Features',
    note: 'ES6 (ECMAScript 2015) introduced modern syntax. Arrow functions provide concise syntax and lexical "this". Template literals allow string interpolation. Destructuring extracts values. Spread/Rest operators (...) handle arrays/objects. Classes offer syntactic sugar over prototypes.',
    example: `// Arrow Function & Template Literal
const greet = (name) => \`Hello, \${name}!\`;

// Destructuring
const user = { id: 1, role: 'admin' };
const { id, role } = user;

// Spread Operator
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Classes
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(\`Hi, I'm \${this.name}\`);
  }
}`,
    quizzes: [
      { question: 'How do you write an arrow function?', options: ['function() => {}', '() => {}', '=> function() {}', '() -> {}'], correctAnswer: 1 },
      { question: 'What character is used for Template Literals?', options: ['Single quotes (\')', 'Double quotes (")', 'Backticks (`)', 'Tildes (~)'], correctAnswer: 2 },
      { question: 'How do you inject a variable "x" into a template literal?', options: ['${x}', '#{x}', '+ x +', '{{x}}'], correctAnswer: 0 },
      { question: 'What does Destructuring do?', options: ['Destroys variables', 'Unpacks values from arrays or properties from objects into distinct variables', 'Combines multiple arrays', 'Deletes object properties'], correctAnswer: 1 },
      { question: 'What is the syntax for the Spread operator?', options: ['***', '...', '&&', '||'], correctAnswer: 1 },
      { question: 'What does the Rest parameter do in a function definition?', options: ['Pauses the function', 'Collects multiple elements and condenses them into a single array', 'Spreads an array into arguments', 'Ignores extra arguments'], correctAnswer: 1 },
      { question: 'How do you export a module in ES6?', options: ['module.exports = ...', 'export default ...', 'exports.module = ...', 'send ...'], correctAnswer: 1 },
      { question: 'Which keyword is used to inherit from another class?', options: ['inherits', 'extends', 'super', 'implements'], correctAnswer: 1 },
      { question: 'What function must be called inside a child class constructor to call the parent constructor?', options: ['parent()', 'base()', 'super()', 'init()'], correctAnswer: 2 },
      { question: 'How does "this" behave in an arrow function?', options: ['It refers to the global object', 'It refers to the object calling the function', 'It is lexically bound (inherits from the enclosing scope)', 'It is undefined'], correctAnswer: 2 }
    ]
  },
  {
    id: 'functional-programming',
    title: 'Functional Programming',
    note: 'Functional programming treats computation as the evaluation of mathematical functions. Key concepts: Higher-Order Functions (take/return functions), Map/Filter/Reduce (array transformations), Closures (functions remembering their scope), and Currying.',
    example: `const numbers = [1, 2, 3, 4, 5];

// Map (transform)
const doubled = numbers.map(n => n * 2);

// Filter (select)
const evens = numbers.filter(n => n % 2 === 0);

// Reduce (accumulate)
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Closure
function makeAdder(x) {
  return function(y) {
    return x + y; // Remembers 'x'
  };
}
const add5 = makeAdder(5);
console.log(add5(2)); // 7`,
    quizzes: [
      { question: 'What is a Higher-Order Function?', options: ['A function that runs very fast', 'A function that operates on other functions, either by taking them as arguments or returning them', 'A function declared at the top of a file', 'A built-in JavaScript function'], correctAnswer: 1 },
      { question: 'Which array method creates a new array populated with the results of calling a provided function on every element?', options: ['forEach()', 'map()', 'filter()', 'reduce()'], correctAnswer: 1 },
      { question: 'Which array method creates a new array with all elements that pass the test implemented by the provided function?', options: ['map()', 'filter()', 'reduce()', 'find()'], correctAnswer: 1 },
      { question: 'Which array method executes a reducer function on each element, resulting in a single output value?', options: ['map()', 'filter()', 'reduce()', 'concat()'], correctAnswer: 2 },
      { question: 'What is a Closure?', options: ['A way to close a browser window', 'A function bundled together with references to its surrounding state (lexical environment)', 'A self-invoking function', 'A method to end a loop'], correctAnswer: 1 },
      { question: 'Does map() mutate the original array?', options: ['Yes', 'No', 'Only if the array contains objects', 'Only in strict mode'], correctAnswer: 1 },
      { question: 'What does the reduce() method take as its first argument?', options: ['An array', 'A callback function (reducer)', 'An initial value', 'An index'], correctAnswer: 1 },
      { question: 'What is Currying?', options: ['A way to spice up code', 'Evaluating a function with multiple arguments into a sequence of functions with a single argument', 'A type of loop', 'Error handling technique'], correctAnswer: 1 },
      { question: 'What is a Pure Function?', options: ['A function written in pure JavaScript', 'A function that always evaluates to the same result value given the same argument values and has no side effects', 'A function without arguments', 'A function that returns void'], correctAnswer: 1 },
      { question: 'Which method is best for executing a function for each array element without returning a new array?', options: ['map()', 'filter()', 'forEach()', 'reduce()'], correctAnswer: 2 }
    ]
  },
  {
    id: 'error-handling',
    title: 'Error Handling',
    note: 'Robust code handles errors gracefully. Use try...catch to handle exceptions without crashing the app. The finally block executes regardless of success or failure. You can throw custom errors using the throw keyword and the Error object.',
    example: `function divide(a, b) {
  if (b === 0) {
    // Throw custom error
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  console.log(divide(10, 2)); // 5
  console.log(divide(10, 0)); // Throws error
} catch (error) {
  // Handle error
  console.error("Caught an error:", error.message);
} finally {
  // Always runs
  console.log("Division attempt finished.");
}`,
    quizzes: [
      { question: 'Which block is used to test a block of code for errors?', options: ['catch', 'try', 'finally', 'throw'], correctAnswer: 1 },
      { question: 'Which block is used to handle the error if one occurs?', options: ['try', 'catch', 'finally', 'throw'], correctAnswer: 1 },
      { question: 'Which block executes code after try and catch, regardless of the result?', options: ['try', 'catch', 'finally', 'throw'], correctAnswer: 2 },
      { question: 'Which keyword is used to create a custom error?', options: ['error', 'catch', 'throw', 'return'], correctAnswer: 2 },
      { question: 'What object is typically thrown when creating a custom error?', options: ['new Exception()', 'new Error()', 'new Fault()', 'new Warning()'], correctAnswer: 1 },
      { question: 'What property of the Error object contains the error description?', options: ['description', 'text', 'message', 'info'], correctAnswer: 2 },
      { question: 'Can you have a try block without a catch block?', options: ['Yes, if it has a finally block', 'No, catch is always required', 'Yes, it is perfectly fine alone', 'Only in strict mode'], correctAnswer: 0 },
      { question: 'What happens if an error is thrown but not caught by a try...catch block?', options: ['The script continues normally', 'The browser ignores it', 'The script stops executing and prints an error to the console', 'It returns undefined'], correctAnswer: 2 },
      { question: 'Which type of error occurs when a variable is used but not declared?', options: ['SyntaxError', 'TypeError', 'ReferenceError', 'RangeError'], correctAnswer: 2 },
      { question: 'Which type of error occurs when a value is not of the expected type (e.g., calling a string as a function)?', options: ['SyntaxError', 'TypeError', 'ReferenceError', 'RangeError'], correctAnswer: 1 }
    ]
  },
  {
    id: 'browser-apis',
    title: 'Browser APIs',
    note: 'Browsers provide APIs for complex tasks. Fetch API makes network requests. LocalStorage/SessionStorage save data on the client. Geolocation gets user coordinates. Web Workers run scripts in background threads.',
    example: `// Fetch API
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json())
  .then(data => console.log(data.name))
  .catch(error => console.error('Error:', error));

// LocalStorage
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');

// Geolocation
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude);
});`,
    quizzes: [
      { question: 'Which API provides an interface for fetching resources (e.g., across the network)?', options: ['XMLHttpRequest', 'Fetch API', 'Network API', 'Request API'], correctAnswer: 1 },
      { question: 'What does the fetch() method return?', options: ['JSON data', 'A Promise', 'An XML document', 'A string'], correctAnswer: 1 },
      { question: 'What is the difference between localStorage and sessionStorage?', options: ['localStorage is faster', 'sessionStorage persists after the browser is closed', 'localStorage persists after the browser is closed, sessionStorage clears when the tab closes', 'There is no difference'], correctAnswer: 2 },
      { question: 'How do you store an object in localStorage?', options: ['localStorage.setItem("key", obj)', 'localStorage.setItem("key", JSON.stringify(obj))', 'localStorage.save(obj)', 'localStorage.push(obj)'], correctAnswer: 1 },
      { question: 'Which API is used to get the geographical position of a user?', options: ['Location API', 'Map API', 'Geolocation API', 'GPS API'], correctAnswer: 2 },
      { question: 'What object provides access to the Geolocation API?', options: ['window.location', 'document.geolocation', 'navigator.geolocation', 'browser.gps'], correctAnswer: 2 },
      { question: 'What do Web Workers do?', options: ['Manage DOM elements', 'Run scripts in background threads without blocking the UI', 'Handle CSS animations', 'Manage local storage'], correctAnswer: 1 },
      { question: 'How do you send data to a Web Worker?', options: ['worker.send()', 'worker.postMessage()', 'worker.emit()', 'worker.dispatch()'], correctAnswer: 1 },
      { question: 'Which method parses a JSON string into a JavaScript object?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'JSON.read()'], correctAnswer: 0 },
      { question: 'Which method converts a JavaScript object into a JSON string?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toString()', 'JSON.write()'], correctAnswer: 1 }
    ]
  },
  {
    id: 'advanced-concepts',
    title: 'Advanced Concepts',
    note: 'Hoisting moves declarations to the top. Scope determines variable visibility (Global, Function, Block). Execution Context is the environment where code runs. Memoization caches function results. RegEx (Regular Expressions) are patterns used to match character combinations in strings.',
    example: `// Hoisting
console.log(x); // undefined (var is hoisted but not initialized)
var x = 5;

// Memoization (Caching)
function memoizedAdd() {
  let cache = {};
  return function(n) {
    if (n in cache) {
      return cache[n] + ' (cached)';
    } else {
      let result = n + 10;
      cache[n] = result;
      return result + ' (calculated)';
    }
  }
}
const add10 = memoizedAdd();

// RegEx
const regex = /[a-z]+@[a-z]+\.[a-z]{2,3}/;
console.log(regex.test("test@email.com")); // true`,
    quizzes: [
      { question: 'What is Hoisting in JavaScript?', options: ['Lifting elements in the DOM', 'JavaScript\'s default behavior of moving declarations to the top of the current scope', 'A way to speed up code execution', 'A method to import modules'], correctAnswer: 1 },
      { question: 'Are variables declared with "let" and "const" hoisted?', options: ['No', 'Yes, and initialized to undefined', 'Yes, but they are in a "Temporal Dead Zone" and cannot be accessed before declaration', 'Only in strict mode'], correctAnswer: 2 },
      { question: 'What is Scope?', options: ['A mouthwash', 'The accessibility/visibility of variables, functions, and objects in some particular part of your code', 'The speed of execution', 'A debugging tool'], correctAnswer: 1 },
      { question: 'Which keyword provides block scope?', options: ['var', 'let', 'function', 'global'], correctAnswer: 1 },
      { question: 'What is Memoization?', options: ['Memorizing code syntax', 'An optimization technique that speeds up programs by storing the results of expensive function calls', 'A way to write comments', 'A memory leak'], correctAnswer: 1 },
      { question: 'What are Regular Expressions (RegEx) used for?', options: ['Math calculations', 'Pattern matching and search/replace in strings', 'Styling DOM elements', 'Database queries'], correctAnswer: 1 },
      { question: 'How do you create a RegEx literal in JavaScript?', options: ['"pattern"', '/pattern/', 'regex(pattern)', 'new RegEx("pattern")'], correctAnswer: 1 },
      { question: 'Which RegEx method tests for a match in a string and returns true or false?', options: ['match()', 'search()', 'test()', 'exec()'], correctAnswer: 2 },
      { question: 'What is the Execution Context?', options: ['The browser window', 'The environment in which JavaScript code is evaluated and executed', 'The text editor', 'The DOM tree'], correctAnswer: 1 },
      { question: 'What does the "g" flag do in a Regular Expression (e.g., /pattern/g)?', options: ['Global search (find all matches rather than stopping after the first match)', 'Case-insensitive search', 'Multiline search', 'Greedy search'], correctAnswer: 0 }
    ]
  },
  {
    id: 'tooling-environment',
    title: 'Tooling & Environment',
    note: 'Modern JS relies on tooling. NPM/Yarn manage packages (dependencies). Bundlers like Webpack or Vite compile and bundle code for the browser. Babel transpiles modern JS (ES6+) into older JS for backward compatibility. Linters (ESLint) enforce code quality.',
    example: `// package.json (NPM configuration)
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src"
  },
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "eslint": "^8.0.0"
  }
}`,
    quizzes: [
      { question: 'What does NPM stand for?', options: ['Node Package Manager', 'New Programming Method', 'Network Protocol Manager', 'Node Process Module'], correctAnswer: 0 },
      { question: 'What is the purpose of the package.json file?', options: ['To write JavaScript code', 'To store CSS styles', 'To hold metadata relevant to the project and manage dependencies/scripts', 'To configure the database'], correctAnswer: 2 },
      { question: 'What is Webpack or Vite?', options: ['A web browser', 'A module bundler that takes assets (JS, CSS, images) and bundles them into static assets for the browser', 'A database management system', 'A testing framework'], correctAnswer: 1 },
      { question: 'What does Babel do?', options: ['Bundles code', 'Transpiles modern JavaScript (ES6+) into backward-compatible versions for older browsers', 'Lints code for errors', 'Manages packages'], correctAnswer: 1 },
      { question: 'What is the purpose of a Linter (like ESLint)?', options: ['To format HTML', 'To statically analyze code to quickly find problems and enforce style guidelines', 'To compile code faster', 'To run unit tests'], correctAnswer: 1 },
      { question: 'What is the difference between "dependencies" and "devDependencies" in package.json?', options: ['No difference', 'dependencies are for production, devDependencies are only needed for local development and testing', 'devDependencies are installed globally', 'dependencies are for CSS, devDependencies are for JS'], correctAnswer: 1 },
      { question: 'Which command installs dependencies listed in package.json?', options: ['npm start', 'npm run', 'npm install', 'npm build'], correctAnswer: 2 },
      { question: 'What is Yarn?', options: ['A JavaScript framework', 'An alternative package manager to NPM', 'A CSS preprocessor', 'A code editor'], correctAnswer: 1 },
      { question: 'What does a bundler do with ES Modules (import/export)?', options: ['Ignores them', 'Combines them into a single file or a few optimized files', 'Converts them to HTML', 'Deletes them'], correctAnswer: 1 },
      { question: 'Why is Vite often preferred over older bundlers like Webpack for development?', options: ['It uses a different language', 'It provides significantly faster server start and Hot Module Replacement (HMR) by leveraging native ES modules', 'It does not require Node.js', 'It automatically writes code for you'], correctAnswer: 1 }
    ]
  },
  {
    id: 'es6-plus-mastery',
    title: 'ES6+ Mastery',
    note: 'Modern JavaScript (ES6 and beyond) brought significant improvements to the language. Arrow functions provide a shorter syntax and do not have their own "this". Template literals allow for multi-line strings and string interpolation. Destructuring makes it easy to extract values from arrays and objects. Spread and Rest operators use the triple-dot (...) syntax for different purposes. Classes provide a clearer and more concise syntax to create objects and deal with inheritance.',
    example: `// Arrow Functions
const add = (a, b) => a + b;

// Template Literals
const user = 'Alice';
console.log(\`Welcome, \${user}!\`);

// Destructuring
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;

const settings = { theme: 'dark', fontSize: 16 };
const { theme } = settings;

// Spread & Rest
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5]; // Spread

function sum(...args) { // Rest
  return args.reduce((a, b) => a + b, 0);
}

// Classes
class Developer {
  constructor(name, language) {
    this.name = name;
    this.language = language;
  }
  code() {
    console.log(\`\${this.name} is coding in \${this.language}\`);
  }
}`,
    quizzes: [
      { question: 'Which of the following is a benefit of arrow functions?', options: ['They are always faster', 'They have a shorter syntax and lexical "this"', 'They can be used as constructors', 'They automatically name themselves'], correctAnswer: 1 },
      { question: 'What is the output of `const a = 5; const b = 10; console.log(\`Sum is \${a + b}\`);`?', options: ['Sum is 15', 'Sum is a + b', 'Sum is ${a + b}', 'Error'], correctAnswer: 0 },
      { question: 'In object destructuring `const { x: y } = { x: 10 };`, what is the value of `y`?', options: ['x', '10', 'undefined', 'ReferenceError'], correctAnswer: 1 },
      { question: 'What does the spread operator do when used on an object?', options: ['It deletes all properties', 'It creates a shallow copy of the object\'s properties', 'It freezes the object', 'It converts the object to an array'], correctAnswer: 1 },
      { question: 'Which keyword is used in a class to refer to the parent class?', options: ['this', 'parent', 'super', 'base'], correctAnswer: 2 },
      { question: 'What is the result of `[...[1, 2], ...[3, 4]]`?', options: ['[[1, 2], [3, 4]]', '[1, 2, 3, 4]', '[4, 6]', 'Error'], correctAnswer: 1 },
      { question: 'Can arrow functions be used as methods in an object if they need to access `this`?', options: ['Yes, always', 'No, because they don\'t have their own `this` context', 'Only in strict mode', 'Only if they are async'], correctAnswer: 1 },
      { question: 'What is the "Rest" parameter used for in function arguments?', options: ['To stop the function execution', 'To represent an indefinite number of arguments as an array', 'To reset the arguments to zero', 'To spread an array into arguments'], correctAnswer: 1 },
      { question: 'How do you define a default value for a destructured variable?', options: ['const { x = 10 } = {}', 'const { x : 10 } = {}', 'const { x } = { x : 10 }', 'const { x == 10 } = {}'], correctAnswer: 0 },
      { question: 'What is the main purpose of the `constructor` method in a class?', options: ['To render the class', 'To initialize object properties when a new instance is created', 'To delete the object', 'To define static methods'], correctAnswer: 1 }
    ],
    challenge: {
      title: "ES6 Refactoring",
      description: "Refactor the following function to use an arrow function and template literals: \n\nfunction greet(name) { return 'Hello, ' + name + '!'; }",
      initialCode: "function greet(name) {\n  return 'Hello, ' + name + '!';\n}",
      solution: "const greet = (name) => `Hello, ${name}!`;"
    }
  }
];
