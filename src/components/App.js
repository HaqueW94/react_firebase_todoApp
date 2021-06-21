import Login from '../Pages/Login';
import Signup from '../Pages/SignIn';
import Dashboard from '../Pages/Dashboard';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {AuthProvider} from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
 
  return (
    <Router>
     <AuthProvider>
     <Switch>
        <PrivateRoute exact path="/" component={Dashboard}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
     </AuthProvider>
    </Router>
  );
}

export default App;
