# CS 260 Class Notes:
**Bentley Bigelow**

### 9/6/24
`git` Command Tips:
- To stage/"commit" a change, use `git commit -am "{commit message here}"`
- To upload all staged commits, `git push`
- The `git fetch` command downloads commits, files, and refs from a remote repository into your local repo. Fetching is what you do when you want to see what everybody else has been working on, which is useful if you want to see what changes have been made on the remote server, without making any changes to your local copies.
- With `git pull`, you additionally merge the origin branch to your local branch. 
- Use `git status` to list all new or modified files that haven't yet been committed.

### 9/7/24
- Link to the (elastic) IP Address of Sam's and my shared running server: http://184.73.129.137
- Registered Domain w/ Namecheap.com http://freelconnect.com
- Terminal command to `ssh` in: `ssh -i [key pair file location] ubuntu@184.73.129.137`
- `exit` is the command to leave

### 9/9/24
**Internet Hiearchy:**

Application (Has FTP [File Transfer Protocol], SSH, HTTP[80, old]+HTTPS[433] [get/post/delete/put on a webpage], etc. are on their own ports)

^ Transport (**TCP** = slower but reliable, makes reliable connection first to the port, then transports w/ flow control *vs* **UDP** = unreliable but quicker to connect)

 ^ Inernet (from routers using Internet Protocol language [IP], Host-to-Host connection)

  ^ Physical (Machine, uses WiFi to connect to the router)

- Using IP Address is 32-bits, consisting of Source of Destination, allowing for a unique IP Address in the whole world
- IP is unreliable because you don't know what the load/load size is, just starts sending, if it exceeds the buffer size, we lose info
- DNS converts the IP Address into a human-readable/-intelligible name

**History of the Internet:**
- HTTP (Hypertext Transfer Protocol), HTML (Hyptertext Meta-Language allows us to render complex pages w/ graphics, fonts, etc.), and URL
- CSS lets us style the webpages
- Brendan Eich created JavaScript, provides for interactive elements and dynamic content

Web Browser (HTML, CSS, JavaScript) --> Web Server (DNS, IP)

**Technology Stack:**
- REACT
- Caddy 2
- Node.js
- MongoDB
*User -> Web Browser (React) -> Internet/HTTPS -> AWS EC2 [Elastic Compute Cloud] Web Server (running Gateway thru Caddy, Node.js Web Services, and Atlas MongoDB) 
         
         *Dev -> VS Code, Git, etc. through ssh ->


### 9/13/24

- Encryption w/ public key requires only your private key to decrypt, and vice versa
- Certificate Authority verifies ownership, and you can decrypt any request coming into the website


### 9/16/24

*Terminal Commands:*
- echo - Output the parameters of the command
- cd - Change directory
- mkdir - Make directory
- rmdir - Remove directory
- rm - Remove file(s)
- mv - Move file(s)
- cp - Copy files
- ls - List files
- curl - Command line client URL browser
- grep - Regular expression search
- find - Find files
- top - View running processes with CPU and memory usage
- df - View disk statistics
- cat - Output the contents of a file
- less - Interactively output the contents of a file
- wc - Count the words in a file
- ps - View the currently running processes
- kill - Kill a currently running process
- sudo - Execute a command as a super user (admin)
- ssh - Create a secure shell on a remote computer
- scp - Securely copy files to a remote computer
- history - Show the history of commands
- ping - Check if a website is up
- tracert - Trace the connections to a website
- dig - Show the DNS information for a domain
- man - Look up a command in the manual

You can also chain the input and output of commands using special characters

- | - Take the output from the command on the left and pipe, or pass, it to the command on the right
- \> - Redirect output to a file. Overwrites the file if it exists
- \>\> - Redirect output to a file. Appends if the file exists

For example, you can list the files in a directory, pipe it into grep to search for files created in Nov, and then pipe that into wc to count the number of files found with a date of Nov.

`ls -l | grep ' Nov ' | wc -l`


### 9/18/24

