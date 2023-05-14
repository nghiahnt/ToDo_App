import "../styles/index.css";
import { useState } from "react";
import { Modal, Button, Row, Col, Container, Form } from "react-bootstrap";

function SignInModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || password === "") {
        alert("Please enter your name and password");
      } else {
        const body = { name, password };
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        }).then((x) => {
          return x.json();
        });
        sessionStorage.setItem("name", JSON.stringify(res));
        alert("Login success");
        window.location = "/";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button className="mr-1 btn-white cousine" onClick={handleShow}>
        Sign In
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
              <h1 className="text-center m-4 my-5">LOGO</h1>
              <Form className="m-4 py-5" method="POST" onSubmit={handleSubmit}>
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
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Sign In
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

export default SignInModal;
