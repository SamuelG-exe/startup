# startup

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


**Technology Breakdown:**

*HTML*
- Usage: Provides the structure for multiple web pages like the home page, music artist search, video search, and user profiles (where users can showcase their talent and display post-project ratings). Also, a separate page for login to authenticate users.

*CSS*
- Usage: Styles the app so it looks good across devices. Focus on responsiveness, good whitespace, color contrast, and typography.

*JavaScript*
- Usage: Adds interactivity, including handling video and audio playback, searching for nearby artists, rating button interaction, filtering results by location, and filtered searches for musicians based off instrument and music style and for photographers/videographers based off the project (i.e. weddings, mission pics, music video, etc.).

*React*
- Usage: Power the front-end with React for a single-page application (SPA) feel, while managing components and routing across different views.

*Web Services*
- Usage: Make remote API calls to the Google Reviews API to fetch or save data, along with a potential API in collecting and publishing data on local, current events.

*Authentication*
- Usage: Handle user registration and login, with checks to make sure users are authenticated before accessing profile, messaging, and search features.

*Database Data*
- Usage: Store user profiles (including salted passwords, unique usernames, instrument etc.), uploaded videos and audio, location data (county/city), and messages.

*WebSocket Data*
- Usage: Enable real-time messaging between users, updates when new videos or music are uploaded, and post-project ratings of performance.