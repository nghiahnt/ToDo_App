import Navigation from "../../layouts/navbar";
import { Button, Table } from "react-bootstrap";
import Bread from "../../components/breadcrumb";
import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";


function TodoHome() {

//create a useState
const [tasks, setTask] = useState([]);

//get task from server
const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();

    //set data to useState
    setTask(data);
  } catch (error) {
    console.log(error.message);
  }
}

//function to delete tasks
const deleteTask = async (id) => {
  try {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })

    setTask(tasks.filter((task) => task.id !== id));
  }
  catch (error) {
    console.log(error.message);
  }
}

//use useEffect
useEffect(() => {
  getTasks();
}, []);

  return (
    <div>
      <Navigation />
      <div className="mt-4 container">
        <div className=" d-flex justify-content-between">
          <Bread title1="Home" title2="admin" title3="todo lists" />
          <Button>Add</Button>
        </div>
        <Table className="text-white">
          <thead>
            <tr>
              <th>STT</th>
              <th>User_id</th>
              <th>title</th>
              <th>description</th>
              <th>date_start</th>
              <th>date_end</th>

            </tr>
          </thead>
          <tbody>
            {tasks.map( function (item, i) {
              return (
                <>
                  <tr>
                    <td key={item.id}>{item.id}</td>
                    <td key={item.id}>{item.user_id}</td>
                    <td key={item.id}>{item.title}</td>
                    <td key={item.id}>{item.description}</td>
                    <td key={item.id}>{moment(item.start).format("DD-MM-YYYY")}</td>
                    <td key={item.id}>{moment(item.date_end).format("DD-MM-YYYY")}</td>
                    <td>
                      <Link className="btn btn-primary" to="#">
                        Edit
                      </Link>
                      <form>
                      <Button type="submit" className="btn-danger"
                        //function to delete task
                        onClick={() => deleteTask(item.id)}
                      >Delete</Button>
                    </form>
                    </td>
                  </tr>
                </>
              );
            } )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TodoHome;
