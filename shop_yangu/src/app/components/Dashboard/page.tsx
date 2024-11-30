"use client";
import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  ChartOptions,
} from "chart.js";
import Chart from "chart.js/auto";
import Layout from "../Layout";

const dummyData = {
  shops: [
    { id: 1, name: "Mama Gina", logo: "/images/store.avif", description: "All your favorite hardware" },
    { id: 2, name: "Nothern Winds", logo: "/images/clothe.jpg", description: "All your favorite hardware" },
    { id: 3, name: "Next Door", logo: "/images/shoplogo.jpg", description: "All your favorite hardware" },
    { id: 4, name: "Blue Mountain", logo: "/images/clothe.jpg", description: "All your favorite hardware" },
    { id: 5, name: "Western Union", logo: "/images/westernUnion.jpg", description: "All your favorite hardware" },
    { id: 6, name: "Set Out", logo: "/images/setout.jpg", description: "All your favorite hardware" },
    { id: 7, name: "Open", logo: "/images/setout.jpg", description: "All your favorite hardware" },
    { id: 8, name: "Out Door", logo: "/images/setout.jpg", description: "All your favorite hardware" },
    { id: 9, name: "Set", logo: "/images/shoplogo.jpg", description: "All your favorite hardware" },
    { id: 10, name: "OTT", logo: "/images/store.avif", description: "All your favorite hardware" },
  ],
  products: [
    { id: 1, image: "/images/bananas.jpg", name: "Banana", description: "Fresh bananas", price: 800, shop: "Blue Mountain" },
    { id: 2, image: "/images/shirts.webp", name: "Gen-z Wear", description: "Look stunningly adorable this festive season.", price: 1000, shop: "Blue Mountain" },
    { id: 3, image: "/images/shirts.webp", name: "Gen-z Wear", description: "Look stunningly adorable this festive season.", price: 1000, shop: "Next Door" },
    { id: 4, image: "/images/shirts.webp", name: "Gen-z Wear", description: "Look stunningly adorable this festive season.", price: 1000, shop: "Blue Mountain" },
    { id: 5, image: "/images/shirts.webp", name: "Gen-z Wear", description: "Look stunningly adorable this festive season.", price: 1000, shop: "Next Door" },
    { id: 6, image: "/images/toys.png", name: "Toys", description: "Fun and Play", price: 10, shop: "Mama Gina" },
    { id: 7, image: "/images/toys.png", name: "Toys", description: "Fun and Play", price: 10, shop: "Mama Gina" },
    { id: 8, image: "/images/shirts.webp", name: "Gen-z Wear", description: "Look stunningly adorable this festive season.", price: 100, shop: "Next Door" },
    { id: 9, image: "/images/shirts.webp", name: "Gen-z Wear", description: "Look stunningly adorable this festive season.", price: 700, shop: "Next Door" },
    { id: 10, image: "/images/toys.png", name: "Toys", description: "Fun and Play", price: 10, shop: "Next Door" },
  ]
};

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Title);

const Dashboard = () => {
  const products = dummyData.products;
  const shops = dummyData.shops;

  useEffect(() => {
    console.log('Products:', products);
    console.log('Shops:', shops);
  }, [products, shops]);

  const getTotalProductsByShop = () => {
    const productCounts = shops.map(shop => {
      const totalProducts = products.filter(product => product.shop === shop.name).length;
      return { shopName: shop.name, totalProducts };
    });

    return productCounts;
  };

  const productCountData = getTotalProductsByShop();

  const sortedProductCountData = [...productCountData].sort((a, b) => b.totalProducts - a.totalProducts);
  const topProductCountShops = sortedProductCountData.slice(0, 5);

  const barData = {
    labels: topProductCountShops.map(shop => shop.shopName),
    datasets: [
      {
        label: "Total Products by Shop",
        data: topProductCountShops.map(shop => shop.totalProducts),
        backgroundColor: "#052049",
      },
    ],
  };

  const getProductData = () => {
    const outOfStock = products.filter(product => product.price === 0).length;
    const inStock = products.filter(product => product.price > 5).length;
    const lowStock = products.filter(product => product.price >= 1 && product.price <= 5).length;
    return {
      outOfStock,
      inStock,
      lowStock,
      total: products.length,
    };
  };

  const getShopData = () => {
    const activeShops = shops.filter(shop => products.some(product => product.shop === shop.name)).length;
    const inactiveShops = shops.filter(shop => !products.some(product => product.shop === shop.name)).length;
    return {
      activeShops,
      inactiveShops,
      total: shops.length,
    };
  };

  const productData = {
    datasets: [
      {
        data: [getProductData().outOfStock, getProductData().inStock, getProductData().lowStock],
        backgroundColor: ["#8BC34A", "#052049", "#E1B31C"],
        borderWidth: 2,
      },
    ],
    labels: ["Out-of-stock", "In-stock", "Low-stock"],
  };

  const shopData = {
    datasets: [
      {
        data: [getShopData().activeShops, getShopData().inactiveShops],
        backgroundColor: ["#8BC34A", "#052049"],
        borderWidth: 2,
      },
    ],
    labels: ["Active", "Inactive"],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        font: {
          size: 18,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Shops',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Total Products',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Layout>
      <div className="pl-8 bg-gray-100 h-screen overflow-auto ml-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow" style={{ maxWidth: '500px', height: '400px' }}>
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <Doughnut data={productData} options={{ responsive: true, maintainAspectRatio: true }} />
            <div className="flex justify-between w-full mt-4 text-sm">
              <span>Out-of-stock: {getProductData().outOfStock}</span>
              <span>In-stock: {getProductData().inStock}</span>
              <span>Low-stock: {getProductData().lowStock}</span>
            </div>
            <div className="mt-2 text-lg">
              Total Products: {getProductData().total}
            </div>
          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow" style={{ maxWidth: '500px', height: '400px' }}>
            <h3 className="text-xl font-semibold mb-4">Shops</h3>
            <Doughnut data={shopData} options={{ responsive: true, maintainAspectRatio: true }} />
            <div className="flex justify-between w-full mt-4 text-sm">
              <span>Active Shops: {getShopData().activeShops}</span>
              <span>Inactive Shops: {getShopData().inactiveShops}</span>
            </div>
            <div className="mt-2 text-lg">
              Total Shops: {getShopData().total}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-10 bg-white p-6 rounded-lg shadow" style={{ maxWidth: '1000px', height: '400px' }}>
          <h3 className="text-xl font-semibold mb-4">Top 5 Shops by Total Products</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
