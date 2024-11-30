export const fetchShops = async () => {
    try {
      const response = await fetch('/api/getAllShops');
      if (!response.ok) {
        throw new Error('Failed to fetch Shops');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  