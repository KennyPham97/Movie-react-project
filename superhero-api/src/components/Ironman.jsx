import React, { useState, useEffect } from 'react' //importing React and my two hooks
import './Ironman.css' //importing my CSS file to style the page

const Ironman = () => {
  const [inputQuery, setInputQuery] = useState('') //I'm setting my searchQuery as a string, the setSearchQuery function can then modify it.
  const [movies, setMovies] = useState([]) //I'm storing movies as an array, and setMovies function will change it.
  const [clickedMovies, setClickedMovies] = useState({})//I'm setting selectedMovies as an object, setSelectedMovies function will be able to update it.
  

  useEffect(() => {
    fetchMovieData('Star-Wars')
  }, []); //My useEffect hook loads up my fetchMovieData function with the Star Wars argument when the page first loads up.

  const fetchMovieData = async (query) => { //this function grabs the API with a query
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=f9befeac`) //the async await stuff waits for the promise to be fullfilled
    let data = await response.json() //the response from the API is used as json and assigning it to data
    console.log(data) //showing the data from the API in the console
    setMovies(data.Search) //I'm setting the data from the API, with the array called "Search" into the movies variable

    if (!data.Search || data.Search.length === 0) { //some edge casing, if there is nothing in search or the user doesn't type anything, the page reloads
      window.location.reload()
    }
  };

  const fetchClickedMovieData = async (imdbID) => {
    let response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=f9befeac`)
    let data = await response.json() //this is another API fetch call that uses the same API URL but a different parameter with imdbID instead
    console.log(data)
    setClickedMovies({ ...clickedMovies, [imdbID]: data })//spread operator that puts the returned IMDB data into a clickedMovies variable. Basically this is the detailed data such as director, rating, plot etc.
  };

  const InputChange = (e) => {
    setInputQuery(e.target.value) //this function will call upon the setInputQuery function to change the input to the user input
  };

  const Search = () => {
    fetchMovieData(inputQuery) //on click, this function will call another function to perform the fetchMovieData function (grabbing API data), based on the updated inputQuery
  };

  return (
    <div>
      <div>
        <h1 className="header">MOVIES.KP <img className='logo' src = "https://www.seekpng.com/png/full/760-7601854_popcornanimater-popcorn-gif-sticker.png"/></h1> 
        <div className="input">
          <input className='input-field' type="text" value={inputQuery} onChange={InputChange} />
          <button className= 'search-button' onClick={Search}>Search</button>
        </div>
      </div> 
      <ul className="movie-list"> 
        {movies.map((movie) => { //iterating through the movie data, returning a list with the titles of the movies, a poster with an event listener onClick that calls the fetchSelectedMovieData function
          return (
            <li className="movie-item"> 
              <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title} onClick={() => fetchClickedMovieData(movie.imdbID)} />
                {clickedMovies[movie.imdbID] && ( //some conditional rendering, it's saying that if there's a matching imdbID in the movies's data set, if there is, then create a div displaying data from the selectedMovies variable. That is the detailed data. The div contains regular p tags, with info grabbed by digging through the object. So looking through the selectedMovies object first which contains all the details, finding the specific movie.imdbID, and then grabbing the value of the index Year, or Genre etc etc. 
                  <div>
                    <p>Year: {clickedMovies[movie.imdbID].Year}</p>
                    <p>Genre: {clickedMovies[movie.imdbID].Genre}</p>
                    <p>Runtime: {clickedMovies[movie.imdbID].Runtime}</p>
                    <p>Rated: {clickedMovies[movie.imdbID].Rated}</p>
                    <p>Actors: {clickedMovies[movie.imdbID].Actors}</p>
                    <p>Director: {clickedMovies[movie.imdbID].Director}</p>
                    <p>Plot: {clickedMovies[movie.imdbID].Plot}</p>
                    <p>imdbRating: {clickedMovies[movie.imdbID].imdbRating}</p> 
                  </div>
                )}
              </li>
            )
          })
        }
      </ul>
      <footer>
        <p className='footer'>2023 Movies.KP. All Rights Reserved to Kenny Pham.</p> 
      </footer>
    </div>
  )
}
export default Ironman;

//The HTML lines I couldn't provide comments for.

      

    

