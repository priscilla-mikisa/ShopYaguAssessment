## Setup Instructions
To run the app locally, follow the steps below:

Clone the Repository: Clone the repository to your local machine using the following command:

git clone <repository_url>
cd ShopYaguAssessment
Install Dependencies: Ensure you have Node.js installed. Run the following command to install the necessary dependencies:

# npm install
Set Up Environment Variables: Create a .env file in the root of the project and add the following variables:

BASE_URL=http://localhost:3001
Run the App:

Start the JSON Server (serving product and shop data): Open one terminal window and run:

node server
This will start the JSON server on port 3001.

Start the Next.js Application (frontend app): Open another terminal window and run:

npm run dev
Both commands should be run at the same time, with each running in a separate terminal window. This will allow both the server and the frontend to run concurrently.

Now you can visit the app in your browser at http://localhost:3000.

Description of the Platform and Its Features
ShopYaguAssessment is an e-commerce platform designed to manage products and shops. It provides the following features:

Add New Products: Admins can add new products to the platform by submitting product details like name, price, stock level, description, and an image.

Add New Shops: Admins can add new shops by submitting details such as the shop name and location.

View Products: Users can view a list of products available in the system.

View Shops: Users can view the shops available in the system.

Key Features:
API Endpoints:

POST /api/Products: Adds new products to the system.
POST /api/Shops: Adds new shops to the system.
GET /api/Products: Retrieves a list of all products.
GET /api/Shops: Retrieves a list of all shops.
Frontend:

Simple forms to add new products and shops.
Displays a list of all products and shops available in the system.
Instructions for Testing the Admin Panel and Its Features
Admin Panel Features
Add Product:

Visit the Add Product page to add a new product.
The form requires the following fields: Product Name, Product Price, Stock Level, Product Description, Shop Location, and Product Image.
Once the form is filled out, click the "Add Product" button. The product will be added to the platform and will be visible in the product list.
Add Shop:

Visit the Add Shop page to add a new shop.
Fill in the necessary fields and click the "Add Shop" button. The shop will be added to the platform.
View Products:

After adding products, you can view them by navigating to the Product List section of the app.
View Shops:

After adding shops, you can view them by navigating to the Shop List section.
To test these features:

Add a Shop:

Visit the "Add Shop" page, fill out the form, and submit it. The shop will be added, and you can verify it by navigating to the shop list.
Add a Product:

Visit the "Add Product" page, fill out the product details, and submit. The product will be added, and you can verify it by navigating to the product list.
View Product and Shop Data:

The list of products and shops will be available on the respective pages. You can verify that the added products and shops appear there.
Files Overview
1. src/app/api/add_products/route.ts
Handles the POST request to add a new product to the platform.

2. src/app/api/add_shop/route.ts
Handles the POST request to add a new shop to the platform.

3. src/app/api/getAllProducts/route.ts
Handles the GET request to retrieve all products from the platform.

4. src/app/api/getAllShops/route.ts
Handles the GET request to retrieve all shops from the platform.

5. src/app/components/AddProduct/page.tsx
Frontend page that allows admins to add new products to the platform.

## Troubleshooting
Error: EADDRINUSE (Port Already in Use): If you encounter this error while trying to run the app, it means the port is already being used by another process. To resolve this, either stop the other process using that port or change the port number in your code (e.g., 3002).
