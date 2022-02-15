import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //we need to bring this here in order to use toast anywhere in our code, the we call it down below
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import PrivateRoute from "./component/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewTicket from "./pages/NewTicket";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
