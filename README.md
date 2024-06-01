# CAS Collective

## Overview

CAS Collective is a web application developed using the MERN stack (MongoDB, Express.js, React, Node.js) and Docker. The application was designed to allow students to store, retrieve, update, and delete JSON documents through an intuitive UI and REST API. The app was actively used by over 200 students during the Fall 2023 semester for various student web applications.

## Project Status

**Note:** The application is currently not functional due to [server configuration changes, removal of cloud database.]. Despite this, the repository serves as a comprehensive showcase of the skills and technologies utilized during its development.

## Features

- **User Management:** Students can create accounts, log in, and manage their profiles.
- **Document Handling:** Users can create, retrieve, update, and delete JSON documents.
- **Intuitive UI:** The front end is built using React to provide a seamless user experience.
- **REST API:** The backend provides a RESTful API for all CRUD operations.
- **Dockerized Deployment:** The application is containerized using Docker for easy deployment and scaling.

## Technologies Used

- **Frontend:**
  - React
  - TailwindCSS
  - Axios
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
- **Tools:**
  - Docker
  - GitHub Actions
  - Postman
  - Vercel (for frontend deployment)
- **Other:**
  - OAuth for authentication
  - Docker for containerization

## Repository Structure

The project is organized into two main directories: `backend` and `frontend`, each containing specific functionalities and features.

### Backend

- `bin/`: Contains the scripts to run the server.
- `node_modules/`: Directory for npm packages.
- `public/stylesheets/style.css`: Stylesheets for the application.
- `src/`: Main source directory
  - `middleware/`: Middleware functions for handling requests.
  - `models/`: Database models and schemas.
  - `routes/`: API routes for the application.
  - `tests/`: Test files for backend functionalities.
- `.env`: Environment variables.
- `.gitignore`: Specifies files to be ignored by Git.
- `app.js`: Main entry point for the backend server.
- `package-lock.json`: Lockfile for npm dependencies.
- `package.json`: Lists dependencies and scripts for the backend.

### Frontend

- `node_modules/`: Directory for npm packages.
- `public/`: Public assets for the frontend.
- `src/`: Main source directory
  - `app/`: Main application logic.
  - `assets/`: Static assets like images and fonts.
  - `components/`: Reusable React components.
  - `features/`: Features of the application.
  - `hooks/`: Custom React hooks.
  - `pages/`: React components for different pages.
  - `stylesheets/`: CSS stylesheets for the application.
- `App.css`: Global CSS styles.
- `App.js`: Main entry point for the React application.
- `index.js`: JavaScript entry point.
- `.env`: Environment variables.
- `.gitignore`: Specifies files to be ignored by Git.
- `package-lock.json`: Lockfile for npm dependencies.
- `package.json`: Lists dependencies and scripts for the frontend.
- `README.md`: Project documentation.
- `web.config`: Configuration file for the web server.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sallin142/cas-collective.git
   cd cas-collective
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Run the application:**
   ```bash
   docker-compose up
   ```

## Setup

To set up the application locally, follow these steps:

1. **Environment Variables:**
   Create a `.env` file in the root directory and populate it with the necessary environment variables. Refer to `.env.example` for required variables.

2. **Database Configuration:**
   Ensure MongoDB is running locally or provide a connection string to a remote MongoDB instance in the `.env` file.

## Usage

Once the application is running, you can access the frontend at `http://localhost:3000` and the backend API at `http://localhost:3000/api`.

## Known Issues

- The application currently does not support [data persistnece] due to [removal of cloud database].

## Future Improvements

- **Refactoring:** Plan to update deprecated libraries and improve codebase.
- **New Features:** Potential to add more features like user notifications, data analytics, etc.
- **Testing:** Implement comprehensive unit and integration tests.

## Screenshots

![Screenshot 1](Screenshot1%20.png)


## Contributors

- **Sallin Koutev** - [GitHub](https://github.com/Sallin142)
- [Other contributors]


## Contact

For any questions or feedback, please contact me at [ska287@sfu.ca](mailto:ska287@sfu.ca).

