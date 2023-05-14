import { Container, Row } from "react-bootstrap";
import TodoForm from "../components/todo-form-modal";
import TodoItem from "../components/todo-item";
import "../styles/index.css";

function MainBody() {
  return (
    <Container fluid>
      <Row>
        <TodoItem />
        <TodoForm />
      </Row>
    </Container>
  );
}

export default MainBody;
