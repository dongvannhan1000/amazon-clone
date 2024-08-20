import { useOutletContext } from 'react-router-dom';
import Product from '../components/Product';
import '../styles/Home.css'

function Home() {
  const { products, addToCart } = useOutletContext();

  return (
    <div className="main">
      <div className="products-grid">
        {products.map((product) => (
          <Product 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  )
}

export default Home;