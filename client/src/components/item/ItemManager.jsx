import React, { useState, useEffect } from 'react';
import { fetchItems, addItem, editItem, deleteItem } from './ItemService';
import ItemModal from './ItemModal';

const ItemManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
  });
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems(token);
        setItems(fetchedItems);
        setFilteredItems(fetchedItems);
      } catch (err) {
        setError('Error fetching items');
        setShowError(true);
        setTimeout(() => setShowError(false), 2000); // Hide error after 2 seconds
      }
    };
    getItems();
  }, [token]);

  useEffect(() => {
    const searchItems = () => {
      if (searchQuery.trim() === '') {
        setFilteredItems(items);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = items.filter(
          (item) =>
            item.name.toLowerCase().includes(lowercasedQuery) ||
            item.category.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredItems(filtered);
      }
    };
    searchItems();
  }, [searchQuery, items]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const addedItem = await addItem(formData, token);
      setMessage('Item added successfully');
      setShowMessage(true);
      setItems((prevItems) => [...prevItems, addedItem]);
      setFilteredItems((prevItems) => [...prevItems, addedItem]);
      setFormData({ name: '', price: '', quantity: '', category: '' });
      setIsModalOpen(false);
      setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
    } catch (err) {
      setMessage('Error adding item');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = await editItem(itemToEdit._id, formData, token);
      setMessage('Item updated successfully');
      setShowMessage(true);
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === itemToEdit._id ? updatedItem : item))
      );
      setFilteredItems((prevItems) =>
        prevItems.map((item) => (item._id === itemToEdit._id ? updatedItem : item))
      );
      setFormData({ name: '', price: '', quantity: '', category: '' });
      setIsEditing(false);
      setIsModalOpen(false);
      setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
    } catch (err) {
      setMessage('Error updating item');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
    }
  };

  const handleDeleteItem = async (itemId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;
    try {
      await deleteItem(itemId, token);
      setMessage('Item deleted successfully');
      setShowMessage(true);
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      setFilteredItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
    } catch (err) {
      setMessage('Error deleting item');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
    }
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setItemToEdit(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-center text-blue-600">Item Manager</h1>

      {showMessage && <p className="text-green-500 mb-4 fixed top-16 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded shadow-lg">{message}</p>}
      {showError && <p className="text-red-500 mb-4 fixed top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded shadow-lg">{error}</p>}

      <div className="mb-6 flex items-center justify-between space-x-4 flex-wrap">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or category..."
          className="border-2 border-gray-300 p-3 rounded-md w-full sm:w-3/4 lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <button
          onClick={() => {
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        >
          Add Item
        </button>
      </div>

      {isModalOpen && (
        <ItemModal
          isEditing={isEditing}
          formData={formData}
          onChange={handleChange}
          onSubmit={isEditing ? handleEditItem : handleAddItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg shadow-lg overflow-hidden bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="border-b p-4 text-left">Name</th>
              <th className="border-b p-4 text-left">Price</th>
              <th className="border-b p-4 text-left">Quantity</th>
              <th className="border-b p-4 text-left">Category</th>
              <th className="border-b p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="border-b p-4">{item.name}</td>
                  <td className="border-b p-4">₹{item.price}</td>
                  <td className="border-b p-4">{item.quantity}</td>
                  <td className="border-b p-4">{item.category}</td>
                  <td className="border-b p-4 text-center">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md mr-2 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemManager;
