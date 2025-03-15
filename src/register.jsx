import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', name: '', password: '', rol: 'normaluser' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:10000/register', form);
      setMessage(response.data.message);
      setForm({ username: '', name: '', password: '', rol: '' });
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Error en el registro'}`);
      } else if (error.request) {
        setMessage('Error: No se recibió respuesta del servidor');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create your password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rol"
          placeholder="Enter your role"
          value={form.rol}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;