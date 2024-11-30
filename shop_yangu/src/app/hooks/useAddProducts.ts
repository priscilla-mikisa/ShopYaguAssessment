import { useState } from 'react';

const useAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProduct = async (productData: {
    productName: string;
    productPrice: string;
    stockLevel: string;
    productDescription: string;
    shopLocation: string;
    productImage: File | null;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('productPrice', productData.productPrice);
      formData.append('stockLevel', productData.stockLevel);
      formData.append('productDescription', productData.productDescription);
      formData.append('shopLocation', productData.shopLocation);
      
      if (productData.productImage) {
        formData.append('productImage', productData.productImage);
      }

      const response = await fetch('/api/add_products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error saving the product.');
      }

      return await response.json(); 
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { addProduct, isLoading, error };
};

export default useAddProduct;
