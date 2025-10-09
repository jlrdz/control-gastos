import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

import Home from "../pages/Home";
import Expenses from "../pages/Expenses";
import Budgets from "../pages/Budgets";
import Goals from "../pages/Goals";
import SettingsIndex from "../pages/settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="goals" element={<Goals />} />
          <Route path="settings" element={<SettingsIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
