# Push Lab — real iPhone PWA push test

1. Create a **private GitHub repository** and upload the contents of this folder (package.json, server.js and public directory), not the zip itself.
2. Visit https://dashboard.render.com/ → **New → Web Service**, connect your GitHub repository.
3. Runtime **Node**, build command `npm install`, start command `npm start`, choose the **Free** instance type, then deploy.
4. When deployed, open your `https://YOUR-SERVICE.onrender.com` address on your iPhone **in Safari**.
5. Tap **Share → Add to Home Screen** (on some iOS versions **Add to Home Screen → Open as Web App**). Launch the icon from the Home Screen.
6. Tap **Enable notifications**, then **Allow**.
7. Tap **Send push in 15 seconds**, quickly lock your iPhone, and check for notification.

Requirements: iOS 16.4+, HTTPS, notification permissions. Not a commercial-grade app: anonymous demo endpoint; push keys and single subscription are kept in memory and reset when Render sleeps/restarts. After a restart press Enable again. Free Render web services spin down when idle, but this 15-second test runs during an active request. Don't enter personal data into the demo.
