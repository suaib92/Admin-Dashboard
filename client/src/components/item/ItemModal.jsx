import React from 'react';

const ItemModal = ({ isEditing, formData, onChange, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
          {isEditing ? 'Edit Item' : 'Add New Item'}
        </h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Item Name"
            required
            className="block mb-3 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            placeholder="Price"
            required
            className="block mb-3 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={onChange}
            placeholder="Quantity"
            required
            className="block mb-3 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={onChange}
            placeholder="Category"
            required
            className="block mb-3 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEditing ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
