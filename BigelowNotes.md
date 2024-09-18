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