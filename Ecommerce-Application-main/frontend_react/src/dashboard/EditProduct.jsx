import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getRequestedProduct, editProduct } from "../api";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [stock, setStock] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const { productId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await editProduct({
        productId,
        title,
        description,
        price,
        discountPercentage,
        stock,
        brand,
        category
      });
      if (data) {
        alert('Successfully Updated!');
        navigate('/dashboard/products');
      }
    } catch (e) {
      alert('Something went wrong...');
    }
  };

  const getCurrentProductDetails = async () => {
    const { data } = await getRequestedProduct(productId);
    const product = JSON.parse(data);

    setTitle(product?.title);
    setDescription(product?.description);
    setPrice(product?.price);
    setDiscountPercentage(product?.discountPercentage);
    setStock(product?.stock);
    setBrand(product?.brand);
    setCategory(product?.category);
  }

  useEffect(() => {
    getCurrentProductDetails();
  },[productId])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label htmlFor="price" className="block mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="discountPercentage" className="block mb-1">
                Discount Percentage
              </label>
              <input
                type="number"
                id="discountPercentage"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="stock" className="block mb-1">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block mb-1">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="beauty">Beauty</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="home">Home</option>
                <option value="furnitures">Furnitures</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
                <option value="more">More</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-md"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
};

export default EditProduct;
