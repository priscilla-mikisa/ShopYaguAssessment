"use client"
import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/fetchAllProducts';

interface Product {
  stock: number;
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  status: string;
  shop: string;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const deleteProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return { products, loading, error, deleteProduct };
};

export default useProducts;
