import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; 

const MovieInfo = (props) => {
  const [movieInfo, setMovieInfo] = useState("");
  const [movieClose, setMovieClose] = useState(false);
  const { imdbId } = props;

  useEffect(() => {
    setMovieClose(false);
    axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=ea988e43`).then((response) => setMovieInfo(response.data));
  }, [imdbId]);

  const handleClose = () => {
    setMovieClose(true);
  };

  return (
    <>
      {!movieClose ? (
        <div className="flex flex-col md:flex-row md:gap-8 bg-white rounded-lg p-5 w-full md:w-4/5 max-w-4xl mx-auto">
          <div className="flex flex-col items-end md:hidden">
            <Icon className="h-6 w-6 cursor-pointer mb-2" icon="carbon:close-filled" onClick={handleClose} />
          </div>

          <img className="rounded-lg w-full md:w-1/3" src={movieInfo.Poster} alt={movieInfo.Title} />

           <div className="flex-1 mt-5 md:mt-0">

            <div className="hidden md:flex justify-between items-center">
              <h2 className="font-bold text-xl">{movieInfo.Title}</h2>
              <Icon className="h-6 w-6 cursor-pointer" icon="carbon:close-filled" onClick={handleClose} />
            </div>

            <div className="mt-4 space-y-2">
              <p><span className="font-bold">Cast:</span> {movieInfo.Actors}</p>
              <p><span className="font-bold">Genre:</span> {movieInfo.Genre}</p>
              <p><span className="font-bold">Language:</span> {movieInfo.Language}</p>
              <p><span className="font-bold">Director:</span> {movieInfo.Director}</p>
              <p><span className="font-bold">Writer:</span> {movieInfo.Writer}</p>
              <p><span className="font-bold">Released:</span> {movieInfo.Released}</p>
              <p><span className="font-bold">Runtime:</span> {movieInfo.Runtime}</p>
              <p><span className="font-bold">Country:</span> {movieInfo.Country}</p>
              <p><span className="font-bold">IMDb Rating:</span> {movieInfo.imdbRating}</p>
              <p><span className="font-bold">Rated:</span> {movieInfo.Rated}</p>
              <p><span className="font-bold">Box Office:</span> {movieInfo.BoxOffice}</p>
              <p><span className="font-bold">Awards:</span> {movieInfo.Awards}</p>
              <p><span className="font-bold">Plot:</span> {movieInfo.Plot}</p>
            </div>

          </div>

        </div>
      ) : null}
    </>
  );
};

export default MovieInfo;
