"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import Link from "next/link";
import Layout from "../Layout";
import { useFetchAllShops } from "@/app/hooks/useFetchAllShops";

const ShopDashboard = () => {
  const { shops, loading, error } = useFetchAllShops();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [localShops, setLocalShops] = useState(shops || []); 
  const itemsPerPage = 5;

  useEffect(() => {
    if (shops) {
      setLocalShops(shops); 
        }
  }, [shops]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredShops = localShops.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);

  const handleDelete = () => {
    if (selectedShop !== null) {
      setLocalShops((prevShops) =>
        prevShops.filter((shop) => shop.id !== selectedShop)
      );
      setShowDeletePopup(false);
      setSelectedShop(null);
    }
  };

  const openDeletePopup = (id: number) => {
    setSelectedShop(id);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setSelectedShop(null);
  };

  const handleEdit = (id: number) => {
    console.log(`Edit shop with ID: ${id}`);
  };

  const currentItems = filteredShops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search shop here..."
              className="bg-gray-100 px-4 py-2 rounded-md border-lightGreen border-2 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Link href="/components/AddShop" legacyBehavior>
            <a className="flex items-center space-x-2 text-lightGreen px-4 py-2 rounded-md border-lightGreen border-2 hover:bg-lightGreen/80 hover:text-white">
              <Plus size={20} />
              <span>Add New Shop</span>
            </a>
          </Link>
        </div>

        {loading ? (
          <p>Loading shops...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-customDarkBlue text-white px-4 py-10 text-center rounded-md">
                <h2 className="text-xl font-bold">TOTAL SHOPS</h2>
                <p className="text-4xl font-bold">{localShops.length}</p>
              </div>
              <div className="bg-lightGreen text-white px-4 py-10 text-center rounded-md">
                <h2 className="text-xl font-bold">ACTIVE SHOPS</h2>
                <p className="text-4xl font-bold">
                  {localShops.filter((shop) => shop.status === "Active").length}
                </p>
              </div>
              <div className="bg-customDarkBlue text-white px-4 py-10 text-center rounded-md">
                <h2 className="text-xl font-bold">INACTIVE SHOPS</h2>
                <p className="text-4xl font-bold">
                  {localShops.filter((shop) => shop.status === "Inactive").length}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Shops</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-lightGreen text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Logo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((shop) => (
                      <tr key={shop.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <img
                            src={shop.logo}
                            alt={`${shop.name} Logo`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-4">{shop.name}</td>
                        <td className="px-4 py-4">{shop.description}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 rounded-md text-xs ${
                              shop.status === "Active"
                                ? "bg-lightGreen text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {shop.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex space-x-2">
                            <Link href='/components/EditShop'>
                            <button
                              onClick={() => handleEdit(shop.id)}
                              className="text-blue-600 hover:underline"
                            >
                              <Edit size={18} />
                            </button>
                            </Link>
                            <button
                              onClick={() => openDeletePopup(shop.id)}
                              className="text-red-600 hover:underline"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-600"
                    : "bg-lightGreen text-white"
                }`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-600"
                    : "bg-lightGreen text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}

        {showDeletePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md">
              <p>Are you sure you want to delete this shop?</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button onClick={closeDeletePopup} className="px-4 py-2 bg-gray-200 rounded-md">
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShopDashboard;
