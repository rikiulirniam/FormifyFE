import { Link, useNavigate } from "react-router-dom";
import { useAuth, useAxios } from "../hooks";
import { useEffect } from "react";

function Navbar() {
  const axios = useAxios();
  const auth = useAuth();
  const navigate = useNavigate();

  function logout(e) {
    e.preventDefault();

    axios
      .post("auth/logout")
      .then((res) => {
        auth.setUser(undefined);
        localStorage.removeItem("token");
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to={"/home"}>
          Formify
        </Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active">{auth?.user.name}</Link>
          </li>
          <li className="nav-item">
            <button onClick={logout} className="btn bg-white text-primary ms-4">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
