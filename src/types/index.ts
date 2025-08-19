export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Manager' | 'Store Keeper';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStock: number;
  categories: number;
}