import { useState } from "react";

const MovieList = () => {
  const [movieData, setMovieData] = useState(null);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("movie");

  const fetchMovies = async () => {
    try {
      setMovieData("loading");
      const response = await fetch(
        `http://www.omdbapi.com/?t=${title}&type=${filter}&apikey=469852b1`
      );
      const data = await response.json();
      const movieDataArray = Object.keys(data)
        .filter((key) => typeof data[key] !== "object" && key !== "Response")
        .map((key) => ({ prop: key, value: data[key] }));

      setMovieData(movieDataArray);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchStatus = !movieData
    ? "empty"
    : movieData === "loading"
    ? "loading"
    : "success";

  return (
    <div className="container mx-0 mt-8 md:mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      <form className="flex flex-wrap items-center   mb-6">
        <input
          className="flex-grow px-4 mb-2 py-2 mr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <select
          className="px-4 py-2 mb-2 mr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button
          className="px-6 py-2 mb-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            fetchMovies();
          }}
        >
          Search
        </button>
      </form>

      {fetchStatus === "empty" && (
        <p className="font-semibold text-gray-700">
          Please enter a title and select a filter to search for a movie.
        </p>
      )}

      {fetchStatus === "loading" && <p>Loading...</p>}

      {fetchStatus === "success" && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <tbody>
              {movieData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 border-b border-gray-200 font-semibold text-gray-700">
                    {row.prop}
                  </td>
                  <td className="py-3 px-4 break-words whitespace-normal border-b border-gray-200 text-gray-600">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovieList;
