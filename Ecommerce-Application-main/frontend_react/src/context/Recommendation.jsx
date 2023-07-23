import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getAllShoppingItems } from '../api';

const Recommendation = ({ categoryId, productId, addToCart }) => {
  const [products, setProducts] = useState();

  const fetchAllShoppingItems = async () => {
    const { data } = await getAllShoppingItems(categoryId);
    if (data) {
       const allProducts = JSON.parse(data);
       const filteredProducts = allProducts.filter(product => product?._id?.$oid !== productId);
       setProducts(filteredProducts);
    }
  }

  useEffect(() => {
    fetchAllShoppingItems();
  },[])

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Recommended Products</h1>
        {products?.length === 0 && <p>No recommendation found..</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id?.$oid} product={product} category={categoryId} addToCart={(product) => addToCart(product)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recommendation;