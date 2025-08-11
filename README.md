# PingMe - Real-Time Chat Application


**PingMe** is a modern, real-time chat application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and powered by **Socket.IO** for seamless, instant messaging. It offers a WhatsApp-like user experience with features like text, emoji, and image messaging, an interactive sidebar for online users, and customizable themes. User authentication is secured with **JWT** and **bcrypt**, while profile pictures are managed via **Cloudinary**. The frontend leverages **Redux Toolkit** and **Async Thunk** for efficient state management and API interactions.

## Features

- **Real-Time Messaging**:
  - Chat with available users using text, emojis, or images.
  - Powered by **Socket.IO** for instant message delivery and updates.
- **Interactive Sidebar**:
  - Displays all available users with their online/offline status.
  - Shows the last message and timestamp for each conversation:
    - "Today" for messages sent today.
    - "Yesterday" for messages sent the previous day.
    - Date format (MM/DD/YYYY) for older messages.
  - Filter to show only online users.
- **User Profile**:
  - View profile details: profile picture, name, email, account creation date, and status.
  - Update profile picture, securely uploaded to **Cloudinary**.
- **Customizable Themes**:
  - Multiple theme options available in the settings page to enhance user experience.
- **Secure Authentication**:
  - User authentication with **JWT** for session management.
  - Password hashing with **bcrypt** for secure storage.
- **Responsive Design**:
  - Optimized for desktop and mobile devices, with a WhatsApp-like interface.

## Tech Stack

- **Frontend**:
  - **React**: For building a dynamic and responsive UI.
  - **Redux Toolkit & Async Thunk**: For state management and asynchronous API calls.
  - **Lucide-React**: For modern icons (e.g., Users, Send, Smile).
  - **emoji-picker-react**: For emoji selection in chat input.
  - **Tailwind CSS & DaisyUI**: For styling and theme customization.
- **Backend**:
  - **Node.js & Express.js**: For RESTful API and server-side logic.
  - **MongoDB & Mongoose**: For database management and schema validation.
  - **Socket.IO**: For real-time bidirectional communication.
  - **JWT**: For secure user authentication.
  - **bcrypt**: For password hashing.
  - **Cloudinary**: For profile picture and image message storage.
- **Other**:
  - **Axios**: For secure API requests with token-based authentication.
  - **react-hot-toast**: For user-friendly notifications.

## Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary** account for image uploads
- **Git** for version control

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Team-Bro-buggers-C211010/Real-Time-Chat-App-Socket.io.git
   cd pingme
   ```

2. **Backend Setup**:
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory with the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     PORT=5000
     NODE_ENV = "development"
     CLIENT_URL = http://localhost:5173
     ```
   - Start the server server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the client directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `client` directory with:
     ```env
     VITE_API_BASE_URL = "http://localhost:3000"
     ```
   - Start the client development server:
     ```bash
     npm run dev
     ```

4. **Cloudinary Configuration**:
   - Sign up for a Cloudinary account and obtain your `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
   - Configure these in the server `.env` file.

### Running the Application
- Start the backend server (`npm start` in `backend`).
- Start the frontend server (`npm start` in `frontend`).
- Open `http://localhost:3000` in your browser to access **PingMe**.

## API Endpoints

- **GET /messages/last/messages**:
  - Fetch all users (except the logged-in user) with their last message and timestamp.
  - Requires JWT authentication.
- **GET /messages/:id**:
  - Fetch all messages between the logged-in user and the specified user.
  - Requires JWT authentication.
- **POST /messages/send/:id**:
  - Send a text or image message to the specified user.
  - Requires JWT authentication.
- **Socket.IO Events**:
  - `newMessage`: Emits new messages to the sender and receiver in real-time.

## Usage

1. **Sign Up / Log In**:
   - Create an account or log in to access the chat interface.
2. **Chat**:
   - Select a user from the sidebar to start a conversation.
   - Send text, emojis (via an emoji picker), or images (uploaded to Cloudinary).
3. **Sidebar**:
   - View all users with their last message and timestamp.
   - Filter to show only online users.
4. **Profile**:
   - Access the profile section to view your name, email, account creation date, status, and profile picture.
   - Update your profile picture via Cloudinary upload.
5. **Settings**:
   - Choose from multiple theme options to customize the app’s appearance.

## Credits

The initial concept for PingMe was inspired by the Real-Time Chat App tutorial by [Codesistency Youtube Channel](https://youtu.be/ntKkVrQqBYY?si=P-OfYbt68l6eYES3). The codebase is entirely original, with significant enhancements including:





- Optimized backend controllers with efficient queries, input validation, and Cloudinary integration.



- Advanced Redux Toolkit and Async Thunk usage for streamlined state management and enhanced sidebar with last message timestamps and online user filtering.



- Added emoji support (emoji-picker-react), image messaging, profile picture updates, and customizable themes.
- Chat interface ui enhanced.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.