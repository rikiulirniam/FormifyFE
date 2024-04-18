import { useState } from "react";
import { useAuth, useAxios } from "../hooks";
import Alert from "../components/Alert";

function Login() {
  const axios = useAxios();
  const user = useAuth();
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState();

  function handleChange(e) {
    setData([...data, [e.target.name], e.target.value]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("auth/login", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data.errors);
        console.log(Object.keys(alert));
      });
  }

  // const
  // console.log(user);
  return (
    <>
      <main>
        <section className="login">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6">
                <h1 className="text-center mb-4">Formify</h1>
                <div className="card card-default">
                  <div className="card-body">
                    <h3 className="mb-3">Login</h3>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group my-3">
                        <label htmlFor="email" className="mb-1 text-muted">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue=""
                          className="form-control"
                          autoFocus
                          required
                          value={data.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group my-3">
                        <label htmlFor="password" className="mb-1 text-muted">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          defaultValue=""
                          className="form-control"
                          required
                          value={data.password}
                          onChange={handleChange}
                        />
                      </div>
                      {alert &&
                        Object.keys(alert).map((item, i) => (
                          <Alert
                            message={alert[item][0]}
                            color="danger"
                            key={i}
                          />
                        ))}
                      <div className="mt-4">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
