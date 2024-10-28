import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext'; 
import ProtectedRoute from './contexts/ProtectedRoute';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/register' element={
              <Register />
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
