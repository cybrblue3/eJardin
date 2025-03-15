import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("⚠ No se encontró token en localStorage");
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user", {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        console.log("Token enviado:", token);


        if (!response.ok) {
          console.log("❌ Token inválido. Redirigiendo al login...");
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("🔥 Error al obtener usuario:", error);
        setError("Error al cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return loading ? <p>Cargando usuario...</p> : <div><h1>Bienvenido {user?.name}</h1></div>;
};

export default Dashboard;