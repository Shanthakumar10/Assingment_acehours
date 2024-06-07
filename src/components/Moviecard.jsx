import React from 'react';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className="movie movie-hover-content relative bg-[#343739] rounded-lg overflow-hidden  m-6 w-80 h-96" key={imdbID}>
      <div  className='absolute inset-0 p-4 opacity-0 text-f9d3b4 transition-opacity duration-300'>
        <p>{Year}</p>
      </div>

      <div className='absolute inset-0'>
        <img className='w-full h-full object-cover' src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} 
          />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#343739] transition-opacity duration-300">
        <span className='block uppercase tracking-widest text-gray-300 font-raleway'>{Type}</span>
        <h3 className='mt-2 text-f9d3b4'>{Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;