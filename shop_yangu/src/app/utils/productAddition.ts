const url = '/api/add_products';

export const addProduct = async ({
  name,
  description,
  price,
  shop,
  image,
}: {
  name: string;
  description: string;
  price: number;
  shop: string;
  image: string;
}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, shop, image }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.error || 'Failed to add product');
    }

    return response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    return  (error as Error).message;
  }
};

export default addProduct;
