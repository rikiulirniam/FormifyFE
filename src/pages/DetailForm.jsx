import { useEffect, useState } from "react";
import { useAxios } from "../hooks";
import { AuthGuard } from "../auth/Guard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function DetailForm() {
  const axios = useAxios();
  const params = useParams();

  const [form, setForm] = useState({});
  const [data, setData] = useState({});

  const [appearBox, setAppearBox] = useState(false);

  //   function autoSelect(e) {
  //     setSelectedOption(e.target.value);
  //   }

  function switchChange(e) {
    setData({ ...data, is_required: e.target.checked });
    console.log(e.target.checked);
  }

  function selectChange(e) {
    // console.log(e.target.value);
    if (
      e.target.value == "multiple choice" ||
      e.target.value == "dropdown" ||
      e.target.value == "checkboxes"
    ) {
      setAppearBox(true);
    } else {
      setAppearBox(false);
    }
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  function copyClipboard() {
    const url = document.querySelector("#url").value;
    navigator.clipboard.writeText(url);
    alert("Link Copied Successfully");
  }

  function handleSubmit(e) {
    // setData({ ...data, choices: " " });
    axios
      .post("forms/" + params["form-slug"] + "/questions", data)
      .then((res) => {
        console.log(res.data.message);
      });
    console.log(data);
  }

  useEffect(() => {
    // console.log(window);

    axios
      .get("forms/" + params["form-slug"] + "/questions")
      .then((res) => {
        setForm(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   console.log(form.questions);
  return (
    <AuthGuard>
      <Navbar />
      <main>
        <div className="hero py-5 bg-light">
          <div className="container text-center">
            <h2 className="mb-2">{form.name}</h2>
            <div className="text-muted mb-4">{form?.description}</div>
            <div>
              <div>
                <small>For user domains</small>
              </div>
              <small>
                <span className="text-primary">
                  {form.allowed_domains &&
                    form.allowed_domains.map((domain) => domain.domain)}
                </span>
              </small>
            </div>
          </div>
        </div>

        <div className="py-5">
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-lg-5 col-md-6">
                <div className="input-group mb-5">
                  <input
                    type="text"
                    className="form-control form-link"
                    id="url"
                    readOnly
                    value={window.location.href}
                  />
                  <button onClick={copyClipboard} className="btn btn-primary">
                    Copy
                  </button>
                </div>

                <ul className="nav nav-tabs mb-2 justify-content-center">
                  <li className="nav-item">
                    <a className="nav-link active" href="detail-form.html">
                      Questions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="responses.html">
                      Responses
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6">
                {form.questions &&
                  form.questions.map((quest) => (
                    <div className="question-item  card card-default my-4">
                      <div className="card-body">
                        <div className="form-group my-3">
                          <input
                            type="text"
                            placeholder="Question"
                            className="form-control"
                            name="name"
                            value={quest.name}
                            disabled
                          />
                        </div>

                        <div className="form-group my-3">
                          <select
                            name="choice_type"
                            className="form-select"
                            disabled
                          >
                            <option>
                              {quest.choice_type.charAt(0).toUpperCase() +
                                quest.choice_type.slice(1)}
                            </option>
                          </select>
                        </div>
                        {quest.choices && (
                          <div className="form-group my-3">
                            <textarea
                              placeholder="Choices"
                              className="form-control"
                              name="choices"
                              rows="4"
                              disabled
                            >
                              {quest.choices}
                            </textarea>
                            <div className="form-text">
                              Separate choices using comma ",".
                            </div>
                          </div>
                        )}
                        <div
                          className="form-check form-switch"
                          aria-colspan="my-3"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="required"
                            checked={quest.is_required}
                            disabled
                          />
                          <label className="form-check-label" for="required">
                            Required
                          </label>
                        </div>
                        <div className="mt-3">
                          <button
                            type="submit"
                            className="btn btn-outline-danger"
                            value={quest.id}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="question-item card card-default my-4">
                  <div className="card-body">
                    <form>
                      <div className="form-group my-3">
                        <input
                          type="text"
                          placeholder="Question"
                          className="form-control"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group my-3">
                        <select
                          name="choice_type"
                          className="form-select"
                          onChange={selectChange}
                        >
                          <option selected disabled>
                            Choice Type
                          </option>
                          <option value="short answer">Short Answer</option>
                          <option value="paragraph">Paragraph</option>
                          <option value="date">Date</option>
                          <option value="multiple choice">
                            Multiple Choice
                          </option>
                          <option value="dropdown">Dropdown</option>
                          <option value="checkboxes">Checkboxes</option>
                        </select>
                      </div>

                      {appearBox && (
                        <div className="form-group my-3">
                          <textarea
                            placeholder="Choices"
                            className="form-control"
                            name="choices"
                            rows="4"
                            value={appearBox && data.choices}
                            onChange={handleChange}
                          ></textarea>
                          <div className="form-text">
                            Separate choices using comma ",".
                          </div>
                        </div>
                      )}

                      <div
                        className="form-check form-switch"
                        aria-colspan="my-3"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="required"
                          checked={data.is_required}
                          onChange={switchChange}
                        />
                        <label className="form-check-label" for="required">
                          Required
                        </label>
                      </div>
                      <div className="mt-3">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
export default DetailForm;
