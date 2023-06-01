import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import { Routes, Route, Link, useRouteMatch } from "react-router-dom";
function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" exact="true" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </main>
  );
}

export default App;
