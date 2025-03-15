import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:10000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("📩 Respuesta del servidor:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log("✅ Token guardado:", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Error en la autenticación");
      }
    } catch (error) {
      console.error("🔥 Error en el login:", error);
      alert("Error en el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
              <div className="row g-0">
                <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
                  <div className="text-center">
                    <img src={logo} alt="logo" style={{ width: "150px" }} />
                    <h4 className="mt-3 mb-4">Welcome to eJardin</h4>
                  </div>

                  <form onSubmit={handleLogin} method='POST'>
                    <p className="text-center">Please login to your account</p>

                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                      <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button className="btn btn-primary w-100" type="submit">Log in</button>
                    <p className="text-center mt-3"><Link to="#">Forgot your Password?</Link></p>
                    <p className="text-center">Don't have an account? <Link to="/register">Create a New account</Link></p>
                  </form>
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center text-white p-5"
                     style={{ background: "linear-gradient(to right, #5B6D2F, #C3D6A1)" }}>
                  <div className="text-center">
                    <h4>We are eJardin</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;