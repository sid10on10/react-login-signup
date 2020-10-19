import React,{useEffect,useState} from "react"
import { useParams } from "react-router-dom";

const Reset = (props) =>{

    const { userid,reset_token } = useParams();

    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("");
    const [email,setEmail] = useState("")
    const [isvalid,setIsvalid] = useState(false);

    useEffect(()=>{
        fetch(`http://localhost:5000/reset/${userid}/${reset_token}`)
        .then(async (res)=>{
            let data = await res.json()
            //console.log(data)
            if(data.message==="Valid RESET URL"){
                setEmail(data.email)
                setIsvalid(true)
            }else{
                alert(data.message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    },[reset_token,userid])

    const onSubmit = (event) => {
        event.preventDefault()
        if(password!==confirmpassword){
            alert("Enter Same Password")
        }else{
            let data = {email,password}
            fetch('http://localhost:5000/reset/', {
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
            props.history.push('/sign-in');
            })
            .catch((error)=>{
            console.log(error)
            })
        }
  }
    if(isvalid){
        return(
            <form onSubmit={onSubmit}>
                      <h3>Reset Password</h3>
      
                      <div className="form-group">
                          <label>Password</label>
                          <input type="password" required value={password} onChange={(event)=>{setPassword(event.target.value)}} className="form-control" placeholder="Enter Password"/>
                      </div>

                      <div className="form-group">
                          <label>Confirm Password</label>
                          <input type="password" required value={confirmpassword} onChange={(event)=>{setConfirmpassword(event.target.value)}} className="form-control" placeholder="Enter Password"/>
                      </div>
      
                      <button type="submit" className="btn btn-primary btn-block">Reset</button>
            </form>
        )
    }else{
        return (
            <h2>Invalid Url</h2>
        )
    }
    
}

export default Reset;