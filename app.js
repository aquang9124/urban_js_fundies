var a = 'Hello world!';
// When you declare the variable, its name becomes a key inside of the global object
// window.a will give you Hello world!
function b() {
	console.log("Called b!");
}
b();
console.log(a);
// The name of this function will be a key inside of the global object

/*
	Global execution context has the global
	object, the variable 'this', all of your 
	code that's not inside a function, and the 
	outer environment. When you're inside a 
	function the outer environment is everything
	outside of the function. When you're not inside
	a function, the outer environment is null.
											     */

// -- Execution context is created in two phases -- //

// --- Creation Phase --- //

/* 
	The first phase is the creation phase. The global object, 'this', outer environment are created.
	As the parser runs through your code and begins to get your code ready for execution, it sets up 
	the memory space for variables and functions. This process is called hoisting. Before your code starts getting 
	JS engine sets aside memory space for your variables and functions. The function in its entirety is stored
	executed line by line, the into memory. The variable declaration is stored as well. Variable assignments don't happen until
	the execution phase. All variables are undefined to begin with. 'undefined' is a special value that means the variable has
	yet to be set. 'undefined' actually takes up space in memory, it's an actual value, it does not mean something is empty.
	Do not make a habit of setting something to undefined. It is always better to let undefined mean 'I never set this value.'
*/

// --- JS and Undefined -- //
var c;
console.log(c);

if (c === undefined) {
	console.log("c is undefined!");
}

else {
	console.log("c is defined!");
}

// --- Execution Phase --- //

/*
	This is where your code gets run line by line. Single threaded execution means
	that only one command is executed at a time. JS behaves in a single threaded manner.
	Synchronous, for programming, means one at a time and in order. JS is single threaded
	synchronous execution in its behavior. 
*/

function d() {
	console.log("I called d!");
}

d();

console.log(e);
var e = "Hello world!";
console.log(e);

// -- Invocation -- //
// Invocation just means that you are running a function. In JS this is done by using parenthesis ()

function exA() {
	exB();
	var c;
}

function exB() {
	var exD;
	console.log(exD);
}

exA();
var exD;

// Any time you invoke a function, a new execution context is created and placed on top of the
// execution stack. It will go through the creation and execution phase just like the global execution
// context. However, if you invoke a function inside of another, a new execution context will be created
// for that invocation.

// -- Variable Environment -- //
// This is where the variables live and how the relate to each other in memory

function testB() {
	var myVar;
	console.log(myVar);
}

function testA() {
	var myVar = 2;
	console.log(myVar);
	testB();
}

var myVar = 1;
console.log(myVar);
testA();
console.log(myVar);
// When this code is run you will see 1, 2, 'undefined', and 1. The myVar inside the global execution
// context gets logged first, then testA is invoked which logs 2 and then testB is invoked which logs
// undefined. Finally, the myVar in the global execution context is logged again.
function varCheck() {
	console.log(varA);
}

function setVar() {
	var varA = 2;
	varCheck();
}

var varA = 1;
setVar();

// This will log 1 in the console.
// Every execution context has a reference to its outer environment. 
// JS cares about the lexical environment, varCheck's outer environment
// is not setVar, but it is the global context. If you change the lexical
// environment of varCheck by putting it inside of setVar then its outer
// environment would change

function varCheckA() {
	function varCheckB() {
		function varCheckC() {
			console.log(myVarA);
		}
		varCheckC();
	}

	varCheckB();
}

var myVarA = 3;
varCheckA();

// The global execution context knows about varCheckA but if you try to invoke
// varCheckB when varCheckB is nested inside of varCheckA, then you will get
// the 'function is not defined' error because the code is physically sitting
// inside of another function.

// -- Scope -- //
// Scope means where a variable is available in your code and if it's truly the same variable
// or a new copy of that variable.

/* 
	Asynchronous means that more than one thing can be done at a time
	However, JS is synchronous, so how does it handle asynchronous events?
	The JS engine doesn't exist by itself inside of a browser. There's lots of things
	happening outside of the JS engine inside of the browser. The JS engine has
	hooks that allow it to talk to the rendering engine or the HTTP request engine.
	All of these things are running asynchronously, but the JS engine itself is running
	synchronously.
*/

// --- Event Queue --- //

/*
	This is a list that sits inside of the JS engine and is full of events
	or notifications of events that should be happening. The browser is asynchronously putting 
	things in the event queue. When something is added to the queue, we are listening for it 
	and should be doing something in response to it. The event queue gets looked at by JS 
	when the execution stack is empty. When the stack is empty JS looks periodically at the event
	queue and checks if it needs to do something in response to an event that
	it has been notified of. JS sees the event, processes the event, and then moves through
	the event queue until it is done. However, the JS engine only processes events when there is
	nothing on the execution stack.
*/

