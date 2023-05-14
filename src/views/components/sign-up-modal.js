import "../styles/index.css";
import { useState } from "react";
import { Modal, Button, Row, Col, Container, Form } from "react-bootstrap";

function SignUpModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match, please try again");
      } else {
        const body = { name, email, password };
        await fetch("http://localhost:5000/users/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then((data) => data.json);
        alert("Successfully registered, please sign in");
        //redirect to home page
        window.location = "/";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button className="cousine btn-white" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Container fluid="true">
          <Row className="ms-0 me-0 bg-custom text-white">
            <Col xs={6} className="ps-0 pe-0">
              <img
                className="img-fluid h-100 image"
                src={process.env.PUBLIC_URL + "/assets/images/background.jpg"}
                alt="login"
              />
            </Col>
            <Col xs={6}>
              <h1 className="text-center m-4">LOGO</h1>
              <Form className="m-4" onSubmit={onSubmit} method="POST">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password Confirm:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password confirm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="text-center my-4">
                  <Button
                    className="me-3"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
}

export default SignUpModal;
