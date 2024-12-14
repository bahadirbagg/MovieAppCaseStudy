# Movie App Case Study

## Project Overview

The **Movie App** is a web application built as a case study project that allows users to search for movies, view detailed information, watch trailers, and explore movie-related content. The app uses the OMDB API to fetch movie data and the YouTube API to retrieve trailer videos. The project showcases key aspects of modern web development, including React.js, state management, and API integration.

## Features

- **Search for Movies**: Search for movies based on title, genre, or year.
- **Movie Details**: View detailed information about each movie, including plot, rating, runtime, and more.
- **Trailer Videos**: Watch trailers directly from the movie details page.
- **Pagination**: Navigate through large lists of search results with pagination controls.
- **Responsive Design**: The app is designed to be fully responsive across different screen sizes.

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Axios**: For making HTTP requests to the OMDB and YouTube APIs.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **OMDB API**: Provides movie data including title, genre, year, plot, ratings, etc.
- **YouTube API**: Used to fetch YouTube video URLs for movie trailers.

## Setup Instructions

1. Clone this repository:

   ```bash
   git clone https://github.com/bahadirbagg/MovieAppCaseStudy.git

2. Navigate into the project directory:
   
    ```bash
    cd MovieAppCaseStudy

3. Install the dependencies:

   ```bash
   npm install

4. Create a .env file in the root directory and add your API keys:

    ```bash
   REACT_APP_OMDB_API_KEY=your_omdb_api_key
   REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key

5. Run the application:

    ```bash
   npm start
