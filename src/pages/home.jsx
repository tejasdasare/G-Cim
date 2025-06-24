import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import FilterGif from "../components/filter-gif";

function Home() {
  const { gf, gifs, setGifs, filter } = GifState();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  const fetchTrendingGIFs = async (loadMore = false) => {
    setLoading(true);
    try {
      const { data } = await gf.trending({
        limit,
        offset: loadMore ? offset : 0,
        type: filter,
        rating: "g",
      });
      setGifs((prevGifs) => (loadMore ? [...prevGifs, ...data] : data));
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
    fetchTrendingGIFs();
  }, [filter]);

  const handleLoadMore = () => {
    fetchTrendingGIFs(true);
  };

  return (
    <div className="">
      <img
        src="https://media.giphy.com/headers/2022-06-01-21-1654089664/PRIDE_BANNER_HP.gif"
        alt="banner"
        className="mt-2 rounded w-full"
      />
      <div className="justify-between">
        <FilterGif showTrending />

        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {gifs.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={`px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed`}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default Home;
