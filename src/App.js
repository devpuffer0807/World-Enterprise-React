/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import React from "react";
import IndexPage from "./pages/index";
import CreatePage from "./pages/create";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
}

export default App;
