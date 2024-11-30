"use client"
import { useEffect, useState } from "react";
import { fetchShops } from "../utils/fetchAllShops";
import { fetchProducts } from "../utils/fetchAllProducts";

type Shop = {
  products?: string;
  id: number;
  name: string;
  logo: string;
  description: string;
  status: string; 
};

export const useFetchAllShops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [shopsData, productsData] = await Promise.all([
          fetchShops(),
          fetchProducts(),
        ]);

        const updatedShops = shopsData.map((shop: Shop) => {
          const hasProducts = productsData.some(
            (product: { shop: string }) => 
              product.shop.trim().toLowerCase() === shop.name.trim().toLowerCase()
          );
          return {
            ...shop,
            status: hasProducts ? "Active" : "Inactive",
          };
        });

        setShops(updatedShops);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch shops.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { shops, loading, error };
};



