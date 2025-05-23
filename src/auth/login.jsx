import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Baseurl = import.meta.env.VITE_BASE_URL 

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // Default to 'user'
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const endpoint = formData.role === 'provider' ? 'providers' : 'users';

    try {
      const res = await fetch(`${Baseurl}/${endpoint}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="provider">Provider</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
}
