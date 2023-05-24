// import { Form, Button, Table } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export const List = () => {
//   const [guests, setGuests] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     surname: "",
//     email: "",
//     phone: "",
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
//       .then((res) => {
//         console.log(res);
//         // Clear the form
//         setForm({
//           name: "",
//           surname: "",
//           email: "",
//           phone: "",
//         });
//         // Fetch the updated list of guests
//         fetchGuests();
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5000/list/${id}`)
//       .then((res) => {
//         console.log(res);
//         // Fetch the updated list of guests
//         fetchGuests();
//       })
//       .catch((err) => console.log(err));
//   };

//   const fetchGuests = () => {
//     axios
//       .get("http://localhost:5000/list")
//       .then((res) => {
//         setGuests(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     // Fetch the initial list of guests
//     fetchGuests();
//   }, []);

//   return (
//     <div style={{ width: "500px", margin: "auto" }}>
//       <Form onSubmit={handleOnSubmit}>
//         <Form.Group>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleOnChange}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Surname</Form.Label>
//           <Form.Control
//             type="text"
//             name="surname"
//             value={form.surname}
//             onChange={handleOnChange}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleOnChange}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Phone</Form.Label>
//           <Form.Control
//             type="text"
//             name="phone"
//             value={form.phone}
//             onChange={handleOnChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Pridėti naują dalyvį
//         </Button>
//       </Form>

//       <Table striped bordered>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Surname</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {guests.map((guest) => (
//             <tr key={guest.id}>
//               <td>{guest.name}</td>
//               <td>{guest.surname}</td>
//               <td>{guest.email}</td>
//               <td>{guest.phone}</td>
//               <td>
//                 <Button variant="danger" onClick={() => handleDelete(guest.id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };
import { Form, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";

export const List = () => {
  const [guests, setGuests] = useState([]);
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
      .then((res) => {
        console.log(res);
        // Clear the form
        setForm({
          name: "",
          surname: "",
          email: "",
          phone: "",
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
        if (Array.isArray(res.data)) {
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
    // Fetch the initial list of guests
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
          Pridėti naują dalyvį
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

// 2 var.

// import { Form, Button, Table } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export const List = () => {
//   const [guests, setGuests] = useState([]);
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
//       .then((res) => {
//         console.log(res);
//         // Clear the form
//         setForm({
//           first_name: "",
//           last_name: "",
//           email: "",
//           phone_number: "",
//         });
//         // Fetch the updated list of guests
//         fetchGuests();
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5000/list/${id}`)
//       .then((res) => {
//         console.log(res);
//         // Fetch the updated list of guests
//         fetchGuests();
//       })
//       .catch((err) => console.log(err));
//   };

//   const fetchGuests = () => {
//     axios
//       .get("http://localhost:5000/list")
//       .then((res) => {
//         console.log(res.data); // Log the response data
//         setGuests(res.data); // Set the response data as guests
//       })
//       .catch((err) => {
//         console.log(err);
//         setGuests([]); // Set an empty array if an error occurs
//       });
//   };

//   useEffect(() => {
//     // Fetch the initial list of guests
//     fetchGuests();
//   }, []);

//   return (
//     <div style={{ width: "500px", margin: "auto" }}>
//       <Form onSubmit={handleOnSubmit}>
//         {/* Form fields */}
//         {/* ... */}
//         <Button variant="primary" type="submit">
//           Pridėti naują dalyvį
//         </Button>
//       </Form>

//       <Table striped bordered>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {guests.map((guest) => (
//             <tr key={guest.id}>
//               <td>{guest.first_name}</td>
//               <td>{guest.last_name}</td>
//               <td>{guest.email}</td>
//               <td>{guest.phone_number}</td>
//               <td>
//                 <Button variant="danger" onClick={() => handleDelete(guest.id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// List.jsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export const List = () => {
//   const [guests, setGuests] = useState([]);

//   useEffect(() => {
//     fetchGuests();
//   }, []);

//   const fetchGuests = async () => {
//     try {
//       const response = await axios.get("/list");
//       setGuests(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="list">
//       <h2>Guest List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Surname</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Registered By</th>
//             <th>Registered By Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {guests.map((guest) => (
//             <tr key={guest.id}>
//               <td>{guest.name}</td>
//               <td>{guest.surname}</td>
//               <td>{guest.email}</td>
//               <td>{guest.phone}</td>
//               <td>{guest.register_name}</td>
//               <td>{guest.register_email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
