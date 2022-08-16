import { useEffect, useState } from 'react';
import './App.css';

function App() {
  //https://omdbapi.com/?t=the avengers&apikey=270e0d0f

  let [movieinfo, setMovieinfo] = useState(null);
  let [title, setTitle] = useState('Guardians of the Galaxy Vol. 2');
  useEffect(() => {
    getMovieData();
  }, []);

  function readTitle(value) {
    setTitle(value);
  }
  function getMovieData() {
    let url = `https://omdbapi.com/?t=${title}&apikey=270e0d0f`;
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        setMovieinfo(movie);
        console.log(movie);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="App">
      <div className="container">
        <div className="padd">
          <h1>Movie Search</h1>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Movie Name"
              onChange={(event) => {
                readTitle(event.target.value);
              }}
              className="search-field"
            />
            <button className="btn" onClick={getMovieData}>
              Get Movie
            </button>
          </div>
        </div>
        {movieinfo?.Error === undefined ? (
          <div className="movie">
            <div className="poster">
              <img
                src={movieinfo?.Poster}
                alt="poster"
                className="img-poster"
              />
            </div>
            <div className="details">
              <div className="padd">
                <h2>{movieinfo?.Title}</h2>
                <p>
                  <strong>Genre </strong>: {movieinfo?.Genre}
                </p>
                <p>
                  <strong>Directed By </strong>: {movieinfo?.Director}
                </p>
                <p>
                  <strong>Plot </strong>: {movieinfo?.Plot}
                </p>
                <p>
                  <strong>Cast </strong>: {movieinfo?.Actors}
                </p>
                <p>
                  <strong>Box Office </strong>: {movieinfo?.BoxOffice}
                </p>
                <p>
                  <strong>Released Date </strong>: {movieinfo?.Released}
                </p>
                <p>
                  <strong>Runtime </strong>: {movieinfo?.Runtime}
                </p>
                <p>
                  <strong>Language </strong>: {movieinfo?.Language}
                </p>
                <p>
                  <strong>Awards </strong>: {movieinfo?.Awards}
                </p>
                <div className="ratings">
                  <strong>Ratings:&nbsp; </strong>
                  {movieinfo?.Ratings.map((rating, index) => (
                    <div key={index}>
                      <strong>{rating.Source} &nbsp;&nbsp;</strong>
                      <h4> {rating.Value}</h4>
                    </div>
                  ))}
                  {/* <p>
                  {movieinfo?.Ratings[0].Source}
                  <h4>{movieinfo?.Ratings[0].Value}</h4>
                </p>
                <p>
                  {movieinfo?.Ratings[1].Source}
                  <h4>{movieinfo?.Ratings[1].Value}</h4>
                </p>
                <p>
                  {movieinfo?.Ratings[2].Source}
                  <h4>{movieinfo?.Ratings[2].Value}</h4>
                </p> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Movie Not Found!</h1>
        )}
      </div>
    </div>
  );
}

export default App;
