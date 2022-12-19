/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import React from "react";
import IndexPage from "./pages/index";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  );
}

export default App;
