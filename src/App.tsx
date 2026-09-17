/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Casino from "./pages/Casino";
import Sports from "./pages/Sports";
import Promotions from "./pages/Promotions";
import Profile from "./pages/Profile";
import Deposit from "./pages/Deposit";
import Admin from "./pages/Admin";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="casino" element={<Casino />} />
            <Route path="sports" element={<Sports />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
