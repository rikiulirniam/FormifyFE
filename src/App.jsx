import { useState } from "react";
import "./assets/css/style.css";
import "./assets/css/bootstrap.css";
import "./assets/js/bootstrap";
import "./assets/js/popper";
import { AuthProvider } from "./auth/Provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/"/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
