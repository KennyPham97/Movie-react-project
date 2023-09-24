import React, { useState, useEffect } from 'react'
import './Ironman.css'

const Ironman = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)

  const ironManData = async (query) => {
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=f9befeac`)
    let data = await response.json()
    console.log(data)
    setMovies(data.Search)
  };

  useEffect(() => {
    ironManData('Iron-Man')
  }, [])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSearch = () => {
    ironManData(searchQuery)
  };

  return (
    <div>
      <div>
        <input type="text"placeholder=""value={searchQuery}onChange={handleInputChange}/>
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <ul className="movie-list">
        {movies.map((movie, index) => {
          return (
            <li key={index} className="movie-item">
              <h2>{movie.Title}</h2>

              <img src={movie.Poster} alt={movie.Title} onClick={() => handleMovieClick(movie)}/>
              {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
                <div>
                  <p>Year: {selectedMovie.Year}</p>
                  <p>Type: {selectedMovie.Type}</p>
                </div>
              )}
            </li>
          
          );
        })}
      </ul>
    </div>
  );
};

export default Ironman;