// long running function
function waitThreeSecs() {
	var ms = 3000 + new Date().getTime();

	while (new Date() < ms) {}
	console.log('Finished function');
}

function clickHandler() {
	console.log('Click event!');
}

// listen for the click event
document.addEventListener('click', clickHandler);

waitThreeSecs();
console.log('finished execution');

// This will log Finished function, then finished execution, then any click events will
// be processed.

// -- Types and Javascript -- //

// Dynamic typing means you don't tell the engine what type of data a variable holds, it figures it out
// while your code is running. Variables can hold different types of values because it is all figured
// out during execution.

// Static typing requires you to declare what type of value a variable should hold. Javascript
// uses dynamic typing. It figures out types on the fly which is both quite powerful and quite prone
// to causing confusion.

// -- Primitive Types -- //

/* 
	Primitive type is a type of data that represents a single value. That is, something that is not an object.
	There are six primitive types in JS. The first of those primitive types is undefined. You shouldn't set
	a variable to undefined because you want undefined to mean you didn't set the value on your own.
	Undefined represents a lack of existence and this is what JS sets a variable to initially. 
	A second primitive type is null. Null also represents a lack of existence and it's 
	okay for you to set a variable to null. Leave undefined for the JS engine.
	Boolean is a primitive type representing true or false. Number is the fourth primitive type 
	in JS and it is always a floating point number (There's always some decimals). There's only
	one number type and it can make math weird. String is the fifth primitive type in JS and it represents
	a sequence of characters. Symbol is a new sixth primitive type that will be introduced in ES6. It is still
	in development.
*/

// -- Operator -- //

// A special function that is written syntactically different. Generally, operators take two
// parameters and return one result.

var opA = 3 + 4;
// this plus sign is an operator function. It's just called from an infix position and 
// doesn't have parentheses or brackets.
console.log(opA);

// Operator precedence //
// This just means which operator functions gets called first.
// Functions are called in order of precedence and the higher 
// precedence wins.

// Associativity //

// What order operator functions get called in:
// left to right or right to left. This is when
// functions have the same precedence.

var opA = 3 + 4 * 5;
console.log(opA);

var aTest = 2, bTest = 3, cTest = 4;

aTest = bTest = cTest;

console.log(aTest);
console.log(bTest);
console.log(cTest);

// -- Coercion -- //
// This means to convert a value from one type to another or at least to attempt to convert it.
// This happens quite a bit in JS because it is dynamically typed. 

var convertMe = "1" + 2;
console.log(convertMe);

// Coercion will happen here. The JS engine will try its best to type coerce values. It will
// do that on its own at runtime instead of giving you an error. This has lots to do with
// the fact that JS is explicitly typed. JS tries its best to understand what something
// should be.

// -- Comparison Operators -- //

console.log(3 < 2 < 1);
console.log(1 < 2 < 3);
// Left to right associativity will make the result a little weird,
// but it makes perfect sense because of type coercion.
// False converted to a number is 0, null converted to a number is 0.
// Undefined when coerced will give you NaN which means 'not a number'
// '==' will coerce types, but '===' will not coerce types.

false == 0;
// gives you true
var falsyA = false;
console.log(falsyA == 0);
// gives you true
console.log(null < 1);
// gives you true
console.log(null == 0);
// gives you false
console.log(null === 0);

// Strict equality (===) will compare two values, but will not try to coerce types.
// Strict inequality (!==) does the same thing, non-strict inequality (!=) will coerce types.

var falsyA = 0;
var falsyB = false;

if (falsyA === falsyB) {
	console.log('They are equal!');
} else {
	console.log("Nope, not equal.");
}

if (undefined == false) {
	console.log("Undefined is equal to false when coerced");
} else {
	console.log("Undefined is not equal to false even when type coerced!");
}

// If you convert undefined, null, or an empty string to a boolean, they will equal false.
function greet(name) {
	name = name || '<Your name here>';
	console.log("Hello " + name);
}

greet("Alex");
greet();
// if you call this function without giving it any arguments it will still run.
// It will console log 'Hello undefined', however because of the line (name = name || '<Your name here>';),
// it will set a default value of 'Your name here' since name will be undefined.

console.log("hi" || "hello");
// It will return the first value that returns true;

// -- Default Values and Execution Contexts -- //
