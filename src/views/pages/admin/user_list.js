import Navigation from "../../layouts/navbar";
import { Button, Table } from "react-bootstrap";
import Bread from "../../components/breadcrumb";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserHome() {
  const [users, setUser] = useState([]);

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      setUser(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();

      setUser(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="mt-4 container">
        <div className=" d-flex justify-content-between">
          <Bread title1="Home" title2="admin" title3="users" />
          <Button>Add</Button>
        </div>
        <Table className="text-white">
          <thead>
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Password</th>
              <th>Gmail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(function (item, i) {
              return (
                <>
                  <tr>
                    <td key={item.id}>{item.id}</td>
                    <td key={item.id}>{item.name}</td>
                    <td key={item.id}>{item.password}</td>
                    <td key={item.id}>{item.email}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={"/users/" + item.id}
                        state={{ user: item }}
                      >
                        Edit
                      </Link>
                      <form>
                        <Button
                          type="submit"
                          className="btn-danger"
                          onClick={() => deleteUser(item.id)}
                        >
                          Delete
                        </Button>
                      </form>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserHome;
