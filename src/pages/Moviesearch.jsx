import React from 'react'
import { useState ,useEffect } from 'react';
import '../components/Moviesearch.css'
import MovieCard from '../components/Moviecard';
import SearchIcon from '../../public/search.svg';
import { Link } from 'react-router-dom';

const API_URL =" http://www.omdbapi.com/?i=tt3896198&apikey=ea988e43"

const Moviesearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  return (
    <body className="bg-[212426]">
    <div className="app flex flex-col items-center justify-center p-16 md:p-8 sm:p-4">
    <h1 className='relative text-4xl font-bold text-orange-500 my-8'>MovieLand</h1>

    <div className="relative w-full max-w-md mb-8">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies"
        className="w-full p-4 rounded-lg text-gray-900"
      />
      <img
        src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTerm)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 w-6 h-6 cursor-pointer"
      />
    </div>

    {movies?.length > 0 ? (
      <div className="container1 flex flex-wrap justify-center items-center w-full mt-12">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    ) : (
      <div className="empty flex justify-center items-center w-full mt-12">
        <h2 className='text-xl text-f9d3b4 font-raleway'>No movies found</h2>
      </div>
    )}
    <Link className='previous bg-white text-black py-4 px-8 rounded-lg transition-colors duration-300 mt-4 hover:bg-black hover:text-white border-2 border-transparent hover:border-white"' to="/Tanslator">Previous Page</Link>
  </div>
  </body>
  )
}

export default Moviesearch