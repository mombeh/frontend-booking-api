import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    serviceName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { firstName, lastName, email, password, serviceName } = formData;

    try {
      // Step 1: Register as user
      const userRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!userRes.ok) {
        const data = await userRes.json();
        throw new Error(data.message || 'User registration failed');
      }

      // Step 2: Register as provider
      const providerRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/providers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, serviceName }),
      });

      if (!providerRes.ok) {
        const data = await providerRes.json();
        throw new Error(data.message || 'Provider registration failed');
      }

      setSuccess('Registration successful! You can now log in.');
      navigate('/login');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='auth-container'>
      <h2>Register as Provider</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input name="serviceName" placeholder="Service Name" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
