"use client"
import React, { useState, ChangeEvent } from 'react';
import Layout from '../Layout';
import addProduct from '@/app/utils/productAddition';

const AddProductPage = () => {
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [stockLevel, setStockLevel] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [shopLocation, setShopLocation] = useState<string>('');
  const [productImage, setProductImage] = useState<File | null>(null);

  const [validationErrors, setValidationErrors] = useState({
    productName: '',
    productPrice: '',
    stockLevel: '',
    productDescription: '',
    shopLocation: '',
    productImage: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductPrice(e.target.value);
  };

  const handleStockLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStockLevel(e.target.value);
  };

  const handleShopLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShopLocation(e.target.value);
  };

  const handleProductDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProductDescription(e.target.value);
  };

  const handleProductImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProductImage(files[0]);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      productName: '',
      productPrice: '',
      stockLevel: '',
      productDescription: '',
      shopLocation: '',
      productImage: '',
    };

    if (!productName.trim()) {
      errors.productName = 'Product name is required.';
      isValid = false;
    }
    if (!productPrice.trim()) {
      errors.productPrice = 'Product price is required.';
      isValid = false;
    }
    if (!stockLevel.trim()) {
      errors.stockLevel = 'Stock level is required.';
      isValid = false;
    }
    if (!productDescription.trim()) {
      errors.productDescription = 'Product description is required.';
      isValid = false;
    }
    if (!shopLocation.trim()) {
      errors.shopLocation = 'Shop location is required.';
      isValid = false;
    }
    if (!productImage) {
      errors.productImage = 'Product image is required.';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSave = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      const productData = {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        shop: shopLocation,
        image: productImage?.name || '',
      };
      const result = await addProduct(productData);
      if (typeof result === 'string') {
        setError(result);
      } else {
        alert('Product saved successfully!');
        resetForm();
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.');
    if (confirm) {
      resetForm();
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setStockLevel('');
    setProductDescription('');
    setShopLocation('');
    setProductImage(null);
    setValidationErrors({
      productName: '',
      productPrice: '',
      stockLevel: '',
      productDescription: '',
      shopLocation: '',
      productImage: '',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-name" className="block font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="product-name"
                  className="rounded-md px-3 py-2 w-full border-[2px] border-customGreen p-6"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={handleProductNameChange}
                />
                {validationErrors.productName && (
                  <p className="text-red-500 text-sm">{validationErrors.productName}</p>
                )}
              </div>
              <div>
                <label htmlFor="product-price" className="block font-bold mb-2">
                  Product Price
                </label>
                <input
                  type="text"
                  id="product-price"
                  className="rounded-md px-3 py-2 w-full border-[2px] border-customGreen p-6"
                  placeholder="Enter product price in USD"
                  value={productPrice}
                  onChange={handleProductPriceChange}
                />
                {validationErrors.productPrice && (
                  <p className="text-red-500 text-sm">{validationErrors.productPrice}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div >
                <label htmlFor="stock-level" className="block font-bold mb-2">
                  Stock Level
                </label>
                <input
                  type="text"
                  id="stock-level"
                  className="rounded-md px-3 py-2 w-full border-[2px] border-customGreen p-6"
                  placeholder="Enter stock level"
                  value={stockLevel}
                  onChange={handleStockLevelChange}
                />
                {validationErrors.stockLevel && (
                  <p className="text-red-500 text-sm">{validationErrors.stockLevel}</p>
                )}
              </div>
              <div>
                <label htmlFor="shop-location" className="block font-bold mb-2">
                  Shop
                </label>
                <input
                  type="text"
                  id="shop-location"
                  className=" rounded-md px-3 py-2 w-full border-[2px] border-customGreen p-6"
                  placeholder="Enter shop name"
                  value={shopLocation}
                  onChange={handleShopLocationChange}
                />
                {validationErrors.shopLocation && (
                  <p className="text-red-500 text-sm">{validationErrors.shopLocation}</p>
                )}
              </div>
            </div>
            <div className="mt-4 border-[2px] border-customGreen p-6">
              <label htmlFor="product-description" className="block font-bold mb-2">
                Product Description
              </label>
              <textarea
                id="product-description"
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Enter product description"
                value={productDescription}
                onChange={handleProductDescriptionChange}
              ></textarea>
              {validationErrors.productDescription && (
                <p className="text-red-500 text-sm">{validationErrors.productDescription}</p>
              )}
            </div>
            <div className="mt-4 border-[2px] border-customGreen p-6">
              <label htmlFor="product-image" className="block font-bold mb-2">
                Product Image
              </label>
              <input
                type="file"
                id="product-image"
                className="border rounded-md px-3 py-2 w-full"
                onChange={handleProductImageChange}
              />
              {validationErrors.productImage && (
                <p className="text-red-500 text-sm">{validationErrors.productImage}</p>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleSave}
                className="bg-customGreen text-white px-4 py-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Product'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-customDarkBlue text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default AddProductPage;