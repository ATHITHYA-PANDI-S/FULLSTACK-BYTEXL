import { useState, useEffect } from 'react';
import './App.css';

function Product({ productName, price }) {
  const [productPrice, setProductPrice] = useState(price);

  useEffect(() => {
    console.log("Shopping Cart System Loaded");
  }, []);

  return (
    <div>
      <h2>Product Details</h2>
      <p>Product Name: {productName}</p>
      <p>Price: ₹{productPrice}</p>

      <button onClick={() => setProductPrice(productPrice - 200)}>
        Apply ₹200 Discount
      </button>
    </div>
  );
}

function App() {
  return (
    <Product productName="Laptop" price={50000} />
  );
}

export default App;