**3.1 HTML:** Structuring Web Applications

<(open tag) html(attribute) lang="en"(attribute value)>
</(closing tag) html>

```html
"<!-- commented text -->"

<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <main>
      <p>Hello world</p>
    </main>
  </body>
</html>
```

Link References:

Absolute:

- "<a href="https://cs260.click/profile.png">"

Relative:

- <a href="profile.png" />
- <a href="../images/profile.png" />

HTML Tutorial Website = 

HTML element = meaning
html = The page container
head = Header information
title = Title of the page
meta = Metadata for the page such as character set or viewport settings
script = JavaScript reference. Either a external reference, or inline
include = External content reference
body = The entire content body of the page
header = Header of the main content
footer = Footer of the main content
nav = Navigational inputs
main = Main content of the page
section = A section of the main content
aside = Aside content from the main content
div = A block division of content
span = An inline span of content
h<1-9> = Text heading. From h1, the highest level, down to h9, the lowest level
p = A paragraph of text
b = Bring attention
table = Table
tr = Table row
th = Table header
td = Table data
ol,ul = Ordered or unordered list
li = List item
a = Anchor the text to a hyperlink
img = Graphical image reference
dialog = Interactive component such as a confirmation
form = A collection of user input
input = User input field
audio = Audio content
video = Video content
svg = Scalable vector graphic content
iframe = Inline frame of another HTML page

*The HTML elements that represent media include img, audio, video, svg, and canvas. The img, audio, and video elements are all simple references to an external file, but svg and canvas both contain the code to render a visual image that can even be animated.


### 9/23,25/24:

*CSS Notes:*

      body {
        color: red;
      }
      p {
        color: green;
      }
      span {
        color: blue;
      }


In this case, the rules cascade down from the highest nodes in the DOM tree to the lowest level. Any declaration property defined at a lower level will override the higher declaration. You can see this happening if you use the browser's debugger. In Chrome right click on the element and select inspect. You can then click on each element in the debugger and see what the value of the color property is. For the case defined above you will see that each of the higher level declarations is crossed out until you get to the style explicitly defined on the element.

/* */ = a comment

- <style> tags are used in HTML files
- to refer to a CSS external file, you need to use the <link rel="stylesheet" type="text/css" href="mystyle.css"> tag to the CSS style sheet in the <head></head> tags

*Different Fonts:*

```html
@font-face {
 font-family: 'Quicksand';
 src: url('https://cs260.click/fonts/quicksand.ttf');
}

p:nth-child(1) { /lets you pick which tag in order that they come/
 font-family: Quicksand;
}

OR

@import url("https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap");

p {
 font-family: "Rubik Microbe";
}
```

*Bold and Italic:*

- font-style: italic;
- font-weight: bold;


*Unicode and UTF-8:*

```html
<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="UTF-8" />
 </head>
 <body>
   <p>하나님은 나의 빛이시다</p>
   <p>😃 &#128521;</p>
 </body>
</html>

*Animation:*

@keyframes demo {
 from {
   font-size: 0vh;
 }

 95% {
   font-size: 21vh;
 }

 to {
   font-size: 20vh;
 }
}


p {
 text-align: center;
 font-size: 20vh;

 animation-name: demo;
 animation-duration: 3s;
 OR
 animation: demo 1s infinite alternate;
}
```

The top border = 10 pixels
The bottom border = 5 pixels
The left border = 20 pixels
The right border = 1pixel

border-width:10px 1px 5px 20px;

- text-transform:capitalize  
- list-style-type: square;  
- To select element w/ ID "demo", do #demo
- To select all p elements inside a div element = div p
- group selectors = Separate each selector with a comma
- Def. position property = static

*Margin:*

- Margin is the space outside an element's border.
- It controls the spacing between different elements on the page.
- Margin pushes adjacent elements away to create a gap between them.
- The element's background color does not extend into the margin area.
- Margin can have negative values and the auto keyword.

*Padding:*

