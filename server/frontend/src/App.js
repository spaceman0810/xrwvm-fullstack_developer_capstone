import LoginPanel from "./components/Login/Login"
import RegistarionPanel from "./components/Register/Register"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegistarionPanel />} />
    </Routes>
  );
}
export default App;
