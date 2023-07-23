import React from 'react';

const ProductCard = ({ product, category, addToCart }) => {
  return (
    <div className="border rounded p-4 bg-white shadow-md">
      <a href={`/${category}/${product._id?.$oid}`}>
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="w-full h-48 object-cover mb-4"
        />
      </a>
      <h3 className="text-lg font-semibold mb-2 truncate w-full">{product?.title}</h3>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">${product?.price}</span>
        <button onClick={(e) => {e.stopPropagation(); addToCart(product)}} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