- Padding is the space between an element's content and its border.
- It controls the spacing inside an element, around its content.
- Padding increases the size of the element.
- The element's background color extends into the padding area.
- Padding cannot have negative values or use the auto keyword.

Some other key points for differences between *Margin* and *Padding*:
Adjacent vertical margins collapse, taking the largest margin value, while padding values stack.
Margin is for positioning an element in relation to others, while padding is for styling the look of an individual element.
Margins are transparent, while padding takes on the element's background color.


*Display:*

- The CSS display property allows you to change how an HTML element is displayed by the browser. The common options for the display property include the following.

Value	Meaning
none	= Don't display this element. The element still exists, but the browser will not render it.
block	= Display this element with a width that fills its parent element. A p or div element has block display by default.
inline	= Display this element with a width that is only as big as its content. A b or span element has inline display by default.
flex	= Display this element's children in a flexible orientation.
grid	= Display this element's children in a grid orientation.

- We can demonstrate the different CSS display property values with the following HTML that contains a bunch of div elements. By default div elements have a display property value of block.

```html
<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>```
<div class="flex">
  <div>FlexA</div>
  <div>FlexB</div>
  <div>FlexC</div>
  <div>FlexD</div>
</div>
<div class="grid">
  <div>GridA</div>
  <div>GridB</div>
  <div>GridC</div>
  <div>GridD</div>
</div>

