import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import Confetti from "react-confetti";
import "./List.css";

export const List = () => {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [editGuest, setEditGuest] = useState(null);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (editGuest) {
      axios
        .put(`http://localhost:5000/list/${editGuest.id}`, form)
        .then((res) => {
          console.log(res);
          setForm({
            name: "",
            surname: "",
            email: "",
            phone: "",
          });
          setEditGuest(null);
          fetchGuests();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:5000/list", form)
        .then((res) => {
          console.log(res);
          setForm({
            name: "",
            surname: "",
            email: "",
            phone: "",
          });
          fetchGuests();
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id, name, surname) => {
    if (
      window.confirm(`Ar tikrai norite ištrinti dalyvį: ${name} ${surname}?`)
    ) {
      axios
        .delete(`http://localhost:5000/list/${id}`)
        .then((res) => {
          console.log(res);
          fetchGuests();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (guest) => {
    setEditGuest(guest);
    setForm({
      name: guest.name,
      surname: guest.surname,
      email: guest.email,
      phone: guest.phone,
    });
  };

  const fetchGuests = () => {
    axios
      .get("http://localhost:5000/list")
      .then((res) => {
        if (Array.isArray(res.data)) {
          console.log("guests", res.data);
          setGuests(res.data);
        } else {
          setGuests([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setGuests([]);
      });
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="list-container">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Vardas</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pavardė</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tel. Nr.</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editGuest ? "Redaguoti dalyvį" : "Pridėti dalyvį"}
        </Button>
      </Form>

      <Table striped bordered className="guest-table">
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Email</th>
            <th>Tel. Nr.</th>
            <th>Veiksmas</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.surname}</td>
              <td>{guest.email}</td>
              <td>{guest.phone}</td>
              <td>
                <div className="btn-container">
                  <Button
                    variant="light-pink"
                    className="btn-light-pink"
                    onClick={() => handleEdit(guest)}
                  >
                    Redaguoti
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-danger"
                    onClick={() =>
                      handleDelete(guest.id, guest.name, guest.surname)
                    }
                  >
                    Ištrinti
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showConfetti && <Confetti />}
    </div>
  );
};
