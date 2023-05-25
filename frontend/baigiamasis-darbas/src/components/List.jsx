import { useEffect, useState } from "react";
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

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

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
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this guest?")) {
      axios
        .delete(`http://localhost:5000/list/${id}`)
        .then((res) => {
          console.log(res);
          fetchGuests();
        })
        .catch((err) => console.log(err));
    }
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Surname</Form.Label>
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
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add New Guest
        </Button>
      </Form>

      <Table striped bordered className="guest-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
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
                <Button
                  variant="danger"
                  style={{ backgroundColor: "hotpink" }}
                  onClick={() => handleDelete(guest.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showConfetti && <Confetti />}
    </div>
  );
};
