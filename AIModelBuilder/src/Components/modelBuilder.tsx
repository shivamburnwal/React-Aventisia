import React, { useState } from "react";
import { LuNotebookText } from "react-icons/lu";
import { TiCogOutline } from "react-icons/ti";
import { BiSupport } from "react-icons/bi";
import { HiMiniSquares2X2, HiMiniSquare3Stack3D } from "react-icons/hi2";
import { FaBell, FaCalendar, FaChevronDown, FaChevronLeft, FaChevronRight, FaFilter, FaHeart, FaPlus, FaUser } from "react-icons/fa";
import logo from "../Images/logo_light.svg";
import TableComponent from "./table";
import ModelData from "../interfaces";

const modelTypes = ["Extraction", "Classification", "Regression"];
const descriptions = [
  "AI-powered data extraction",
  "Advanced machine learning model",
  "Optimized for high accuracy",
  "Fast and scalable solution",
  "Designed for large datasets",
];
const dummyData: ModelData[] = Array.from({ length: 66 }, (_, i) => ({
  key: i,
  name: `Model ${i + 1}`,
  id: `#${5412400 + i}`,
  type: modelTypes[Math.floor(Math.random() * modelTypes.length)],
  description: descriptions[Math.floor(Math.random() * descriptions.length)],
  createdOn: "14/02/2025",
  lastTrainedOn: "14/02/2025",
  status: Math.random() > 0.5 ? "Active" : "InActive",
}));

const ModelBuilder = () => {
  const [data, setData] = useState(dummyData);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newModel, setNewModel] = useState({ name: "", type: "", llm: "", description: "" });
  const pageSize = 5;
  const totalPages = Math.ceil(data.length / pageSize);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
    setData(
      dummyData.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.id.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  const handleClose = () => {
    setNewModel({ name: "", type: "", llm: "", description: "" });
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("New Model Data:", newModel);
    setNewModel({ name: "", type: "", llm: "", description: "" });
    setIsModalOpen(false);
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    else {
      pages.push(1);

      if (currentPage <= 4) {
        pages.push(2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push("...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    console.log(pages);
    return pages.slice(0, 7);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="text-black flex items-center shadow-md h-16">
        <div className="w-[18%] bg-gray-100 flex justify-center items-center">
          <img src={logo} alt="Logo" className="h-16 w-46" />
        </div>
        <div className="w-[82%] flex items-center justify-between">
          <h1 className="text-xl font-bold ml-3">AI/ML Model Builder</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-400 px-4 py-2 rounded-md w-1/4"
          />
          <div className="flex items-center space-x-4">
            <FaBell className="h-5 w-5 cursor-pointer" />
            <FaHeart className="h-5 w-5 cursor-pointer" />
            <div className="h-5 w-px bg-gray-400" />
            <FaUser className="h-5 w-5 cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="flex flex-col text-sm">
                <span className="font-semibold">Neurotic Spy</span>
                <span className="text-gray-600">neurotic.taildo.com</span>
              </div>
              <FaChevronDown className="h-5 w-15 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-grow">
        <div className="w-[18%] shadow-lg p-6">
          <h2 className="font-bold mb-2">Model Library</h2>
          <ul className="mb-6">
            <li className="secondary-color text-white px-2 py-2 rounded-md mb-2 cursor-pointer flex items-center">
              <HiMiniSquares2X2 className="mr-2" /> Model Library
            </li>
          </ul>
          <h2 className="font-bold mb-2">Extraction Builder</h2>
          <ul className="pl-2 mb-6">
            <li className="mb-2 cursor-pointer flex items-center">
              <HiMiniSquares2X2 className="mr-2" /> Label Data
            </li>
            <li className="mb-2 cursor-pointer flex items-center">
              <HiMiniSquare3Stack3D className="mr-2" /> Model
            </li>
            <li className="mb-2 cursor-pointer flex items-center">
              <LuNotebookText className="mr-2" /> Test
            </li>
          </ul>
          <h2 className="font-bold mb-2">Help</h2>
          <ul className="pl-2 mb-6">
            <li className="mb-2 cursor-pointer flex items-center">
              <TiCogOutline className="mr-2" /> Setting
            </li>
            <li className="mb-2 cursor-pointer flex items-center">
              <BiSupport className="mr-2" /> Support
            </li>
          </ul>
        </div>

        <div className="w-[82%] bg-gray-100 p-5">
          <div className="flex flex-col max-h-[85vh] h-screen shadow-sm bg-white p-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Model Builder</h2>
              <button className="primary-color text-white px-4 py-2 rounded-xl flex items-center" onClick={() => setIsModalOpen(true)}>
                <FaPlus className="h-4 w-4 mr-2" />
                <span>Create New Model</span>
              </button>
            </div>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Search by Name, ID"
                value={searchText}
                onChange={handleSearch}
                className="bg-gray-100 px-4 py-2 rounded w-[90%]"
              />
              <button className="bg-gray-100 px-4 py-2 rounded flex items-center">
                <FaFilter className="h-4 w-4 mr-2" /> Filter
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded flex items-center">
                <FaCalendar className="h-4 w-4 mr-2" /> Date
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <TableComponent data={data} page={currentPage} />
            </div>
            <div className="bg-white bottom-auto w-full">
              <div className="flex justify-between items-center">
                <span>
                  Showing {(currentPage - 1) * pageSize + 1} to {" "}
                  {Math.min(currentPage * pageSize, data.length)} of {data.length} results.
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-6 h-6 mx-3 flex items-center justify-center rounded-full bg-blue-200 text-blue-500 disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  {renderPageNumbers().map((page, index) => (
                    <button key={index} className={`mx-2 w-6 h-6 flex items-center justify-center ${page === currentPage ? "font-bold bg-blue-500 text-white rounded-full" : "text-blue-500"}`} onClick={() => page !== "..." && setCurrentPage(page as number)}>
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-6 h-6 mx-3 flex items-center justify-center rounded-full bg-blue-200 text-blue-500 disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 relative">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Create New Model</h2>
                  <button
                    className="text-lg font-bold text-gray-700"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <button onClick={handleClose}>X</button>
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Type
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Model Name"
                    className="custom-input w-full"
                    value={newModel.name}
                    onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Type
                  </label>
                  <select
                    className="custom-input w-full"
                    value={newModel.type}
                    onChange={(e) => setNewModel({ ...newModel, type: e.target.value })}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Extraction">Extraction</option>
                    <option value="Classification">Classification</option>
                    <option value="Regression">Regression</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LLM
                  </label>
                  <select
                    className="custom-input w-full"
                    value={newModel.llm}
                    onChange={(e) => setNewModel({ ...newModel, llm: e.target.value })}
                  >
                    <option value="" disabled>
                      Neural (recommended)
                    </option>
                    <option value="Bert">Bert</option>
                    <option value="Llama">Llama</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Description
                  </label>
                  <textarea
                    placeholder="Enter Model Description"
                    className="border p-2 w-full mb-2 rounded"
                    value={newModel.description}
                    onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelBuilder;