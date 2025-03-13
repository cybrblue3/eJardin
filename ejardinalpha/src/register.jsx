import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ username: '', nameu: '', password: '', rol: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/register', form);
            setMessage(response.data.message);
            setForm({ username: '', nameu: '', password: '', rol: '' });
        }catch (error){
            setMessage('Error en el registro');
        }
    };

return(
    <>
     <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="username" value={form.username} onChange={handleChange} required />
        <input type="text" name="nameu" placeholder="Enter your First name" value={form.nameu} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Create your password" value={form.password} onChange={handleChange} required />
        <input type="hidden" name="rol" value="activo" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>

)


}

export default Register;