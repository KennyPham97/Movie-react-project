import React, { useState, useEffect } from 'react'
import './Ironman.css'

const Ironman = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [selectedMovies, setSelectedMovies] = useState({})
  

  useEffect(() => {
    fetchMovieData('Star-Wars')
  }, []);

  const fetchMovieData = async (query) => {
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=f9befeac`)
    let data = await response.json()
    console.log(data)
    setMovies(data.Search || [])

    if (!data.Search || data.Search.length === 0) {
      window.location.reload()
    }
  };

  const fetchSelectedMovieData = async (imdbID) => {
    let response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=f9befeac`)
    let data = await response.json()

    
    setSelectedMovies({ ...selectedMovies, [imdbID]: data })
    console.log(data);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSearch = () => {
    fetchMovieData(searchQuery)
  };

  return (
    <div>
      <div>
        <h1 className="header">MOVIES.KP <img className='logo' src = "https://www.seekpng.com/png/full/760-7601854_popcornanimater-popcorn-gif-sticker.png"/></h1>

        <div className="input">
          <input className='input-field' type="text" value={searchQuery} onChange={handleInputChange} />
          <button className= 'search-button' onClick={handleSearch}>Search</button>
        </div>
      </div>

      <ul className="movie-list">
        {movies.map((movie, index) => {
          return (
            <li key={index} className="movie-item">
              <h2>{movie.Title}</h2>

                <img src={movie.Poster} alt={movie.Title} onClick={() => fetchSelectedMovieData(movie.imdbID)} />

                
                {selectedMovies[movie.imdbID] && (
                  <div>
                    <p>Year: {selectedMovies[movie.imdbID].Year}</p>
                    <p>Genre: {selectedMovies[movie.imdbID].Genre}</p>
                    <p>Runtime: {selectedMovies[movie.imdbID].Runtime}</p>
                    <p>Rated: {selectedMovies[movie.imdbID].Rated}</p>
                    <p>Actors: {selectedMovies[movie.imdbID].Actors}</p>
                    <p>Director: {selectedMovies[movie.imdbID].Director}</p>
                    <p>Plot: {selectedMovies[movie.imdbID].Plot}</p>
                    <p>imdbRating: {selectedMovies[movie.imdbID].imdbRating}</p>
                    
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
