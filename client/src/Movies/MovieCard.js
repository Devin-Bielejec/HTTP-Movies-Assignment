import React from 'react';
import axios from "axios";

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  
  const deleteMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${props.movie.id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log("Error", err))
  }

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
};

export default MovieCard;
