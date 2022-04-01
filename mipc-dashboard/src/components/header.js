import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "../App.css";
import "./styles/header.css";

function header() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
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
        <div>

        </div>

        <div>
          <nav>
            <ul className="navMenu">
              <li>
                <Link to="/" className="linkBtn">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="linkBtn">
                  About
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="linkBtn">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/nothing-here" className="linkBtn">
                  Nothing Here
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
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
