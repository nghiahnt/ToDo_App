import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage";
import AdminHome from "./pages/admin/adminPage";
import UserHome from "./pages/admin/user_list";
import TodoHome from "./pages/admin/todo_list";
import UserEdit from "./pages/admin/user_edit";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/users" element={<UserHome />} />
      <Route path="/users/:id" element={<UserEdit />} />
      <Route path="/todos" element={<TodoHome />} />
    </Routes>
  );
}
