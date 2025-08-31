# workout_agentic_ai
A training plan generator that takes into account your schedule and past workouts

## Server Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory with the following content:
    ```
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/workout-agentic-ai
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```
    Replace `your_jwt_secret`, `your_google_client_id`, and `your_google_client_secret` with your actual values.

4.  **Google OAuth2 Setup for Calendar Access:**
    To enable Google login and allow the application to read and write to Google Calendar, you need to configure OAuth 2.0 credentials in the Google Cloud Console.

    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Select or create a new project.
    *   Navigate to **APIs & Services > OAuth consent screen** and configure it.
    *   Navigate to **APIs & Services > Credentials**.
    *   Click **+ CREATE CREDENTIALS** and choose **OAuth client ID**.
    *   Select **Web application** as the Application type.
    *   Add `http://localhost:5001/auth/google/callback` to the **Authorized redirect URIs**.
    *   After creating, you will get your `Client ID` (for `GOOGLE_CLIENT_ID`) and `Client Secret` (for `GOOGLE_CLIENT_SECRET`).

    *   **Enable Google Calendar API**: Go to **APIs & Services > Library** and search for "Google Calendar API". Enable it for your project.

5.  Start the server:
    ```bash
    npm start
    ```
