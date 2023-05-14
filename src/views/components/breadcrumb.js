import Breadcrumb from "react-bootstrap/Breadcrumb";

function Bread(props) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>{props.title1}</Breadcrumb.Item>
        <Breadcrumb.Item>{props.title2}</Breadcrumb.Item>
        <Breadcrumb.Item>{props.title3}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

export default Bread;
