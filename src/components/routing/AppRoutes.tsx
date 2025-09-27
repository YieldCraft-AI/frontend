// components/routing/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../../pages/Index";
import Yield from "../../pages/Yield";
import Docs from "../../pages/Docs";
import Portfolio from "../../pages/Portfolio";
import Charts from "../../pages/Charts";
import NotFound from "../../pages/NotFound";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/yield" element={<Yield />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
