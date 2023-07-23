import React, { useState } from 'react';
import { addShoppingItem } from '../api';
import FileBase64 from 'react-file-base64';

const CreateShoppingItems = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleFileUpload = (file) => {         // On change setting the file on state and converting the file using base-64 library to converting and to a binary string
    if(file) {
      setThumbnail(file.base64);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && description && price && discountPercentage && stock && brand && category && thumbnail) {
      const { data } = await addShoppingItem({ title, description, price, discountPercentage, stock, brand, category, thumbnail });

      if (data) {
        alert('Successfully added Item!');
        window.location.reload();
      }

      setTitle('');
      setDescription('');
      setPrice('');
      setDiscountPercentage('');
      setStock('');
      setBrand('');
      setCategory('');
      setThumbnail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 mx-auto w-full md:w-1/2">
      <h2 className="text-2xl mb-6 font-bold text-gray-800">Add a Product</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Product Title" required />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24" placeholder="Product Description" required />
      </div>
      <div className="mb-4 flex flex-col lg:flex-row justify-center lg:justify-between">
        <div className='flex flex-col'>
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
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
        <div className="flex flex-col">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Product Price" required />
        </div>
      </div>
      <div className="mb-4 flex flex-col lg:flex-row justify-center lg:justify-between">
        <div className="flex flex-col">
          <label htmlFor="discountPercentage" className="block text-gray-700 font-bold mb-2">Discount Percentage</label>
          <input type="number" id="discountPercentage" value={discountPercentage} onChange={(e) => setDiscountPercentage(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Discount Percentage" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">Stock</label>
          <input type="number" id="stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" pattern="\d+" placeholder="Available on Stock" min="0" required />
        </div>
      </div>
      <div className="mb-4 flex flex-col lg:flex-row justify-center lg:justify-between">
        <div className="flex flex-col">
          <label htmlFor="brand" className="block text-gray-700 font-bold mb-2">Brand</label>
          <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Brand Name" required />
        </div>
      </div>
      <div className="mb-4 flex flex-col lg:flex-row justify-center lg:justify-between">
        <div className="flex flex-col">
          <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">Product Image</label>
          <div className="block w-full text-sm text-blue-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none">
            <FileBase64 
              multiple={false} 
              onDone={handleFileUpload} 
            />
          </div>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
        Create Item
      </button>
    </form>
  )
}

export default CreateShoppingItems;