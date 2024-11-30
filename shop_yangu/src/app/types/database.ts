export interface Shop {
    id: number;
    name: string;
    logo: string;
    description: string;
    status: 'Active' | 'Inactive';
  }
  
  export interface Product {
    shop: string;
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    status: 'In-Stock' | 'Low Stock' | 'Out of Stock';
  }
  
  export interface Database {
    shops: Shop[];
    products: Product[];
  }