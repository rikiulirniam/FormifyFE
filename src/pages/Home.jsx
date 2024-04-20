import { Link } from "react-router-dom";
import { AuthGuard } from "../auth/Guard";
import Navbar from "../components/Navbar";
import { useAuth, useAxios } from "../hooks";
import { useEffect, useState } from "react";

function Home() {
  const auth = useAuth();
  const axios = useAxios();

  const [forms, setForms] = useState();

  useEffect(() => {
    axios
      .get("/forms")
      .then((res) => {
        setForms(res.data.forms);
      })
      .catch((err) => {
        console.log(err.response.data.data);
      });
  }, []);

  return (
    <AuthGuard>
      <Navbar />
      <main>
        <div className="hero py-5 bg-light">
          <div className="container">
            <Link to="/create-form" className="btn btn-primary">
              Create Form
            </Link>
          </div>
        </div>

        <div className="list-form py-5">
          <div className="container">
            <h6 className="mb-3">List Form</h6>

            {forms &&
              forms.map((form, i) => (
                <Link
                  to={"/forms/" + form.slug}
                  className="card card-default mb-3"
                  key={i}
                >
                  <div className="card-body">
                    <h5 className="mb-1">{form.name}</h5>
                    <small className="text-muted">
                      @{form.slug}{" "}
                      {form.limit_one_response == true &&
                        "(limit for 1 response)"}
                    </small>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}

export default Home;
