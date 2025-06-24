import React, { useEffect, useState } from "react";
import { HiEllipsisVertical, HiUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import GifSearch from "./gif-search";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, filter, setFilter } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="G-Cim-Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="font-bold text-md flex gap-3 items-center">
          {/* render categories */}
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className="py-0.5 hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-pink-600 border-b-4 hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          {/* */}
          <button
            onClick={() => setShowCategories(!showCategories)}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <HiEllipsisVertical
              size={32.5}
              className={`py-0.5 hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-pink-600 ${
                showCategories
                  ? "bg-gradient-to-r hover:from-teal-600 hover:via-blue-600"
                  : ""
              } border-b-4 hidden lg:block`}
            />
          </button>

          <div className="bg-[#6056ff] h-9 pt-1.5 px-6 align-middle cursor-progress rounded">
            <button>Upload</button>
          </div>

          <div className="bg-purple-700 h-9 pt-1.5 px-6 align-middle cursor-progress rounded">
            <button>Create</button>
          </div>

          <div className="h-9 justify-evenly bg-gray-700 pt-1.5 px-6 align-middle cursor-progress rounded">
            <button className="mt-1">
              <HiUser />
            </button>
            <Link to="/login"> Log In </Link>
          </div>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 bg-gradient-to-r from-pink-600 to-violet-600  w-full z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => {
                return (
                  <Link
                    onClick={() => setShowCategories(false)}
                    className="transition ease-in-out font-bold"
                    key={category.name}
                    to={`/${category.name_encoded}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <GifSearch filter={filter} setFilter={setFilter} />
    </nav>
  );
};

export default Header;
