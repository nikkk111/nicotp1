import React from 'react'; // JSX
import { Link } from 'react-router-dom'; 
import './inicio.css'; 

function Inicio() {
  return (
    <div className="inicio">
      <header className="top-bar">
        <div className="title">TORNEOS</div>
        <div className="auth-buttons">
          <Link to="/login">
            <button>INICIAR SESIÓN</button>
          </Link>
          <Link to="/register">
            <button>REGISTRO</button>
          </Link>
        </div>
      </header>

      <div className="hero">
        <div className="text">
          <h1>
            CREA TUS PROPIOS
            <br />
            TORNEOS DEPORTIVOS
          </h1>
          <p>Crea, organiza y comparte tus torneos con tus amigos y comunidad.</p>
          <Link to="/torneo">
            <button className="empezar-btn">EMPEZAR</button>
          </Link>
        </div>
        <div className="image">
          <img
            alt="Graphic of stars forming a ball"
            height="500"
            src="https://i.pinimg.com/236x/fd/6e/84/fd6e84d0fcba5f2fb0017d9ec0a885b7.jpg"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}

export default Inicio; 