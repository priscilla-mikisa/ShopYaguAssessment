"use client";
import React, { useState } from 'react';
import Layout from '../Layout';
import { addShop } from '@/app/utils/addShop';

const AddShopPage = () => {
  const [shopName, setShopName] = useState<string>('');
  const [shopDescription, setShopDescription] = useState<string>('');
  const [shopLogo, setShopLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);  

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value);
  };

  const handleShopDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShopDescription(e.target.value);
  };

  const handleShopLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setShopLogo(file);
  };

  const handleSave = async () => {
    if (!shopName.trim()) {
      alert('Please enter a shop name.');
      return;
    }

    if (!shopDescription.trim()) {
      alert('Please enter a shop description.');
      return;
    }

    if (!shopLogo) {
      alert('Please choose a shop logo.');
      return;
    }

    try {
      setLoading(true);
      const newShop = await addShop({ shopName, shopDescription, shopLogo });

      if (newShop) {
        alert('Shop saved successfully!');
        setShopName('');
        setShopDescription('');
        setShopLogo(null);
      }
    } catch (err) {
      setError('Failed to save shop. Please try again.');
      console.error('Error saving shop:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      shopName.trim() ||
      shopDescription.trim() ||
      (shopLogo && shopLogo.name)
    ) {
      const confirm = window.confirm(
        'Are you sure you want to cancel? Any unsaved changes will be lost.'
      );
      if (!confirm) return;
    }

    setShopName('');
    setShopDescription('');
    setShopLogo(null);

    console.log('Canceling shop creation');
    alert('Shop creation cancelled.');
  };

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Add a new Shop</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="shop-name" className="block font-bold mb-2">
                Shop Name
              </label>
              <input
                type="text"
                id="shop-name"
                className="rounded-md px-3 py-2 w-full border-[2px] border-customGreen p-6"
                placeholder="Enter shop name"
                value={shopName}
                onChange={handleShopNameChange}
              />
            </div>
            <div className="mb-4 border-[2px] border-customGreen p-6">
              <label htmlFor="shop-description" className="block font-bold mb-2">
                Shop Description
              </label>
              <textarea
                id="shop-description"
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Enter the shop description"
                value={shopDescription}
                onChange={handleShopDescriptionChange}
              ></textarea>
            </div>
            <div className="mb-4 border-[2px] border-customGreen p-6">
              <label htmlFor="shop-logo" className="block font-bold mb-2">
                Shop Logo
              </label>
              <input
                type="file"
                id="shop-logo"
                className="border rounded-md px-3 py-2 w-full"
                onChange={handleShopLogoChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-customGreen text-white font-bold py-2 px-4 rounded-md"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="bg-customDarkBlue text-white font-bold py-2 px-4 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default AddShopPage;
