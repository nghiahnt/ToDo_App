import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function cardCate(props) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>Quản lý trang {props.desc}</Card.Text>
          <Link className="btn btn-primary" to={props.link}>
            Let me in
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default cardCate;
