# RedCloud Backend

This is the backend service for the Music Player application, designed to handle user authentication, playlist management, and music streaming functionality. The backend is built using NestJs, JWT for authentication, Mongoose for database interactions, and Class-Validator for data validation.

## Table of Contents

  * [Features](#Features)
  * [Tech Stack](#Tech-stack)
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [Configuration](#Configuration)
  * [API Endpoints](#Api-endpoints)

## Features

  * **User Authentication**: Secure sign up and log in using JWT.
  * **Playlist Management**: Create, update, and delete playlists.
  * **Music Streaming**: Endpoints for playing and managing music tracks.
  * **Data Validation**: Ensuring data integrity with Class-Validator.
  * **Database Management**: Efficient data handling using Mongoose.

## Tech Stack

  * **Framework**: NestJs
  * **Authentication**: JWT (JSON Web Tokens)
  * **Database**: MongoDB (via Mongoose)
  * **Validation**: Class-Validator

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/taboorech/RedCloud-backend.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
## Usage
```
npm run start
```
or for development
```
npm run start:dev
```

The server will run on:
```
http://localhost:3001
```

## Configuration

Create a .env file in the root directory with the following variables:

  ```
  ACCESS_TOKEN_SECRET = "__value__"
  ACCESS_TOKEN_EXPIRES = "__value__"
  REFRESH_TOKEN_SECRET = "__value__"
  REFRESH_TOKEN_EXPIRES = "__value__"
  ```

## API Endpoints

Later...
