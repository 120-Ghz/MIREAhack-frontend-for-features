import AdminPanel from './AdminPanel'
import AdminLogin from './AdminLogin'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route index element={<AdminPanel />} />
                  <Route path="/login" element={<AdminLogin />} />
              </Routes>
          </BrowserRouter>
  );
}

export default App;
