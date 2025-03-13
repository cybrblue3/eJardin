import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user", {
          method: "GET",
          headers: { Authorization: token },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      {user ? <p>Usuario: {user.username}</p> : <p>Cargando usuario...</p>}
    </div>
  );
};

export default Dashboard;
