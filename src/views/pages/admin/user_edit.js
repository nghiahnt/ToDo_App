import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const { default: Navigation } = require("../../layouts/navbar");

function UserEdit() {
  const [item, setItem] = useState({ user: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setItem(location.state);
    }
    setName(item.user.name);
    setEmail(item.user.email);
    setPassword(item.user.password);
  }, [location.state, item.user]);

  const update = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      await fetch(`http://localhost:5000/users/update/${item.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      window.location = "/users";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Navigation />
      <div className="d-flex justify-content-center">
        <Form className="m-4" onSubmit={update}>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={name}
              key={item.user.id}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              key={item.user.id}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              key={item.user.id}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="text-center my-4">
            <Button className="me-3" variant="secondary">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default UserEdit;
