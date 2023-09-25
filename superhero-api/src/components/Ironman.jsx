// import React, { useState, useEffect } from 'react'
// import './Ironman.css'

// const Ironman = () => {
//     const [searchQuery, setSearchQuery] = useState("")
//     const [movies, setMovies] = useState([])
//     const [selectedMovie, setSelectedMovie] = useState(null)
    
//     useEffect(() => {
//       fetchMovieData('Iron-Man')
//     }, [])
    
//     const fetchMovieData = async (query) => {
//     let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=f9befeac`)
//     let data = await response.json()
//     console.log(data)
//     setMovies(data.Search || [])
//   };


  
//     const handleInputChange = (e) => {
//       setSearchQuery(e.target.value)
//     };
    
//     const handleSearch = () => {
//         fetchMovieData(searchQuery)
//     };
//     const handleMovieClick = (movie) => {
//       setSelectedMovie(movie)
//     };
    
//   return (
//     <div>
//       <div>
//         <h1 className='header'>MOVIES.KP</h1>
//         <div className='input'>
//         <input type="text"value={searchQuery}onChange={handleInputChange}/>
//         <button onClick={handleSearch}>Search</button>
//         </div>
//       </div>
      
//       <ul className="movie-list">
//         {movies.map((movie, index) => {
//           return (
//             <li key={index} className="movie-item">
//               <h2>{movie.Title}</h2>

//               <img src={movie.Poster} alt={movie.Title} onClick={() => handleMovieClick(movie)}/>
//               {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
//                 <div>
//                   <p>Year: {selectedMovie.Year}</p>
//                   <p>Type: {selectedMovie.Type}</p>
//                 </div>
//               )}
//             </li>
          
//           )
//         })}
//       </ul>
//     </div>
//   )
// }
// export default Ironman;






import React, { useState, useEffect } from 'react'
import './Ironman.css'

const Ironman = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    fetchMovieData('Iron-Man')
  }, []);

  const fetchMovieData = async (query) => {
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=f9befeac`);
    let data = await response.json();
    console.log(data);
    setMovies(data.Search || []);

    
    if (!data.Search || data.Search.length === 0) {
      window.location.reload();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSearch = () => {
    fetchMovieData(searchQuery)
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <div>
        <h1 className="header">MOVIES.KP</h1>
        <div className="input">
          <input type="text" value={searchQuery} onChange={handleInputChange} />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <ul className="movie-list">
        {movies.length === 0 ? (<p>No Movies Found</p>) : (movies.map((movie, index) => {
            return (
              <li key={index} className="movie-item">
                <h2>{movie.Title}</h2>

                <img src={movie.Poster} alt={movie.Title} onClick={() => handleMovieClick(movie)} />
                {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
                  <div>
                    <p>Year: {selectedMovie.Year}</p>
                    <p>Type: {selectedMovie.Type}</p>
                  </div>
                )}
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

export default Ironman;
