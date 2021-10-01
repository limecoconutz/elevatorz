import './App.scss';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import React from 'react';
import AboutPage from './pages/about/AboutPage';
import Implementation from './pages/implementation/Implementation';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route exact={true} path="/" render={() => <Redirect to="/about" />} />
        <Route path="/about" component={AboutPage} />
        <Route path="/implementation" component={Implementation}/>
      </main>
    </Router>
  );
}

export default App;
