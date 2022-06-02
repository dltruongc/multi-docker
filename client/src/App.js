import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Fib from './Fib'
import OtherPage from './OtherPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="/">Home</Link>
                <Link to="/other">Other Page</Link>
              </header>
            </div>
          }
        />
        <Route exact path="/fib" element={<Fib />} />
        <Route path="/other" element={<OtherPage />} />
      </Routes>
    </Router>
  )
}

export default App
