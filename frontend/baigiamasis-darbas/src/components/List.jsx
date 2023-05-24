// import { Form, Button } from "react-bootstrap";
// import { useState } from "react";
// import axios from "axios";

// export const List = () => {
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   });

//   const handleOnChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:5000/list", form)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div style={{ width: "500px", margin: "auto" }}>
//       <Form onSubmit={handleOnSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             name="first_name"
//             type="text"
//             placeholder="first_name"
//             onChange={handleOnChange}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Surname</Form.Label>
//           <Form.Control
//             name="last_name"
//             type="text"
//             placeholder="last_name"
//             onChange={handleOnChange}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             name="email"
//             type="email"
//             placeholder="email"
//             onChange={handleOnChange}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Phone number</Form.Label>
//           <Form.Control
//             name="phone_number"
//             type="number"
//             placeholder="Phone number"
//             onChange={handleOnChange}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Pridėti naują dalyvį
//         </Button>
//       </Form>
//     </div>
//   );
// };

import { Form, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export const List = () => {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
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
      .then((res) => {
        console.log(res);
        // Clear the form
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
        });
        // Fetch the updated list of guests
        fetchGuests();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/list/${id}`)
      .then((res) => {
        console.log(res);
        // Fetch the updated list of guests
        fetchGuests();
      })
      .catch((err) => console.log(err));
  };

  const fetchGuests = () => {
    axios
      .get("http://localhost:5000/list")
      .then((res) => {
        setGuests(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Fetch the initial list of guests
    fetchGuests();
  }, []);

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <Form onSubmit={handleOnSubmit}>
        {/* Form fields */}
        {/* ... */}
        <Button variant="primary" type="submit">
          Pridėti naują dalyvį
        </Button>
      </Form>

      <Table striped bordered>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.first_name}</td>
              <td>{guest.last_name}</td>
              <td>{guest.email}</td>
              <td>{guest.phone_number}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(guest.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
