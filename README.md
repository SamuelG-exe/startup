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
