import React, { useState } from 'react';
import { onboardEmployee } from '../services/api';
import Header from '../components/Header';

const OnboardingPage = ({ user, onLogout }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        totalExperience: '',
        pastExperience: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await onboardEmployee({
                ...formData,
                age: parseInt(formData.age),
                totalExperience: parseInt(formData.totalExperience)
            });
            setSuccess(`Employee '${formData.name}' onboarded successfully!`);
            // Clear form
            setFormData({ name: '', age: '', totalExperience: '', pastExperience: '' });
        } catch (err) {
            setError('Failed to onboard employee.');
            console.error(err);
        }
    };

    return (
        <div className="app-container">
            <Header user={user} onLogout={onLogout} />
            <div className="form-container">
                <h2>Onboard New Employee</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Employee Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="totalExperience">Total Experience (in years)</label>
                        <input type="number" id="totalExperience" name="totalExperience" value={formData.totalExperience} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pastExperience">Past Experience (Companies, Roles)</label>
                        <textarea id="pastExperience" name="pastExperience" value={formData.pastExperience} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn">Onboard Employee</button>
                </form>
            </div>
        </div>
    );
};

export default OnboardingPage;