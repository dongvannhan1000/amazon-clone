import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Product from '../components/Product';
import '../styles/Home.css'

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (productToAdd, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity }];
    });
  };

  return (
    <>
      <Header cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}/>
      <div className="main">
        <div className="products-grid">
          {products.map((product) => (
            <Product 
              key={product.id} 
              product={product} 
              addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
    
  )
}

export default Home;