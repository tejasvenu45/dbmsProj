import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg from '../assets/bg.jpg';
import useSWR from 'swr';
const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', description: '', supplier_id: '' });
    const [editId, setEditId] = useState(null);
    const [logs, setLogs] = useState([]);
    const [load, setLoad] = useState(1);
    const [load1, setLoad1] = useState(1);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/logRouter');
            console.log(response.data);
            
            setLogs(response.data.products);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    // const {data: logs} = useSWR('logs',fetchLogs);
  



    // Fetch all products on component mount
    useEffect(() => {
        fetchProducts();
    }, [load1]);

    useEffect(() => {
        fetchLogs();
    }, [load]);


    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/all');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Add or update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Update existing product
                await axios.put(`http://localhost:5000/api/products/update/${editId}`, form);
                setLoad(2);setLoad1(2);
                alert('Product updated successfully');
            } else {
                // Add new product
                await axios.post('http://localhost:5000/api/products/add', form);
                setLoad1(2);
                alert('Product added successfully');
            }
            setForm({ name: '', price: '', description: '', supplier_id: '' });
            setEditId(null);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    // Edit product
    const handleEdit = (product) => {
        setForm(product);
        setEditId(product.id);
    };

    // Delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
            
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.log("chit");
            
            console.error('Error deleting product:', error);

        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            <div className="container mx-auto py-8 px-4 text-white">
                <h1 className="text-3xl font-bold mb-6">Admin - Product Management</h1>

                {/* Product Form */}
                <form onSubmit={handleSubmit} className="mb-6 p-4 bg-black bg-opacity-75 rounded">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={form.name}
                            onChange={handleChange}
                            className="p-2 bg-gray-800 text-white rounded"
                        />
                        <input
                            type="text"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            className="p-2 bg-gray-800 text-white rounded"
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            className="p-2 bg-gray-800 text-white rounded"
                        />
                        <input
                            type="text"
                            name="supplier_id"
                            placeholder="Supplier ID"
                            value={form.supplier_id}
                            onChange={handleChange}
                            className="p-2 bg-gray-800 text-white rounded"
                        />
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                        {editId ? 'Update Product' : 'Add Product'}
                    </button>
                </form>

                {/* Product List */}
                <table className="w-full bg-black bg-opacity-75 rounded text-white">
                    <thead>
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Supplier ID</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="p-4">{product.id}</td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">${product.price}</td>
                                <td className="p-4">{product.description}</td>
                                <td className="p-4">{product.supplier_id}</td>
                                <td className="p-4">
                                    <button onClick={() => handleEdit(product)} className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded mr-2">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="px-2 py-1 bg-red-700 hover:bg-red-600 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Product Update Logs */}
            <div className='flex flex-col items-center justify-center w-full'>
                <div className="mt-8 p-4 bg-black bg-opacity-75 rounded w-10/12 text-white">
                    <h2 className="text-2xl font-bold mb-4">Product Update Logs</h2>
                    <table className="w-full border-collapse border border-gray-600">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-4 border-r border-gray-600">Log ID</th>
                                <th className="p-4 border-r border-gray-600">Product ID</th>
                                <th className="p-4 border-r border-gray-600">Action</th>
                                <th className="p-4 border-r border-gray-600">Old Price</th>
                                <th className="p-4 border-r border-gray-600">New Price</th>
                                <th className="p-4">Modified At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.log_id} className="border-b border-gray-600">
                                    <td className="p-4 border-r border-gray-600">{log.log_id}</td>
                                    <td className="p-4 border-r border-gray-600">{log.product_id}</td>
                                    <td className="p-4 border-r border-gray-600">{log.action}</td>
                                    <td className="p-4 border-r border-gray-600">${log.old_price}</td>
                                    <td className="p-4 border-r border-gray-600">${log.new_price}</td>
                                    <td className="p-4">{new Date(log.modified_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default AdminProducts;
