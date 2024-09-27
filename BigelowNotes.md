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

*Bold and Italic:*

- font-style: italic;
- font-weight: bold;


*Unicode and UTF-8:*

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


*Padding:*

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

<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>
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

Example:


*Float:*

The float css property moves an element to the left or right of its container element and allows inline elements to wrap around it. For example, if we had an aside element followed by a large paragraph of text, we could create the following CSS rule in order to cause the text to wrap around the aside.

aside {
  float: right;
  padding: 3em;
  margin: 0.5em;
  border: black solid thin;
}