.none {
  display: none;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

Example:
<img width="491" alt="Screenshot 2024-09-27 at 11 22 48 AM" src="https://github.com/user-attachments/assets/c81de5a9-a072-4762-be55-2d2a8381107a">


*Float:*

The float css property moves an element to the left or right of its container element and allows inline elements to wrap around it. For example, if we had an aside element followed by a large paragraph of text, we could create the following CSS rule in order to cause the text to wrap around the aside.

aside {
  float: right;
  padding: 3em;
  margin: 0.5em;
  border: black solid thin;
}


*Grid:*

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

*CSS Element References:*

```html
<a class="nav-link" href="#accordionExample">Accordion</a>
```
- Make sure the href=# is to an *ID*, not to a class

**JavaScript:**

```html
<!DOCTYPE html>
<html>
<body>

<h2>My First JavaScript</h2>

<button type="button"
onclick="document.getElementById('demo').innerHTML = Date()">
Click me to display Date and Time.</button>

<p id="demo">Will be replaced w/ date</p>

</body>
</html> 
```
*Change HTML Attribute Values:*
```html
<!DOCTYPE html>
<html>
<body>

<h2>What Can JavaScript Do?</h2>

<p>JavaScript can change HTML attribute values.</p>

<p>In this case JavaScript changes the value of the src (source) attribute of an image.</p>

<button onclick="document.getElementById('myImage').src='pic_bulbon.gif'">Turn on the light</button>

<img id="myImage" src="pic_bulboff.gif" style="width:100px">

<button onclick="document.getElementById('myImage').src='pic_bulboff.gif'">Turn off the light</button>

</body>
</html>
```

*Change CSS Style of Element:*
```html
<!DOCTYPE html>
<html>
<body>

<h2>What Can JavaScript Do?</h2>

<p id="demo">JavaScript can change the style of an HTML element.</p>

<button type="button" onclick="document.getElementById('demo').style.fontSize='35px'">Click Me!</button>

</body>
</html> 
```


*Hide HTML Elements:*
```html
<!DOCTYPE html>
<html>
<body>

<h2>What Can JavaScript Do?</h2>

<p id="demo">JavaScript can hide HTML elements.</p>

<button type="button" onclick="document.getElementById('demo').style.display='none'">Click Me!</button>

</body>
</html> 
```
- But you can still reactive the HTML element, it's still there!


*Create Window Alert:*
```html
<!DOCTYPE html>
<html>
<body>

<h2>My First Web Page</h2>
<p>My first paragraph.</p>

<script>
window.alert(5 + 6);
</script>

</body>
</html> 
```

*Linking to JS File:*
- In the body tags at the bottom
```html
<script src="myScript.js"></script>
```


**JavaScript Objects:**

```html
<!DOCTYPE html>
<html>
<body>
<h1>Creating JavaScript Objects</h1>
<h2>Using an Object Literal</h2>

<p id="demo"></p>

<script>
// Create an Object:
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Display Data from the Object:
document.getElementById("demo").innerHTML =
person.firstName + " is " + person.age + " years old.";
</script>

</body>
</html>
```


*JavaScript Functions:*

- Can be passed as parameters
- Anything nonzero is True, anything 0/empty is False
- having a function `start(fn)` with the param. `fn`, if we didn't give a param., then
- `fn = fn || variables` and if `fn` wasn't given/defined, it will default to the first 'true' value (could be ternary w/ just 2, or mult. with ||)
- Use `===` for true equality
- For anonymous functions i.e. lambdas, use the keyword `function` or `const arrowMethod = (param) => {return a+2;};` that can be void, return a value, and take any # of arguments
- To turn a variable into an active function, use the variable name + () w/ or w/o parameters
- If you return an arrow function w/ a function, you can string the parameters together

```java
dup(duplimit){
  return (t) => {
    ...
    //uses both duplimit and t
  }
}

dup(3)('again');
// 3 is passed in first for duplimit and then 'again' for 3
```

*JavaScript Arrays:*

The Array object has several interesting static functions associated with it. Here are some of the interesting ones.

Function	Meaning	Example
- push	Add an item to the end of the array	a.push(4)
- pop	Remove an item from the end of the array	x = a.pop()
- slice	Return a sub-array	a.slice(1,-1)
- sort	Run a function to sort an array in place	a.sort((a,b) => b-a)
- values	Creates an iterator for use with a for of loop	for (i of a.values()) {...}
- find	Find the first item satisfied by a test function	a.find(i => i < 2)
- forEach	Run a function on each array item	a.forEach(console.log)
- reduce	Run a function to reduce each array item to a single item	a.reduce((a, c) => a + c)
- map	Run a function to map an array to a new array	a.map(i => i+i)
- filter	Run a function to remove items	a.filter(i => i%2)
- every	Run a function to test if all items match	a.every(i => i < 3)
- some	Run a function to test if any items match	a.some(i => i < 1)

```java
const a = [1, 2, 3];

console.log(a.map((i) => i + i));
// OUTPUT: [2,4,6]
console.log(a.reduce((v1, v2) => v1 + v2));
// OUTPUT: 6
console.log(a.sort((v1, v2) => v2 - v1));
// OUTPUT: [3,2,1]

a.push(4);
console.log(a.length);
// OUTPUT: 4
```

*JavaScript Regular Expressions:*

`/pattern/modifiers;`
- ex) /w3schools/i;

Modifiers:

- i	Perform case-insensitive matching	
- g	Perform a global match (find all)	
- m	Perform multiline matching	
- d	Perform start and end matching (New in ES2022)

**Regular Expression Patterns:**

Brackets are used to find a range of characters:

- [abc]	Find any of the characters between the brackets	
- [0-9]	Find any of the digits between the brackets	
- (x|y)	Find any of the alternatives separated with |	
- Metacharacters are characters with a special meaning:

Metacharacters:

- \d	Find a digit	
- \s	Find a whitespace character	
- \b	Find a match at the beginning of a word like this: \bWORD, or at the end of a word like this: WORD\b	
- \uxxxx	Find the Unicode character specified by the hexadecimal number xxxx	

Quantifiers define quantities:

- n+	Matches any string that contains at least one n
- n*	Matches any string that contains zero or more occurrences of n
- n?	Matches any string that contains zero or one occurrences of n


*`.search()` and `.replace()`*

```java
let text = "Visit W3Schools!";
let n = text.search("W3Schools");
// OUTPUT for n = index pos. of pattern found start

let text = "Visit Microsoft!";
let result = text.replace("Microsoft", "W3Schools");
```

