import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    serviceName: '', // only used if they choose to be a provider
    isProvider: false, // toggle provider registration
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      // Step 1: Register user
      const userRes = await fetch(`${baseUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!userRes.ok) {
        const data = await userRes.json();
        throw new Error(data.message || 'User registration failed');
      }

      // Step 2: If also registering as provider
      if (formData.isProvider) {
        const providerRes = await fetch(`${baseUrl}/api/providers/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            serviceName: formData.serviceName,
          }),
        });

        if (!providerRes.ok) {
          const data = await providerRes.json();
          throw new Error(data.message || 'Provider registration failed');
        }
      }

      setSuccess('Registration successful. You can now log in!');
      navigate('/login');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className='auth-container'>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <label>
          <input
            type="checkbox"
            name="isProvider"
            checked={formData.isProvider}
            onChange={handleChange}
          />
          I also want to register as a service provider
        </label>

        {formData.isProvider && (
          <input
            name="serviceName"
            placeholder="Service Name"
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">Register</button>
      </form>
    </div>
    <Footer/> 
    </>
  );
};

export default Register;
