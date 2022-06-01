import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import WatchListPage from "./pages/WatchListPage";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
