import React, { useEffect } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import authService from './services/authService';
import { fetchCategories } from './services/category-service';

// Protected Route bileşeni
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

// Admin Route bileşeni
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!authService.isAuthenticated() || !authService.hasRole('Admin')) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

// Geçici Dashboard bileşeni
const Dashboard: React.FC = () => {
    const user = authService.getCurrentUser();
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Hoş geldin, {user?.username}!</p>
            <button
                onClick={() => {
                    authService.logout();
                    window.location.href = '/login';
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Çıkış Yap
            </button>
        </div>
    );
};

// Geçici Admin Panel bileşeni
const AdminPanel: React.FC = () => {
    useEffect(() => {
        fetchCategories(data => {
            console.log(data);
        })
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p>Bu sayfayı sadece adminler görebilir.</p>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin" element={
                <AdminRoute>
                    <AdminPanel />
                </AdminRoute>
            } />

            {/* Default route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 route */}
            <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl font-bold">404 - Sayfa Bulunamadı</h1>
                </div>
            } />
        </Routes>
    );
};

export default App;
