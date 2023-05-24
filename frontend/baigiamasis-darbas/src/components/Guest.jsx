import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export const Guest = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Vardas"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            name="surname"
            type="text"
            placeholder="Pavardė"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tel. Nr.</Form.Label>
          <Form.Control
            name="phone"
            type="number"
            placeholder="Tel. Nr."
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add product
        </Button>
      </Form>
    </div>
  );
};
