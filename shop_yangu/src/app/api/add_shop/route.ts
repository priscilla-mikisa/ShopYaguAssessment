import express from 'express';
import fetch from 'node-fetch'; 
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.post('/api/Shops', async (req, res) => {
  const product = req.body;

  try {
    const response = await fetch(`${process.env.BASE_URL}/Shops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product: ${response.statusText}`);
    }

    const responseData = await response.json();
    res.status(201).json(responseData);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
