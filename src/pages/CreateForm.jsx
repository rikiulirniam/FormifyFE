import { useState } from "react";
import { AuthGuard } from "../auth/Guard";
import Navbar from "../components/Navbar";
import { useAxios } from "../hooks";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const axios = useAxios();
  const navigate = useNavigate();

  const [data, setData] = useState({ limit_one_response: false });
  const [alert, setAlert] = useState();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function mergeDomains(e) {
    const allowed_domains = e.target.value.split(",");
    setData({ ...data, [e.target.name]: allowed_domains });
  }

  function mergeLimit(e) {
    setData({ ...data, [e.target.name]: e.target.checked });
  }

  //   setAllowed({...data, allowed_domains: e.target.value})

  function handleSubmit(e) {
    e.preventDefault();

    setAlert({});

    axios
      .post("/forms", data)
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data.errors);
      });
  }
  return (
    <AuthGuard>
      <Navbar />

      <main>
        <div className="hero py-5 bg-light">
          <div className="container">
            <h2>Create Form</h2>
          </div>
        </div>

        <div className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label for="name" className="mb-1 text-muted">
                      Form Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="form-control"
                      autofocus
                    />
                  </div>

                  <div className="form-group my-3">
                    <label for="slug" className="mb-1 text-muted">
                      Form Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={data.slug}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group my-3">
                    <label for="description" className="mb-1 text-muted">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      value={data.description}
                      onChange={handleChange}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="form-group my-3">
                    <label for="allowed-domains" className="mb-1 text-muted">
                      Allowed Domains
                    </label>
                    <input
                      type="text"
                      id="allowed-domains"
                      name="allowed_domains"
                      value={data.allowed_domains}
                      onChange={mergeDomains}
                      className="form-control"
                    />
                    <div className="form-text">
                      Separate domains using comma ",". Ignore for public
                      access.
                    </div>
                  </div>

                  <div className="form-check form-switch" aria-colspan="my-3">
                    <input
                      type="checkbox"
                      id="limit_one_response"
                      name="limit_one_response"
                      className="form-check-input"
                      value={data.limit_one_response}
                      onChange={mergeLimit}
                      role="switch"
                    />
                    <label
                      className="form-check-label"
                      for="limit_one_response"
                    >
                      Limit to 1 response
                    </label>
                  </div>

                  {alert &&
                    Object.keys(alert).map((item, i) => (
                      <Alert color="danger" message={alert[item][0]} key={i} />
                    ))}

                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
export default CreateForm;
