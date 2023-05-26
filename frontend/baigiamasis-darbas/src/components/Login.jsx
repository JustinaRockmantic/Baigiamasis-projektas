import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export const Login = () => {
  const { setIsSignedIn } = useContext(AuthenticationContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", formData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setIsSignedIn(true);
          navigate("/");
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0efef",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "20px",
          borderRadius: "7.5px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          <b>Prisijunkite prie puslapio</b>
        </h2>
        <p style={{ textAlign: "center" }}>
          Įveskite savo el. paštą ir slaptažodį
        </p>
        <form onSubmit={handleOnSubmit}>
          <input
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              background: "#f0efef",
            }}
            name="email"
            onChange={handleOnChange}
            type="email"
            placeholder="email@gmail.com"
          />
          <input
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              background: "#f0efef",
            }}
            name="password"
            onChange={handleOnChange}
            type="password"
            placeholder="*********"
          />
          <button
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "10px",
              background: "lightpink",
              border: "none",
              borderRadius: "4px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            className="btn"
            type="submit"
          >
            PRISIJUNGTI
          </button>

          {error && (
            <div
              style={{
                background: "lightpink",
                border: "1px solid red",
                borderRadius: "4px",
                color: "red",
                padding: "6px 0",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {error}
            </div>
          )}
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Dar neturit paskyros? <Link to="/register">Registruokitės ČIA</Link>
        </p>
      </div>
    </div>
  );
};
