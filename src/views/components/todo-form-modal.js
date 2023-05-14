import React, { useState } from "react";
import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import "../styles/index.css";

function TodoForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setDateStart] = useState("");
  const [date_end, setDateEnd] = useState("");

  //handle submit
  const handleSubmit = async (e) => {
    const users = sessionStorage.getItem("name");
    const id = JSON.parse(users).id;
    setId(id);
    e.preventDefault();
    try {
      const body = { user_id, title, description, start, date_end };
      await fetch("http://localhost:5000/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Successfully created");
      handleClose();
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  //use hook useEfect to reset screen 

  return (
    <>
      <Col lg={3} variant="primary" onClick={handleShow}>
        <img
          className="center px-5 m-4"
          src={process.env.PUBLIC_URL + "/assets/images/add_icon.png"}
          alt="yikes"
        />
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="bg-modal p-4">
          <h1 className="mb-5 text-center">TẠO GHI CHÚ MỚI</h1>
          <Form>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Enter your title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Row className="mb-3">
              <Col lg={5}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="date"
                    placeholder="Enter your title"
                    autoFocus
                    value={start}
                    onChange={(e) => setDateStart(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                lg={2}
              >
                To
              </Col>
              <Col lg={5}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="date"
                    placeholder="Enter your title"
                    autoFocus
                    value={date_end}
                    onChange={(e) => setDateEnd(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                placeholder="Enter your note"
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3 d-flex justify-content-around">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TodoForm;