*Other JavaScript Built-In Syntax:*

**Rest**

- JavaScript provides the rest syntax to make this easier. Think of it as a parameter that contains the rest of the parameters. To turn the last parameter of any function into a rest parameter you prefix it with three periods. You can then call it with any number of parameters and they are all automatically combined into an array.

```java
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```

**Spread**

- Spread does the opposite of rest. It take an object that is iterable (e.g. array or string) and expands it into a function's parameters. Consider the following.

```java
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```

*JavaScript Try/Catch/Finally:*

```java
try {
  // normal execution code
} catch (err) {
  // exception handling code
} finally {
  // always called code
}
```

- The fallback pattern is commonly implemented using exception handling. To implement the fallback pattern you put the normal feature path in a try block and then provide a fallback implementation in the catch block. For example, normally you would get the high scores for a game by making a network request, but if the network is not available then a locally cached version of the last available scores is used. By providing a fallback, you can always return something, even if the desired feature is temporarily unavailable.

```java
function getScores() {
  try {
    const scores = scoringService.getScores();
    // store the scores so that we can use them later if the network is not available
    window.localStorage.setItem('scores', scores);
    return scores;
  } catch {
    return window.localStorage.getItem('scores');
  }
}
```

*JavaScript Destructuring:*

```java
const a = [1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
```

and

```java
const [b, c, ...others] = a;

console.log(b, c, others);
// OUTPUT: 1, 2, [4,5]
```


**Midterm Practice Question Notes:**

By default, the HTML span element has a default CSS display property value of:
- inline
- <span> elements are inline by default, meaning they flow with the surrounding text without forcing a new line, and their dimensions are set by their content rather than CSS width/height properties. This is in contrast to block-level elements like <div> that start on a new line and take up the full available width by default

How would you use CSS to change all the div elements to have a background color of red?
```css
div {
  background-color: red;
}
```

How would you display an image with a hyperlink in HTML?
```html
<a href="url">
  <img src="image.jpg" alt="description">
</a>
```

Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
```html
<p>Here comes <span>double</span> <span>trouble</span>!</p>
```
```css
span:last-child {
  color: green;
}
```

What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
- Paragraph: <p>
- Ordered list: <ol>3
- Unordered list: <ul>3
- Second level heading: <h2>
- First level heading: <h1>
- Third level heading: <h3>


How do you declare the document type to be html?
- <!DOCTYPE html>



How would you use JavaScript to select an element with the id of "byu" and change the text color of that element to green?
```js
document.getElementById("byu").style.color = "green";
```

What is valid javascript syntax for if, else, for, while, switch statements?
```js
if (condition) {
  // code
} else if (condition) {
  // code  
} else {
  // code
}

for (initialization; condition; final-expression) {
  // code
}

while (condition) {
   // code
}

switch(expression) {
  case x:
    // code
    break;
  case y:
    // code
    break;
  default:
    // code
}
```

What is the correct syntax for creating a javascript object?
```js
const obj = {
  property1: value1,
  property2: value2
};
```


Is it possible to add new properties to javascript objects?
- Yes, you can add new properties to JavaScript objects after they are created using dot notation or bracket notation:

```js
obj.newProperty = "new value";
obj["another new property"] = 123;
```

If you want to include JavaScript on an HTML page, which tag do you use?
- <script>

Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
```xml
<p>My favorite <span id="animal">animal</span> is a <span id="fish">fish</span>.</p>
```
```js
document.getElementById("animal").textContent = "crow";
```

Which of the following correctly describes JSON?
- JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate.

Command Line
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?
- chmod: change file modes or access control lists
- pwd: print name of current/working directory
- cd: change the working directory
- ls: list directory contents
- vim: text editor
- nano: text editor
- mkdir: make directories
- mv: move (rename) files
- rm: remove files or directories
- man: an interface to the system reference manuals
- ssh: remote login program
- ps: report a snapshot of the current processes
- wget: network downloader
- sudo: execute a command as another user (typically superuser)

