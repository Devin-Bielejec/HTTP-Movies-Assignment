import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UpdateMovieForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <div>
        {touched.title && errors.title && <p>{errors.title}</p>}
        <Field type="text" name="title" placeholder="title" />
      </div>


      <div>
        {touched.director && errors.director && <p>{errors.director}</p>}
        <Field type="text" name="director" placeholder="director" />
      </div>

      <div>
        {touched.metascore && errors.metascore && <p>{errors.metascore}</p>}
        <Field type="number" name="metascore" placeholder="metascore" />
      </div>

      <div>
        {touched.stars && errors.stars && <p>{errors.stars}</p>}
        <h6>Values should be comma separated</h6>
        <Field name="stars" placeholder="stars"  component="textarea"/>
      </div>
     
      <button type="submit" disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

const FormikUpdateMoiveForm = withFormik({
  mapPropsToValues({ title, director, metascore, stars }) {
    return {
      title: title || "",
      director: director || "",
      metascore: metascore || "",
      stars: stars || "",
      id: Date.now()
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .required("title is required"),
    director: Yup.string()
      .min(2, "director must be 2 characters or longer")
      .required("director is required"),
    metascore: Yup.number()
      .max(100)
      .required("Must have a score")

  }),
  handleSubmit(values, formikBag) {
      values.stars = values.stars.split(',');
      console.log(values);
      axios
        .post(`http://localhost:5000/api/movies`, values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          formikBag.props.history.push("/")
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
        });
    }
})(UpdateMovieForm);

export default FormikUpdateMoiveForm;