import PageBreadcrumb from "../components/PageBreadcrumb";
import { HiHome } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { TreeData } from "../components/TreeData";

import Pagination from "../components/Pagination";

import "../components/Trees.css";
import { Link } from "react-router-dom";

const Sponsor = () => {
  const aLinkValues = [{ linkTo: "/", linkIcon: HiHome, linkText: "Home" }];
  const daLinkValues = { linkText: "Trees" };
  const [tree, setTree] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  const [err, setErr] = useState("");
  const lasttree = currentPage * postPerPage;
  const firsttree = lasttree - postPerPage + 1;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const getTrees = async () => {
      try {
        const data = await TreeData();
        setTree(data);
      } catch (error) {
        setErr("Failed to load tree Data");
      }
    };

    getTrees();
  }, []);

  const indexofLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexofLastPost - postPerPage;
  const currentPosts = tree.slice(indexofFirstPost, indexofLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {" "}
      <PageBreadcrumb
        activeLinks={aLinkValues}
        deActiveLink={daLinkValues}
      />{" "}
      <p>{err}</p> <div className=" backdrop-search"></div>{" "}
      <div className="py-10 h-20 bg-gray-100 px-2">
        {" "}
        <div className="max-w-auto mx-auto rounded-lg overflow-hidden md:max-w-xl md:max-h-m sm:max-w-xs">
          {" "}
          <div className="md:flex">
            {" "}
            <div className="w-full p-3 ">
              {" "}
              <div className="relative md:max-h-m">
                {" "}
                <i className="absolute fa fa-search text-gray-100 top-5 left-4"></i>{" "}
                <input
                  type="text"
                  className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                  name=""
                ></input>{" "}
                <span className="absolute top-4 right-5 border-l pl-4">
                  {" "}
                  <IoIosSearch className="iconsearch" />{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Dropdown Menu */}
      <div className="h-auto relative dropdown">
        <div
          id="dropdown-button"
          onClick={toggleDropdown}
          className="select-none border h-auto absolute top-10 right-40 w-40 border-gray-400 rounded-lg px-5 py-2 cursor-pointer flex justify-between shadow-sm"
        >
          Options
          <IoIosArrowDown />
        </div>
        <div
          id="dropdown-menu"
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } absolute top-20 right-40 w-400 border border-gray-300 bg-white shadow-md rounded-md mt-2 transition-all duration-300`}
        >
          <div className="py-4 px-4 cursor-pointer hover:bg-gray-100">
            popularity
          </div>
          <div className="py-4 px-4 cursor-pointer hover:bg-gray-100">
            Latest
          </div>
          <div className="py-4 px-4 cursor-pointer hover:bg-gray-100">
            Price:Low-High
          </div>
          <div className="py-4 px-4 cursor-pointer hover:bg-gray-100">
            Price:High-Low
          </div>
        </div>
      </div>
      {/* Tree Item Cards */}
      <div className="flex justify-center flex-wrap gap-10 pt-40 pb-40 ml-20 mr-20">
        {currentPosts.map((item, index) => (
          <div key={index} className="flex pr items-center">
            <div className="w-60 p-10 h-65 bg-white rounded-2xl shadow hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
              <img
                className="w-40 h-40 object-cover rounded-t-md"
                src={item.image}
                alt={item.name}
              />
              <div className="mt-2">
                <h2 className="text-2xl font-bold text-gray-700">
                  {item.name}
                </h2>
                <button className="block text-xl font-semibold text-gray-700 cursor-auto">{`€${parseFloat(
                  item.price.$numberDecimal
                )}`}</button>

                <div className="mt-2 mb-1 flex justify-between ">
                  <Link
                    to={`/trees/${item._id}`}
                    className=" Sponsorbutton text-lg block font-semibold py-2 px-4 hover:text-white hover:bg-lime-800 rounded-lg shadow hover:shadow-md transition duration-300"
                  >
                    view more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        postPerPage={postPerPage}
        currentPage={currentPage}
        totalpost={tree.length}
        paginate={paginate}
        firsttree={firsttree}
        lasttree={lasttree}
      />
    </div>
  );
};
export default Sponsor;
