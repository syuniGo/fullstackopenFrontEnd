import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Exercises from "./Exercises";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => handleNavigate(navigate)}> {props.name}</button>
  );

  function handleNavigate(navigate) {
    navigate(props.url);
  }
};

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button url="part2" name="part2">
        part2
      </Button>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Exercises />}>
          {" "}
        </Route>
        {/* <Route path="/part2" element={<Exercises />}>
          {" "}
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