Which of the following console command creates a remote shell session?
- ssh

Which of the following is true when the -la parameter is specified for the ls console command?
- The -la option combines -l (use a long listing format) and -a (do not ignore entries starting with .). So it shows all files, including hidden ones, in the long listing format.

Domains and Networking
Which of the following is true for the domain name banana.fruit.bozo.click:
- Top-level domain: .click
- Subdomain: banana
- Root domain: bozo.click

Is a web certificate necessary to use HTTPS?
- Yes, an SSL/TLS certificate is required to enable HTTPS on a website7. The certificate provides the encryption for the secure connection.

Can a DNS A record point to an IP address or another A record?
- A DNS A record points to an IP address. It cannot directly point to another A record.

Port 443, 80, 22 is reserved for which protocol?
- Port 443: HTTPS
- Port 80: HTTP
- Port 22: SSH





**Web Frameworks:**

- Every React function you create is a new tag

*React Component Function Creation:*
```js
const Hello = ({ phrase }) => {
  return (
    <div>
      <p>Hello {phrase}</p>
    </div>
  );
};

ReactDOM.render(<Hello phrase="cs260" />,document.querySelector("#root"));
```
- We pass the parameter in the tag declaration

```js
const Hello = () => {
  const [color, setColor] = React.useState("red");

  function changeColor() {
    setColor(color === "red" ? "green" : "red");
  }

  return (
    <div>
      <p style={{ color: color }}>Hello</p>
      <button onClick={changeColor}>change</button>
    </div>
  );
};

ReactDOM.render(<Hello phrase="function" />,document.querySelector("#root"));
```

*JavaScript Promises Chain:*
```js
function pickupPizza() {
  const order = createOrder();

  // Promise
  placeOrder(order)
    .then((order) => makePizza(order))
    .then((order) => serveOrder(order))
    .catch((order) => {
      orderFailure(order);
    });
}
```


*JavaScript Async/Await Keywords:*
```js
async function pickupPizza() {
  const order = createOrder();

  try {
    //use of await keyword w/ call to Promise func!
    serveOrder(await placeOrder(order));
  } catch (order) {
    orderFailure(order);
  }
}
```

**Midterm Mistakes:**

1. What does the following code do? = Sets "f" to a function that returns the square of "x" (the "=>" implies a return statement)
```js
const f = x => x * x;
```

2. What does the following code output? = [ 2, 4, 6, 8, 10 ]
```js
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let b = a.filter(number => {
  return (number % 2 === 0)
});
console.log(b);
```

3. Which of the following are valid syntax for creating a function in JavaScript?
- let execute = (x) => { } 
- function f(x) { }
- const f = function(x) { }

4. Given the following HTML, what JavaScript could you use to set the text "yes" to "cow" and leave the "no" text unaffected?
- document.querySelector("p.demo").textContent = "cow";
```html
<p>no</p>
<p class="demo">yes</p>
<div class="demo">no</div>
```

5. What will the following code output when executed? 
- ski taco banana fish
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
     console.log('banana')
     resolve(true);
  }, 10000);
});
console.log('ski');

p.then((result) => console.log('fish'));

console.log('taco');
```

*Vite Notes:*
<a href=https://learn.cs260.click/page/webFrameworks/react/vite/vite_md>Vite Info</a>

- If youre going to make a function that returns more than one thing it has to be wrapped in a empty <></> or a div tag but just use the empty.
- Files that are just react component functions need to have Export Default


*React Notes:*

- using `React.useState()` gives us a variable in the Virtual DOM for the state, initializing it for what we want, but it keeps track of state for the component
- you set it equal to a `const [val, updateVal]` since `React.useState()` returns an array we "deconstruct," the 2nd variable MUST be used to change the first
- We can deconstruct objects into their respective

```jsx
import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const Survey = () => {
  const [text, updateText] = React.useState("");

  // When the text changes update the state
  const whenChanging = (e) => {
    updateText(e.target.value);
  };

  return (
    <div>
      <h1>Survey</h1>

      {/* Pass the Survey color  as a parameter to the Question.
          When the color changes the Question parameter will also be updated and rendered. */}
      <Question answer={text} />

      <p>
        <span class="prompt">Input some text => </span>
        {/* Set the Survey color state as a the value of the color picker.
            When the color changes, the value will also be updated and rendered. */}
        <input
          type="text"
          onChange={(e) => whenChanging(e)}
          placeholder="put something down!"
        />
      </p>
    </div>
  );
};

