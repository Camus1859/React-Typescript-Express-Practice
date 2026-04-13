import { useState } from "react";
import "./FormValidation.css";

type ErrorType = {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

const FormValidation = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<ErrorType>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] =
    useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [showAccountCreated, setShowAccountCreated] = useState<boolean>(false);

  const onSubmitHandler = (e) => {
    let err = false;
    e.preventDefault();

    if (name.trim().length < 3) {
      setError((prevData) => ({ ...prevData, name: true }));
      err = true;
    }

    if (!email.trim().includes("@") || !email.trim().includes(".")) {
      setError((prevData) => ({ ...prevData, email: true }));
      err = true;
    }

    const hasNumber = /\d/.test(password.trim());

    if (password.length < 8 || !hasNumber) {
      setError((prevData) => ({ ...prevData, password: true }));
      setPasswordErrorMsg("Must have 8 characters and one number");
      err = true;
    }

    if (password !== confirmPassword) {
      setError((prevData) => ({ ...prevData, confirmPassword: true }));
      setConfirmPasswordErrorMsg("Passwords do not match!");
      err = true;
    }

    if (!err) {
      setShowAccountCreated(true);
      setError({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setConfirmPasswordErrorMsg("");
      setPasswordErrorMsg("");
    }
  };

  return (
    <div className="main-container">
      <h1>Create Account</h1>
      {showAccountCreated && <p className={"success-msg"}>Account Created!</p>}
      <form className="form" onSubmit={onSubmitHandler}>
        <input
          className={error.name ? "input-error" : ""}
          onBlur={() => {
            if (name.trim().length < 3) {
              setError((prevData) => ({ ...prevData, name: true }));
            }
          }}
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError((prevData) => ({ ...prevData, name: false }));
          }}
        />
        {error.name && <p className="text-error">Error with name</p>}

        <input
          className={error.email ? "input-error" : ""}
          onBlur={() => {
            if (!email.trim().includes("@") || !email.trim().includes(".")) {
              setError((prevData) => ({ ...prevData, email: true }));
            }
          }}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError((prevData) => ({ ...prevData, email: false }));
          }}
        />
        {error.email && <p className="text-error">Error with email</p>}

        <input
          className={error.password ? "input-error" : ""}
          type="password"
          onBlur={() => {
            const hasNumber = /\d/.test(password.trim());
            if (password.length < 8 || !hasNumber) {
              setError((prevData) => ({ ...prevData, password: true }));
              setPasswordErrorMsg("Must have 8 characters and one number");
            }
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError((prevData) => ({ ...prevData, password: false }));
          }}
        />
        {error.password && <p className="text-error">{passwordErrorMsg}</p>}

        <input
          className={error.confirmPassword ? "input-error" : ""}
          type="password"
          onBlur={() => {
            if (password !== confirmPassword) {
              setError((prevData) => ({
                ...prevData,
                confirmPassword: true,
              }));
              setConfirmPasswordErrorMsg("Passwords do not match!");
            }
          }}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError((prevData) => ({
              ...prevData,
              confirmPassword: false,
            }));
          }}
        />
        {error.confirmPassword && (
          <p className="text-error">{confirmPasswordErrorMsg}</p>
        )}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default FormValidation;
