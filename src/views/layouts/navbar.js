import "../styles/index.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import SignUpModal from "../components/sign-up-modal";
import SignInModal from "../components/sign-in-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";

function Navigation() {
  const [user, setUser] = useState();

  const Logout = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
      });
      sessionStorage.removeItem("name");
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSession = () => {
    const session = sessionStorage.getItem("name");
    const userSession = JSON.parse(session);
    setUser(userSession);
  };

  useEffect(() => {
    getSession();
  }, []);

  if (!user) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <FontAwesomeIcon icon={faClock} color="white" size="xl" />
            </Nav>
            <Nav>
              <SignInModal />
              <SignUpModal />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown
              className="me-5"
              id="nav-dropdown-dark-example"
              title={user.name}
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={Logout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
