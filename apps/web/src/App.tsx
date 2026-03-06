import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CashierPage } from './features/pos/pages/CashierPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pos" replace />} />
        <Route path="/pos" element={<CashierPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
