import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Redirect from "react-router-dom";
import "./App.css";

function App() {
  let status = "";
  let navigate = useNavigate();
  let data = {
    name: "rohit",
    email: "rroo@gmail.com",
    phone: "9876543210",
    password: "1234567890",
  };

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(5, "Should be 5 character long")
      .max(15, "should not exceed 15 characters"),
    email: Yup.string().email("invalid email address").required("Required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    password: Yup.string().required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="App">
      <div className="main">
        <div className="signup">
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (JSON.stringify(data) === JSON.stringify(values)) {
                status = "sussess";

                navigate("/home");
                console.log(status);
              } else {
                status = "fail";
                alert("Data Miss Match");
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <label for="chk" aria-hidden="true">
                  Form Validation
                </label>
                <Field name="name" placeholder="User name" required="" />
                {errors.name && touched.name ? (
                  <div className="error">{errors.name}</div>
                ) : null}
                <Field
                  name="email"
                  placeholder="Email "
                  validate={validateEmail}
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}

                <Field name="phone" placeholder="Phone" />
                {errors.phone && touched.phone ? (
                  <div className="error">{errors.phone}</div>
                ) : null}
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  required=""
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}

                <button type="submit">Check</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default App;
