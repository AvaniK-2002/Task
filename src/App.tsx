import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProductsList from './components/ProductsList';
import ProductForm from './components/ProductForm';
import ProtectedRoute from './components/ProtectedRoute';
import { Product } from './types';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'products' | 'add-product'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // Set initial page based on user role - moved to top to fix hooks order
  useEffect(() => {
    if (user && user.role === 'Store Keeper' && currentPage === 'dashboard') {
      setCurrentPage('products');
    }
  }, [user, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700 dark:text-gray-300">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const handlePageChange = (page: 'dashboard' | 'products' | 'add-product') => {
    setCurrentPage(page);
    setShowProductForm(page === 'add-product');
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
    setCurrentPage('add-product');
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    // In a real app, this would make an API call
    console.log('Saving product:', productData);
    setShowProductForm(false);
    setEditingProduct(null);
    setCurrentPage('products');
  };

  const handleCancelForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    setCurrentPage('products');
  };

  const renderCurrentPage = () => {
    if (showProductForm) {
      return (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancelForm}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <ProtectedRoute requiredRole="Manager">
            <Dashboard />
          </ProtectedRoute>
        );
      case 'products':
        return <ProductsList onEditProduct={handleEditProduct} />;
      default:
        return user.role === 'Manager' ? (
          <ProtectedRoute requiredRole="Manager">
            <Dashboard />
          </ProtectedRoute>
        ) : (
          <ProductsList onEditProduct={handleEditProduct} />
        );
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;