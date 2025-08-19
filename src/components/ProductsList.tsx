import React, { useState } from 'react';
import { Product } from '../types';
import { Edit, Trash2, Search, Filter, Package } from 'lucide-react';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 150,
    quantity: 45,
    description: 'Premium noise-cancelling wireless headphones',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 100,
    quantity: 32,
    description: 'Adjustable aluminum laptop stand',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'USB-C Cable',
    category: 'Cables',
    price: 20,
    quantity: 89,
    description: 'High-speed USB-C charging cable',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  },
  {
    id: '4',
    name: 'Power Bank',
    category: 'Electronics',
    price: 100,
    quantity: 8,
    description: '20000mAh portable power bank',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-16'
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 80,
    quantity: 25,
    description: 'Waterproof portable Bluetooth speaker',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-21'
  }
];

interface ProductsListProps {
  onEditProduct: (product: Product) => void;
}

export default function ProductsList({ onEditProduct }: ProductsListProps) {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400' };
    if (quantity < 20) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your inventory items</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Package size={16} />
          <span>{filteredProducts.length} products found</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.quantity);
          
          return (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {product.category}
                    </p>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">Price</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${product.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">Quantity</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {product.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-500">Total Value</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${(product.price * product.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
}