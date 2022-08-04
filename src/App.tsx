import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import StockDetails from "./components/StockDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/stocks/:ticker/details" element={<StockDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
