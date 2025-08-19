import { useAuth } from '../contexts/AuthContext';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Grid3x3,
  DollarSign,
  ShoppingCart,
  Activity
} from 'lucide-react';

// Mock data - in a real app, this would come from an API
const mockStats = {
  totalProducts: 156,
  totalValue: 89420,
  lowStock: 12,
  categories: 8,
  recentActivity: [
    { id: 1, action: 'Product added', item: 'Wireless Headphones', time: '2 hours ago' },
    { id: 2, action: 'Stock updated', item: 'Laptop Stand', time: '4 hours ago' },
    { id: 3, action: 'Product edited', item: 'USB Cable', time: '6 hours ago' },
    { id: 4, action: 'Low stock alert', item: 'Power Bank', time: '1 day ago' },
  ],
  topProducts: [
    { name: 'Wireless Headphones', quantity: 45, value: 6750 },
    { name: 'Laptop Stand', quantity: 32, value: 3200 },
    { name: 'USB-C Cable', quantity: 89, value: 1780 },
    { name: 'Power Bank', quantity: 8, value: 800 },
  ]
};

export default function Dashboard() {
  const { user } = useAuth();

  const statCards = [
    {
      title: 'Total Products',
      value: mockStats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      change: '+12% from last month'
    },
    {
      title: 'Total Value',
      value: `$${mockStats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      change: '+8.2% from last month'
    },
    {
      title: 'Low Stock Items',
      value: mockStats.lowStock.toString(),
      icon: AlertTriangle,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      change: 'Needs attention'
    },
    {
      title: 'Categories',
      value: mockStats.categories.toString(),
      icon: Grid3x3,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      change: '2 new this month'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Here's what's happening with your inventory today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockStats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h2>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockStats.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Qty: {product.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${product.value.toLocaleString()}
                  </p>
                  <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(product.quantity / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}