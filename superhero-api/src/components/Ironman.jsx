import React, {useState, useEffect} from 'react'

const Ironman = () => {

    const [movies, setMovies] = useState([])
    
    
    
    const ironManData = async() => {
        let response = await fetch('https://www.omdbapi.com/?s=Iron-Man&apikey=f9befeac')
        let data = await response.json() //json allows us to manipulate data
        console.log(data)
        setMovies(data.Search)

    }



useEffect(() => {
    ironManData()
        
}, [])




  return (
    <div>
        <button onClick={ironManData}>Get Ironman</button>
        <ul>
          {movies.map((movie, index) => {
              return(
                  <li key={index}>
                      <h2>{movie.Title}</h2>
                      <p>{movie.imdbID}</p>
                      <p>{movie.Year}</p>
                      <p>{movie.Type}</p>
                      <img src ={movie.Poster}/>
                      
                  </li>
              ) 
          })}
      </ul>
        
    </div>
  )
}

export default Ironman