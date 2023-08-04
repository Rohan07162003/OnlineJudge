
import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './Pages/RegisterPage'
import CompilePage from './Pages/CompilePage'
import ProblemSetPage from './Pages/ProblemSetPage'
import ProfilePage from './Pages/ProfilePage'
import ProblemsFormPage from './Pages/ProblemsFormPage'
import ProblemPage from './Pages/ProblemPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/compile" element={<CompilePage/>} />
          <Route path="/problemset" element={<ProblemSetPage/>} />
          <Route path="/problemset/new" element={<ProblemsFormPage/>} />
          <Route path="/problem/:id" element={<ProblemPage/>} />
          <Route path="/account" element={<ProfilePage/>} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
