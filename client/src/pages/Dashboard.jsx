import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SellerDashboard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('recyclex_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-bold text-green-900">Loading Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === 'seller' ? <SellerDashboard /> : <BuyerDashboard />;
}
