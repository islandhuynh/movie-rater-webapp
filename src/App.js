import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token']);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data])

  useEffect(() => {
    if(!token['mr-token']) window.location.href ='/';
  }, [token])

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  };

  const updateMovies = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })

    setMovies(newMovies);
  };

  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null);
  };

  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  };

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  };

  const removeClicked = movie => {
    const newMovies = movies.filter( mov => {
      if (mov.id === movie.id) {
        return false
      } else {
        return true
      }
    })

    setMovies(newMovies);
  };

  const logoutUser = () => {
    deleteToken(['mr-token']);
  };

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading movies</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1><FontAwesomeIcon icon={faFilm}/><span>Movie Rater</span></h1>
      </header>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      <div className="layout">
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={loadMovie} 
            editClicked={editClicked} 
            removeClicked={removeClicked}
          />
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        { editedMovie ? 
          <MovieForm 
            movie={editedMovie} 
            updateMovies={updateMovies} 
            movieCreated={movieCreated}
          /> 
          : 
          null
        }
      </div>
    </div>
  );
}

export default App;
