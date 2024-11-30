export const fetchProducts = async () => {
    try {
      const response = await fetch('/api/getAllProducts');
      if (!response.ok) {
        throw new Error('Failed to fetch Products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  