import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Card } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/index.css";
import { useEffect, useState } from "react";
import moment from "moment";

function TodoItem() {

  //handleDeleteButton
  const handleDeleteButton = async (e) => {
    e.preventDefault();
    try {
      const id = e.target.getAttribute("id");
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ id: e.target.id }),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //useState to store tasks
  const [tasks, setTask] = useState([]);

  //get id from session

  //function get taks by id
  const getTasks = async () => {
    const users = sessionStorage.getItem("name");
    const id = JSON.parse(users).id;
    try {
      const res = await fetch(`http://localhost:5000/${id}`);
      const data = await res.json();
      setTask(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //function to delete tasks
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      setTask(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  //use useEffect
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.map(function (item, id) {
        return (
          <>
            <Col lg={3} className="h-100">
              <Card className="m-4 h-100">
                <Card.Body className="bg-modal cousine">
                  <Card.Title className="text-center">{item.title}</Card.Title>
                  <Card.Text className="h-75">
                    {item.description.split(",").map((item) => {
                      return (
                        <>
                          {item} <hr className="mg-1" />
                        </>
                      );
                    })}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-end">
                    <span className="smaller">
                      Deadline: {moment(item.start).format("d/MM/YYYY")} -{" "}
                      {moment(item.date_end).format("d/MM/YYYY")}
                    </span>
                    <a
                      href="#a"
                      onClick={() => deleteTask(item.id)}
                      className="trash"
                    >
                      <FontAwesomeIcon icon={faTrash} color="black" size="sm" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </>
        );
      })}
    </>
  );
}

export default TodoItem;
