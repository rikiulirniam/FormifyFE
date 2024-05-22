import { useState } from "react";
import "./assets/css/style.css";
import "./assets/css/bootstrap.css";
import "./assets/js/bootstrap";
import "./assets/js/popper";
import { AuthProvider } from "./auth/Provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import DetailForm from "./pages/DetailForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="/forms/:form-slug/questions" element={<DetailForm />} />
          <Route path="/forms/:form-slug/responses" element={<DetailForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
