import React, { useState } from 'react';
import { resetPassword } from '../services/api';

const ResetPasswordPage = ({ onPasswordResetSuccess }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await resetPassword(newPassword);
            setSuccess('Password reset successfully! You will be logged out.');
            setTimeout(() => {
                onPasswordResetSuccess();
            }, 2000);
        } catch (err) {
            setError('Failed to reset password. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h1>Reset Your Password</h1>
            <p>This is your first time logging in. You must reset your password to continue.</p>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;