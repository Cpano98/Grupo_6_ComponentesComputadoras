import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "../App.css";
import "./styles/header.css";

import PageOne from "./home";
import TodosLosProductos from "./todosLosProductos";

function header() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todos" element={<Todos />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <div className="header">
        <div className="gridColumnSplit">
          <div>
            <a href="http://152.70.154.161:3000/" target="_blank">
              <img
                src="https://cpano98.github.io/Grupo_6_ComponentesComputadoras/src/public/images/logo/logo_v1.png"
                className="logoMiPc"
                alt="LogoMiPC"
              ></img>
            </a>
          </div>

          <div>
            <nav>
              <ul className="navMenu">
                <li>
                  <Link to="/" className="linkBtn">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link to="/todos" className="linkBtn">
                    Todos los productos
                  </Link>
                </li>
                <a
                  className="linkBtn"
                  href="http://152.70.154.161:3000/admin"
                >
                  Panel de administración
                </a>
                <a
                  className="linkBtn"
                  href="http://152.70.154.161:3000/products/create/new"
                >
                  Agregar producto
                </a>

                <a
                  className="linkBtn"
                  href="http://152.70.154.161:3000/admin/listUsers"
                >
                  EDITAR | ELIMINAR DE USUARIOS
                </a>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="contentContainer">
        <div className="whiteContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Home() {
  return <PageOne />;
}

function Todos() {
  return <TodosLosProductos />;
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default header;
