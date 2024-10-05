import { Routes, Route } from "react-router-dom";
import { MainLayout, Content } from "@/components";
import {
  PersonalOff,
  Orders,
  Accounting,
  Users,
  DataBase,
  Employees,
  Notification,
  SignIn,
  SignUp,
} from "@/pages";
import "./layout/MainLaout.css";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Orders />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Content />} />
        <Route path="/personalOff" element={<PersonalOff />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dataBase" element={<DataBase />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/notification" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default App;
