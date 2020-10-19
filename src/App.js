import React,{useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import Logout from "./Components/Logout";
import Forgot from "./Components/Forgot";
import Reset from "./Components/Reset";

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const SignUp = (props) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmit = (event) => {
          event.preventDefault()
          let data = {email,password}
          fetch('http://localhost:5000/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(async (res)=>{
            // console.log(res)
            let data = await res.json()
            alert(data.message)
            setEmail("")
            setPassword("")
          })
          .catch((error)=>{
            console.log(error)
          })
    }

    return (
          <form onSubmit={onSubmit}>
                  <h3>Sign Up</h3>
  
                  <div className="form-group">
                      <label>Email address</label>
                      <input type="email" required value={email} onChange={(event)=>{setEmail(event.target.value)}} className="form-control" placeholder="Enter email"/>
                  </div>
  
                  <div className="form-group">
                      <label>Password</label>
                      <input type="password" required value={password} onChange={(event)=>{setPassword(event.target.value)}} className="form-control" placeholder="Enter password"/>
                  </div>
  
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              </form>
    )
  }

  const Home = ()=>{
    return (
      <h2>Go to Login or Sign Up</h2>
    )
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  } 

  const Login = (props)=>{
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")

        const onSubmit = (event) => {
          event.preventDefault()
          let data = {email,password}
          fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(async (res)=>{
            // console.log(res)
            let data = await res.json()
            if(data.message==="Login Successfull"){
              setIsLoggedIn(true)
              localStorage.setItem('token',data.token)
              alert(data.message)
              props.history.push('/dashboard');
            }else{
              alert(data.message)
            }
            setEmail("")
            setPassword("")
          })
          .catch((error)=>{
            console.log(error)
          })
      }
    return (
             <form onSubmit={onSubmit}>
                  <h3>Sign In</h3>
  
                  <div className="form-group">
                      <label>Email address</label>
                      <input type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} className="form-control" placeholder="Enter email" required/>
                  </div>
  
                  <div className="form-group">
                      <label>Password</label>
                      <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} className="form-control" placeholder="Enter password" required/>
                  </div>
                  <a><Link to={"/forgot_password"}>Forgot Password</Link></a>
                  <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </form>
    )
  }

  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>React</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              { !isLoggedIn ?
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              : <li></li>
              }
              { !isLoggedIn ?
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              : <li></li>
              }
              { isLoggedIn ?
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
              </li>
              : <li></li>
              }
              { isLoggedIn ?
              <li className="nav-item">
                <Link className="nav-link" to={"/logout"}>Logout</Link>
              </li>
              : <li></li>
              }
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/reset/:userid/:reset_token" component={Reset}/>
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/forgot_password" component={Forgot} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/logout" render={()=>(
              <Logout isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            )} />
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;