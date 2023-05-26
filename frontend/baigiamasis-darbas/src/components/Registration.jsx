import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onHandleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/register", formData)
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          console.log(err);
        }
      });
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
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0efef",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "20px",
          borderRadius: "7.5px",
        }}
      >
        <div
          style={{
            background: "#f0efef",
            padding: "20px",
            borderRadius: "7.5px 7.5px 0px 0px",
          }}
        >
          <h2>
            <b>REGISTRACIJA</b>
          </h2>
          <p>Norėdami užsiregistruoti, suveskite duomenis žemiau</p>
        </div>
        <form
          style={{
            background: "#ded9d9",
            padding: "20px",
            borderRadius: "0px 0px 7.5px 7.5px",
          }}
          onSubmit={onHandleSubmit}
        >
          {errorMessage && (
            <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
          )}
          <input
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              background: "white",
            }}
            name="name"
            type="text"
            placeholder="Vardas"
            onChange={handleOnChange}
          />
          <input
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              background: "white",
            }}
            name="surname"
            type="text"
            placeholder="Pavardė"
            onChange={handleOnChange}
          />
          <input
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              background: "white",
            }}
            name="email"
            type="email"
            placeholder="youremail@gmail.com"
            onChange={handleOnChange}
          />
          <input
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              background: "white",
            }}
            name="password"
            type="password"
            placeholder="*********"
            onChange={handleOnChange}
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
          >
            REGISTRUOTIS
          </button>
        </form>
      </div>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Turite paskyrą? <Link to="/login">Prisijunkite ČIA</Link>
      </p>
    </div>
  );
};
