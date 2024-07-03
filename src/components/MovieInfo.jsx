import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { Link, useLocation } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const MovieInfo = (props) => {
  const [movieInfo, setMovieInfo] = useState("");
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const imdbId = location.state;
  console.log(imdbId);

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=ea988e43`)
      .then((response) => {
        setMovieInfo(response.data);
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      });
  }, [imdbId]);

  return (
    <div className="bg-[#212426] flex flex-col items-center min-h-screen px-4 md:px-8 lg:px-16">
      <Link
        className="flex h-10 gap-1 previous bg-white text-black py-2 px-4 rounded-lg transition-colors duration-300 mt-4 hover:bg-black hover:text-white border-2 border-transparent hover:border-white"
        to="/Movie"
      >
        <Icon className="h-6 w-6 cursor-pointer" icon="ion:arrow-back" />
        Back
      </Link>

      {loader ? (
        <div className="flex justify-center items-center h-full w-full mt-64">
          <FadeLoader color="#f9d3b4" loading={loader} />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:gap-8 bg-white rounded-lg border-2 border-black p-5 w-full max-w-4xl mt-5 shadow-lg">
          <img className="rounded-lg w-full md:w-1/3 object-cover" src={movieInfo.Poster} alt={movieInfo.Title} />
          <div className="flex-1 mt-5 md:mt-0 md:ml-8">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-2xl">{movieInfo.Title}</h2>
            </div>
            <div className="mt-4 space-y-2 text-sm md:text-base">
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
      )}
    </div>
  );
};

export default MovieInfo;
