import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import OnboardingPage from './pages/OnboardingPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // On initial load, check for user data in localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        // Navigate based on role after login
        if (userData.firstTimeLogin) {
            navigate('/reset-password');
        } else {
            const isAdmin = userData.roles.includes('ROLE_ADMIN');
            navigate(isAdmin ? '/admin' : '/dashboard');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    // This is called after a successful password reset
    const handlePasswordResetSuccess = () => {
        handleLogout();
    };

    // --- R O U T I N G ---
    // A component to protect routes that require authentication
    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }
        // If logged in, but must reset password, force redirect
        if (user.firstTimeLogin) {
            return <Navigate to="/reset-password" />;
        }
        return children;
    };
    
    // A component to specifically handle the reset password page
    const ResetPasswordRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }
        if (!user.firstTimeLogin) {
            // If user doesn't need to reset, send them to their dashboard
             const isAdmin = user.roles.includes('ROLE_ADMIN');
             return <Navigate to={isAdmin ? '/admin' : '/dashboard'} />;
        }
        return children;
    };


    return (
        <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

            {/* Password Reset Route */}
            <Route
                path="/reset-password"
                element={
                    <ResetPasswordRoute>
                        <ResetPasswordPage onPasswordResetSuccess={handlePasswordResetSuccess} />
                    </ResetPasswordRoute>
                }
            />

            {/* Protected Admin Route */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboard user={user} onLogout={handleLogout} />
                    </ProtectedRoute>
                }
            />

            {/* Protected HR/Manager Route */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <OnboardingPage user={user} onLogout={handleLogout} />
                    </ProtectedRoute>
                }
            />
            
            {/* Default route */}
            <Route path="*" element={<Navigate to={user ? (user.firstTimeLogin ? '/reset-password' : (user.roles.includes('ROLE_ADMIN') ? '/admin' : '/dashboard')) : '/login'} />} />

        </Routes>
    );
}

export default App;