// The Question component
const Question = ({ answer }) => {
  return (
    <div>
      {/* Answer rerendered whenever the parameter changes */}
      <p>Your provided text: {answer}</p>
    </div>
  );
};

ReactDOM.render(<Survey />, document.getElementById("root"));
```

- {} are included to evaluate the variable OR when passing in a property as a parameter to another function, you put braces around it to "deconstruct" and grab the element/attribute you needed. For example:

```js
<Question answer={text} random={elements, and stuff} />
...
const Question = ({ answer }) => {
  return (
    <div>
      {/* Answer rerendered whenever the parameter changes */}
      <p>Your provided text: {answer}</p>
    </div>
  );
};
```

*is the same as (stuff name is arbitrary)

```js
<Question answer={text} random={elements, and stuff}/>
...
const Question = (stuff) => {
  return (
    <div>
      {/* Answer rerendered whenever the parameter changes */}
      <p>Your provided text: {stuff.answer}</p>
    </div>
  );
};
```

**Fetch (Getting API Info):**

```js
fetch(url)
   .then(r => r.text())
   .then(text => console.log(text))
```

## Final Review Notes: 

1. **What is the default port for HTTP/HTTPS/SSH?**  
   - **HTTP**: 80  
   - **HTTPS**: 443  
   - **SSH**: 22  

2. **What does an HTTP status code in the range of 300/400/500 indicate?**  
   - **300**: Redirection (e.g., `301 Moved Permanently`, `302 Found`).  
   - **400**: Client errors (e.g., `404 Not Found`, `401 Unauthorized`).  
   - **500**: Server errors (e.g., `500 Internal Server Error`, `502 Bad Gateway`).  

3. **What does the HTTP header `Content-Type` allow you to do?**  
   - Specify the media type (MIME type) of the resource being sent, e.g., `application/json`, `text/html`, `image/png`. This informs the client how to process the response.

4. **What does a “Secure cookie”/“Http-only cookie”/“Same-site cookie” do?**  
   - **Secure cookie**: Transmitted only over HTTPS.  
   - **Http-only cookie**: Not accessible via JavaScript (reduces XSS risk).  
   - **Same-site cookie**: Restricts cookie sharing between sites to mitigate CSRF (options: `Strict`, `Lax`).

5. **Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of `/api/document`?**  
   - The output depends on the middleware’s code. For example:  
     ```javascript
     app.use((req, res, next) => {
       console.log(req.method, req.path);
       next();
     });
     ```
     For `GET /api/document`, the output would be:  
     `GET /api/document`.

6. **Given the following Express service code: What does the following front-end JavaScript that performs a fetch return?**  
   - The return depends on the backend response. For example, if the backend sends JSON like `{ "message": "success" }`, the fetch would return this JSON.

7. **Given the following MongoDB query, select all of the matching documents `{name: "Mark"}`.**  
   - Matches all documents in the collection where the `name` field equals `"Mark"`.

8. **How should user passwords be stored?**  
   - Using a **secure hashing algorithm** like bcrypt, Argon2, or PBKDF2 with a unique salt per password.

9. **Assuming the following Node.js WebSocket code in the backend, and the following front-end WebSocket code, what will the front end log to the console?**  
   - The log depends on the backend message. If the backend sends `"Hello"`, the front end will log `"Hello"`.

10. **What is the WebSocket protocol intended to provide?**  
    - A persistent, full-duplex communication channel between client and server over a single TCP connection.

11. **What do the following acronyms stand for?**  
    - **JSX**: JavaScript XML  
    - **JS**: JavaScript  
    - **AWS**: Amazon Web Services  
    - **NPM**: Node Package Manager  
    - **NVM**: Node Version Manager  

12. **Assuming an HTML document with a body element, what text content will the following React component generate?**  
    - React components generate text content as defined by their `render` logic or return statement.

13. **Given a set of components that include each other, what will be generated?**  
    - React resolves and renders the components hierarchically. Circular dependencies may throw an error.

14. **What does a React component with `React.useState` do?**  
    - Provides state management within a functional component.

15. **What are React Hooks used for?**  
    - To manage state, lifecycle, and other side effects in functional components.

16. **What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do?**  
    - **State Hook**: Manages state (`useState`).  
    - **Context Hook**: Shares state across components (`useContext`).  
    - **Ref Hook**: Accesses DOM nodes or persists values across renders (`useRef`).  
    - **Effect Hook**: Manages side effects (`useEffect`).  
    - **Performance Hook**: Optimizes performance (`useMemo`, `useCallback`).

17. **Given React Router code, select statements that are true.**  
    - True statements depend on the code. Examples might include route matching behavior or nested routing.

18. **What does the `package.json` file do?**  
    - Specifies project metadata, dependencies, scripts, and configuration for a Node.js project.

19. **What does the `fetch` function do?**  
    - Makes HTTP requests, returning a `Promise` for the response.

20. **What does Node.js do?**  
    - Provides a runtime for executing JavaScript on the server side.

21. **What does `pm2` do?**  
    - A process manager for Node.js applications, providing features like clustering, monitoring, and restarting on failure.

22. **What does Vite do?**  
    - A fast build tool and development server optimized for modern web projects, offering instant HMR and optimized builds.



**JavaScript & React Fundamentals:**

Basic JavaScript Syntax:
JavaScript is case-sensitive and statements end with semicolons1
Variables must be defined before use and can contain A-Z, a-z, underscore, or digits1
Strings require single or double quotes1
Special characters need backslash escape1
JSX extends JavaScript to allow HTML-like code alongside it2


React Components:
Components take props as parameters and return views via render method12
JSX syntax transforms to React.createElement() at build time12
State and props are used to store and pass data between components18
Components automatically re-render when state changes18


Web Protocols
HTTP Protocol
Works on Client-Server model using TCP/IP3
Client establishes TCP connection, sends request, receives response, then closes connection3
Request format includes Request-line, headers, empty line, and optional message body4


WebSocket
Created using WebSocket constructor with URL and optional protocols8
Enables bi-directional communication between client and server8
Uses wss:// or ws:// URL schemes8


Web Services

Core Concepts
Enables machine-to-machine interaction over networks5
Uses standardized messaging protocols5
Supports reusing code, delivering services, and connecting existing programs5

Types
REST-compliant services: manipulate XML representations using stateless operations15
SOAP-based services: use SOAP messages over HTTP15
AJAX: combines HTTP servers, JavaScript clients, and XML/JSON15


Database Services (MongoDB)
Key Features
Document-oriented NoSQL database16
Stores data in JSON documents using BSON format16
Supports indexing for faster access16
Provides replica sets for high availability16
Enables horizontal scaling through sharding16


Security Best Practices

Essential Measures
Encrypt data and web traffic channels10
Automate and integrate security software10
Update software to patch vulnerabilities10
Escape, validate, and sanitize incoming inputs10
Manage cookies and authentication tokens10


Web Application Frameworks
Types
Frontend frameworks: handle UI, user experience, and component architecture9
Backend frameworks: manage server-side operations and database interactions9
Popular Frameworks
Angular: component-based architecture with TypeScript9
Django: Python-based with built-in admin interface9
ASP.NET: Microsoft's framework for desktop and mobile applications9


Authorization Services
Key Aspects
Outsources permission and access control management7
Streamlines application development process7
Provides resilient access control7
Allows focus on core application features