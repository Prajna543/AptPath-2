import React from 'react';

const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <div>
                <h2 className="header-title">UEMS Portal</h2>
                <p className="header-info">
                    Welcome, <strong>{user.username}</strong> ({user.roles.join(', ').replace('ROLE_', '')})
                </p>
            </div>
            <button onClick={onLogout} className="logout-btn">
                Logout
            </button>
        </header>
    );
};

export default Header;