import React,{useState} from "react"

const Forgot = () => {
    const [email,setEmail] = useState("")

    const onSubmit = (event) => {
        event.preventDefault()
        let data = {email}
        fetch('http://localhost:5000/reset_password', {
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
        })
        .catch((error)=>{
          console.log(error)
        })
  }

    return (
        <form onSubmit={onSubmit}>
                  <h3>Forgot Password</h3>
  
                  <div className="form-group">
                      <label>Email address</label>
                      <input type="email" required value={email} onChange={(event)=>{setEmail(event.target.value)}} className="form-control" placeholder="Enter email"/>
                  </div>
  
                  <button type="submit" className="btn btn-primary btn-block">Reset</button>
        </form>
    )
}

export default Forgot;