import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import Home from "./pages/Home";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
