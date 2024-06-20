import React from 'react'
import axios from 'axios';
import { useState ,useEffect } from 'react';
import '../components/Moviesearch.css'
import MovieCard from '../components/Moviecard';
import SearchIcon from '../../public/search.svg';
import { Link } from 'react-router-dom';
import MovieInfo from '../components/MovieInfo';



const Moviesearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imdbId, setImdbId] = useState("")

  const searchMovies = async (title) => {
    setLoading(true);
    setError(null);
    setImdbId("")
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm || title}&apikey=ea988e43`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const currentId = (id)=>{
    setImdbId(id)
  } 
   
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm); 
    }
  }

  return (
    <div className="bg-[#212426] min-h-screen flex flex-col items-center justify-center p-16 md:p-8 sm:p-4">
      <h1 className="relative text-4xl font-bold text-orange-500 my-8">MovieLand</h1>

      <div className="relative w-full max-w-md mb-8">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
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

      {loading ? (
        <div className="loading flex justify-center items-center w-full mt-12">
          <h2 className="text-xl text-[#f9d3b4] font-raleway">Loading...</h2>
        </div>
      ) : error ? (
        <div className="error flex justify-center items-center w-full mt-12">
          <h2 className="text-xl text-red-500 font-raleway">{error}</h2>
        </div>
      ) : movies.length > 0 ? (
        <>
       {imdbId && <MovieInfo imdbId={imdbId}/>}
       
        <div className="container1 flex flex-wrap justify-center items-center w-full mt-12">
          {movies.map((movie) => (
          
              <MovieCard key={movie.imdbID} movie={movie} currentId={currentId} />
           
          ))}
        </div>
        </>
      ) : (
        <div className="empty flex justify-center items-center w-full mt-12">
          <h2 className="text-xl text-[#f9d3b4] font-raleway">No movies found</h2>
        </div>
      )}
      
      <Link
        className="previous bg-white text-black py-4 px-8 rounded-lg transition-colors duration-300 mt-4 hover:bg-black hover:text-white border-2 border-transparent hover:border-white"
        to="/Translator"
      >
        Previous Page
      </Link>
    </div>
  );
};

export default Moviesearch