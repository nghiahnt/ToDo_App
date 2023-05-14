import Navigation from "../../layouts/navbar";
import Card from "../../components/card";
import Bread from "../../components/breadcrumb";
import { Col, Row } from "react-bootstrap";

function adminHome() {
  return (
    <div>
      <Navigation />
      <div className="mt-4 container">
        <div className=" d-flex justify-content-between">
          <Bread title1="Home" title2="admin" />
        </div>
        <Row>
          <Col>
            <Card title="User" desc="Users" link="/users" />
          </Col>
          <Col>
            <Card title="Todo List" desc="Todo Lists" link="/todos" />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default adminHome;
