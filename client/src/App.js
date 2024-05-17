// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyDoctorPage from './pages/ApplyDoctorPage'
import NotificationPage from './pages/NotificationPage.js';
import Users from './pages/admin/Users.js';
import Doctors from './pages/admin/Doctors.js';


function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner />) : (
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
            />

            <Route path='/Login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
            />
            <Route path='/Register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
            />
            <Route path='/apply-doctor' element={
              <ProtectedRoute>
                <ApplyDoctorPage />
              </ProtectedRoute>
            }
            />
            <Route path='/notification' element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }
            />
            <Route path='/admin/users' element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
            />
            <Route path='/admin/doctors' element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
            />
          </Routes>
        )}
      </BrowserRouter >
    </>
  )
}

export default App;
