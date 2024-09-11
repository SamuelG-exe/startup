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