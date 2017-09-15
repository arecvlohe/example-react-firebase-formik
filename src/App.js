import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { firebaseConnect, pathToJS, isEmpty } from "react-redux-firebase";
import { Formik } from "formik";
import Yup from "yup";

const enhance = compose(
  firebaseConnect(),
  connect(({ firebase }) => ({
    auth: pathToJS(firebase, "auth"),
    authError: pathToJS(firebase, "authError")
  })),
  Formik({
    mapPropsToValues: props => ({
      email: "",
      password: ""
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Hey, email is required! Come on, (wo)man!"),
      password: Yup.string().required("I need your password, duh!")
    }),
    handleSubmit: (values, { props, errors, setSubmitting }) => {
      setSubmitting(false);
      props.firebase.login(values);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth !== this.props.auth) {
        this.props.resetForm(nextProps);
      }
    }
  })
);

function App({
  values,
  errors,
  touched,
  dirty,
  isSubmitting,
  handleChange,
  handleReset,
  handleSubmit,
  auth,
  authError,
  firebase
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Email</label>
      <input
        id="email"
        placeholder="Email"
        type="text"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && touched.email && <div>{errors.email}</div>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        placeholder="Password"
        type="text"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && touched.password && <div>{errors.password}</div>}
      <button
        type="button"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      {isEmpty(auth) && (
        <button type={"submit"} disabled={isSubmitting}>
          Login
        </button>
      )}
      {!isEmpty(auth) && (
        <button type="button" disabled={isSubmitting} onClick={firebase.logout}>
          Logout
        </button>
      )}

      {authError && authError.message && <div>{authError.message}</div>}
    </form>
  );
}

export default enhance(App);
