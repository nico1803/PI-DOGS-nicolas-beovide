import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx'
import Details from '../src/components/Details/Details.jsx'
import Create from '../src/components/Create/Create.jsx'
import Loading from './components/Loading/Loading.jsx';
import Contact from './components/Contact/Contact.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/dogs/:id' component={Details}/>
      <Route path='/create' component={Create}/>
      <Route path='/contact' component={Contact}/>
      <Route path='/loading' component={Loading}/>
    </Router>
  );
}

export default App;
