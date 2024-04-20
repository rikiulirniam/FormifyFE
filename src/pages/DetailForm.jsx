import { useEffect, useState } from "react";
import { useAxios } from "../hooks";
import { AuthGuard } from "../auth/Guard";
import Navbar from "../components/Navbar";

function DetailForm() {
  const axios = useAxios();

  const [form, setForm] = useState({});

  //   function autoSelect(e) {
  //     setSelectedOption(e.target.value);
  //   }

  function copyClipboard() {
    const url = document.querySelector("#url").value;
    navigator.clipboard.writeText(url);
  }

  useEffect(() => {
    // console.log(window);

    axios
      .get(window.location.pathname)
      .then((res) => {
        setForm(res.data);
        console.log(res.data);
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
                  form.questions.map((quest, i) => (
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
                            {/* <option selected value="short answer">
                            Short Answer
                            </option>
                            <option value="paragraph">Paragraph</option>
                            <option value="multiple choice">
                            Multiple Choice
                            </option>
                            <option value="dropdown">Dropdown</option>
                        <option value="checkboxes">Checkboxes</option> */}
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
                              Male,Female,Others
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
                            disabled
                            checked
                          />
                          <label className="form-check-label" for="required">
                            Required
                          </label>
                        </div>
                        <div className="mt-3">
                          <button
                            type="submit"
                            className="btn btn-outline-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <div className="question-item  card card-default my-4">
                <div className="card-body">
                <div className="form-group my-3">
                <input
                type="text"
                placeholder="Question"
                className="form-control"
                name="name"
                value="Name"
                disabled
                />
                </div>
                
                <div className="form-group my-3">
                <select name="choice_type" className="form-select" disabled>
                <option>Choice Type</option>
                <option selected value="short answer">
                Short Answer
                </option>
                <option value="paragraph">Paragraph</option>
                <option value="multiple choice">Multiple Choice</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkboxes">Checkboxes</option>
                </select>
                </div>
                <div className="form-check form-switch" aria-colspan="my-3">
                <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="required"
                disabled
                checked
                />
                <label className="form-check-label" for="required">
                Required
                </label>
                </div>
                <div className="mt-3">
                <button type="submit" className="btn btn-outline-danger">
                Remove
                </button>
                </div>
                </div>
                </div>
                
                <div className="question-item card card-default my-4">
                <div className="card-body">
                  <div className="form-group my-3">
                  <input
                  type="text"
                  placeholder="Question"
                  className="form-control"
                  name="name"
                  value="Address"
                  disabled
                  />
                  </div>
                  
                  <div className="form-group my-3">
                  <select name="choice_type" className="form-select" disabled>
                  <option>Choice Type</option>
                  <option value="short answer">Short Answer</option>
                  <option selected value="paragraph">
                  Paragraph
                  </option>
                  <option value="multiple choice">Multiple Choice</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="checkboxes">Checkboxes</option>
                  </select>
                  </div>
                  <div className="form-check form-switch" aria-colspan="my-3">
                  <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="required"
                  />
                  <label className="form-check-label" for="required">
                  Required
                  </label>
                  </div>
                  <div className="mt-3">
                  <button type="submit" className="btn btn-outline-danger">
                  Remove
                  </button>
                  </div>
                  </div>
                  </div>
                  
                  <div className="question-item card card-default my-4">
                  <div className="card-body">
                  <div className="form-group my-3">
                  <input
                      type="text"
                      placeholder="Question"
                      className="form-control"
                      name="name"
                      value="Sex"
                      disabled
                      />
                      </div>
                      
                      <div className="form-group my-3">
                      <select name="choice_type" className="form-select" disabled>
                      <option>Choice Type</option>
                      <option value="short answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option selected value="multiple choice">
                      Multiple Choice
                      </option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkboxes">Checkboxes</option>
                      </select>
                      </div>
                      <div className="form-group my-3">
                      <textarea
                      placeholder="Choices"
                      className="form-control"
                      name="choices"
                      rows="4"
                      disabled
                      >
                      Male,Female,Others
                      </textarea>
                      <div className="form-text">
                      Separate choices using comma ",".
                      </div>
                      </div>
                      <div className="form-check form-switch" aria-colspan="my-3">
                      <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="required"
                      checked
                      disabled
                      />
                      <label className="form-check-label" for="required">
                      Required
                      </label>
                      </div>
                      <div className="mt-3">
                      <button type="submit" className="btn btn-outline-danger">
                      Remove
                      </button>
                      </div>
                      </div>
                      </div>
                      
                      <div className="question-item card card-default my-4">
                      <div className="card-body">
                      <div className="form-group my-3">
                      <input
                      type="text"
                      placeholder="Question"
                      className="form-control"
                      name="name"
                      value="Born Date"
                      disabled
                      />
                      </div>
                      
                      <div className="form-group my-3">
                      <select name="chocie_type" className="form-select" disabled>
                      <option>Choice Type</option>
                      <option value="short answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option selected value="date">
                      Date
                      </option>
                      <option value="multiple choice">Multiple Choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkboxes">Checkboxes</option>
                      </select>
                      </div>
                      <div className="form-check form-switch" aria-colspan="my-3">
                      <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="required"
                      checked
                      disabled
                      />
                      <label className="form-check-label" for="required">
                      Required
                      </label>
                      </div>
                      <div className="mt-3">
                      <button type="submit" className="btn btn-outline-danger">
                      Remove
                      </button>
                      </div>
                      </div>
                      </div>
                      
                      <div className="question-item card card-default my-4">
                      <div className="card-body">
                      <div className="form-group my-3">
                      <input
                      type="text"
                      placeholder="Question"
                      className="form-control"
                      name="name"
                      value="Hobbies"
                      disabled
                      />
                      </div>
                      
                      <div className="form-group my-3">
                      <select name="choice_type" className="form-select" disabled>
                      <option>Choice Type</option>
                      <option value="short answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option value="multiple choice">Multiple Choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option selected value="checkboxes">
                      Checkboxes
                      </option>
                      </select>
                      </div>
                      <div className="form-group my-3">
                      <textarea
                      placeholder="Choices"
                      className="form-control"
                      name="choices"
                      rows="4"
                      disabled
                      >
                      Football,Guitar,Coding,Watching,Traveling
                      </textarea>
                      <div className="form-text">
                      Separate choices using comma ",".
                      </div>
                      </div>
                      <div className="form-check form-switch" aria-colspan="my-3">
                      <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="required"
                      disabled
                      />
                      <label className="form-check-label" for="required">
                      Required
                      </label>
                      </div>
                      <div className="mt-3">
                      <button type="submit" className="btn btn-outline-danger">
                      Remove
                      </button>
                      </div>
                      </div>
                    </div> */}

                <div className="question-item card card-default my-4">
                  <div className="card-body">
                    <form>
                      <div className="form-group my-3">
                        <input
                          type="text"
                          placeholder="Question"
                          className="form-control"
                          name="name"
                          value=""
                        />
                      </div>

                      <div className="form-group my-3">
                        <select name="choice_type" className="form-select">
                          <option selected>Choice Type</option>
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
                      <div
                        className="form-check form-switch"
                        aria-colspan="my-3"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="required"
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
