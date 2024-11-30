export const addShop = async ({
    shopName,
    shopDescription,
    shopLogo,
  }: {
    shopName: string;
    shopDescription: string;
    shopLogo: File;
  }) => {
    const formData = new FormData();
    formData.append('name', shopName);
    formData.append('description', shopDescription);
    formData.append('logo', shopLogo);
  
    const response = await fetch('/api/add_shop', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to add shop');
    }
  
    const data = await response.json();
    return data;  
  };
  