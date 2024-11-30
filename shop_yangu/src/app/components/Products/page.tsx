"use client"
import React, { useState } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "../Layout";
import Link from "next/link";
import useProducts from "@/app/hooks/useFetchAllProducts";
import ConfirmationModal from "../ConfirmModal";

const ProductsPage: React.FC = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("price-desc");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;

  const filteredProducts = products
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shop.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        case "shop-asc":
          return a.shop.localeCompare(b.shop);
        default:
          return 0;
      }
    });

  const currentPageProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleDelete = (productId: number) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      deleteProduct(productToDelete); 
      setIsModalOpen(false); 
      setProductToDelete(null); 
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (field: string) => {
    setSortBy(field);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by Shop/Product Name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-gray-100 px-4 py-2 rounded-md border-lightGreen border-2 w-64"
            />
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-100 px-4 py-2 rounded-md border-lightGreen border-2"
            >
              <option value="price-desc">Price (Highest to Lowest)</option>
              <option value="price-asc">Price (Lowest to Highest)</option>
              <option value="shop-asc">Shop (Alphabetical)</option>
            </select>
          </div>
          <Link href="/components/AddProduct">
            <button className="flex items-center space-x-2 border-lightGreen border-[2px] text-lightGreen px-4 py-2 rounded-md hover:bg-lightGreen/80 hover:text-white">
              <FaPlusCircle />
              <span>Add Product</span>
            </button>
          </Link>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-lightGreen">
                <th className="border border-gray-300 px-4 py-2 text-left text-white">Image</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-white">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-white">Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-white">Shop</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-white">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-center text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.shop}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Link href={`/components/EditProduct`}>
                        <button className="text-blue-600 hover:underline">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-lightGreen text-white hover:bg-lightGreen/80"
            }`}
          >
            Previous
          </button>
          <p className="text-gray-700">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-lightGreen text-white hover:bg-lightGreen/80"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Layout>
  );
};

export default ProductsPage;
