# Freel

**Freel Startup Elevator Pitch:**

"Ever had an idea or vision for a project, but lacked the people to make it happen? A bassist for that new song, a videographer for the perfect shot? With Freel, we're solving that problem for local artists and creators.
In a world filled with content, finding collaborators nearby can still feel impossible. Freel’s location- and type-based search lets you discover exactly what you're looking for—whether it's a drummer, a photographer, or a singer—right in your community. Plus, with detailed profiles, artists can showcase their skills, making it easier than ever to connect with the perfect collaborator.
Stop searching and start creating. Freel helps you find the talent you need locally, wherever you are. Join today and discover your next project partner just around the corner."




**Key Features:**
- Content posting with highlighted/pinned content to introduce their page
- Personalized Pages
- Location Filtering
- Instrument Filtering, Project Type Filtering
- Rating/Reviews 
- Person-to-person Communication
- Local events (possible API call) where users can register their attendance 

<img width="833" alt="Screenshot 2024-09-13 at 11 24 56 AM" src="https://github.com/user-attachments/assets/7847b040-64f6-463f-8ac3-e7397261ff23">
<img width="983" alt="Screenshot 2024-09-13 at 11 01 42 AM" src="https://github.com/user-attachments/assets/2f7fa271-c24c-47f3-9912-5737fbc16542">
<img width="1104" alt="Screenshot 2024-09-13 at 11 02 46 AM" src="https://github.com/user-attachments/assets/da8ae3f0-8f58-4a1a-a9a2-e0691c510d47">
<img width="1260" alt="Screenshot 2024-09-13 at 11 08 54 AM" src="https://github.com/user-attachments/assets/8e81c4eb-0726-431e-9f96-abe2133cce95">

**Technology Breakdown:**


*HTML*
- Usage: Provides the structure for multiple web pages like the home page, music artist search, video search, and user profiles (where users can showcase their talent and display post-project ratings). Also, a separate page for login to authenticate users.

*CSS*
- Usage: Styles the app so it looks good across devices. Focus on responsiveness, good whitespace, color contrast, and typography.

*JavaScript/React*
- Usage: Adds interactivity, including handling video and audio playback, searching for nearby artists, rating button interaction, filtering results by location, and filtered searches for musicians based off instrument and music style and for photographers/videographers based off the project (i.e. weddings, mission pics, music video, etc.).

*Web Services*
- Usage: Make remote API calls to the Google Reviews API to fetch or save data, along with a potential API in collecting and publishing data on local, current events.

*Authentication*
- Usage: Handle user registration and login, with checks to make sure users are authenticated before accessing profile, messaging, and search features.

*Database Data*
- Usage: Store user profiles (including salted passwords, unique usernames, instrument etc.), uploaded videos and audio, location data (county/city), and messages.

*WebSocket Data*
- Usage: Enable real-time messaging between users, updates when new videos or music are uploaded (notify when posted for those you follow and if that switch is turned on), and post-project ratings of performance.



## HTML Base Deliverable:
*Links between pages*
- index.html: Links to profile pages of featured users and all oth pages through nav bar.
- profile.html: Link back to main page (index.html) or other relevant pages
- discover.html: Each user box links to their respective profile page
- messaging.html: A "Back To Home" link is present, allowing navigation back to the main page (index.html)

*Application textual content*
- index.html: The "Featured Profiles" heading provides relevant textual content.
- profile.html: User information like name, description and content is displayed, serving as relevant textual content.
- login.html: Login form labels and a "Forgot password" link provide necessary textual content.
- discover.html: Filter labels, user names, and content demos serve a textual content.
- about.html: The "About Us" section contains relevant textual content describing the website/company.
- messaging.html: The conversation with the user and the list of contacts.

*Login placeholder, including username display*
- login.html: The login form includes username and password fields.
- profile.html: Username is displayed.

*Database data placeholder*
- index.html: Featured profiles are pulled from a database based on the user's IP address.
- profile.html: User information such as name, about, email, and website is pulled from a database.
- discover.html: Filters for location, category, and price range are pulled from a database.

*WebSocket data placeholder*
- profile.html: Bell to notify the owner they have someone watching their notifications(follower notification).
- profile.html: Get real time reviews from page and users.

*API/3rd-Party Call placeholder*
- discover.html: API call to display local music events based off IP Address or provided address and pulled from Ticketmaster
- profile.html: API call to PlaceSearch or PlaceDetails (made by Google) for ind. user profile ratings


## CSS Base Deliverable (10/12/24):
*Header, Footer, Main Content, and Navbar*
- (all html pages excluding messaging [unique purpose]) We implemented a consistent header (w/ our website logo at the top), along with a navbar of repeated, clear icons to each page of the website (The login page is not yet functional, so the "Forgot your password?" hyperlink is back to the homepage to continue browsing) 
- (all html pages excluding messaging) We include a consistent footer displaying our names along with our GitHub and version count, this being version 2.0.0

*Responsive to Resizing/Minimizing*
- index.html, discover.html, profile.html: We incorporated grids and flexboxes for these pages to accomodate window resizing and reorder the row elements into column once decreased to a certain min. width, maintaining necessary visibility of the elements without crowding

*Application Elements, Text Content, and Images*
- (all html pages) Our notation still points out the key features of Freel, along with the usage of API calls, WebSocket communication, and database pulls and representations. We have text showing the role and purpose of our product and each divided page (profile page with a bio, discover page with selected filters, etc.)
- index.html, discover.html, profile.html: We included royalty-free images and even a video to help establish the vibe we want for our website *and* showcase the 3 main categories of content our users can create/share and also find/follow, namely: Music, Photography, Videography


## React Deliverable (11/6/24):
*10% Bundled using Vite*
- Project was buddled with Vite.

*50% Multiple react components that implement or mock all app functionality*
- Header and footer 
    built using react and Bootstrap and responds to resizing and navigation. 
- Home 
    on page discover button links to discover.  
- Messages
    mimic functionality of webhooks
- Discover 
    Has filter buttons and a price range.
    separated into components 
    utilizes useState
- Profile
    Has reviews
    responds to resizing 

- We plan to implement more functionality in future deployments when we have a database to reference, webhooks, and API calls(messaging, actual reviews, profiles, profile class structure ...)

*20% React router*
- Pages are routed from app.jsx and not whole new html documents.
- Implemented 404 page

*20% React router*
- Discover left sidebar uses useState
- More implementation of this will come upon login and backend development as other locations for its current use require user class or login status

## Backend Service Implementation Deliverable (11/16/24)
*40% - Create an HTTP service using Node.js and Express*
- Express server implementation with proper middleware configuration
- JSON parsing middleware for request handling
- Error handling and status code management across all endpoints

*10% - Frontend served up using Express static middleware*
- Static file serving configured using express.static('public')
- Public directory setup for frontend asset delivery

*10% - Frontend calls third party service endpoints*
- Ticketmaster Discovery API integration for fetching local events
- Event data retrieval including venue, date, and pricing information

*20% - Backend provides service endpoints*
- Authentication endpoints (/api/auth/login, /api/auth/register, /api/auth/logout)
- User management endpoints with proper routing
- Token generation using UUID for session management
- Database interaction endpoints for user operations

*20% - Frontend calls service endpoints*
- Login functionality with comprehensive error handling
- Registration system with validation checks
- Logout mechanism with token management
- Local storage management for maintaining user sessions
- Discover page calls implimentation of Ticketmaster API
