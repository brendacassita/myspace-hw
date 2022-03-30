import { useContext, useState } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import Button from "react-bootstrap/esm/Button"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
// import Card from "../shared/./Card"



const Login = ()=>{
    const [email, setEmail] = useState('test1@test.com')
    const [password, setPassword] = useState('123456')
    
    // const [confirmPassword, setConfirmPassword] = useState('') // not need but nice for UX

    const auth = useContext(AuthContext)
   

    const handleSubmit = (e)=>{
        e.preventDefault()
        auth.handleLogin({email, password})
    }

    // with devise these are required
    return (
        <div>
            <Card>
            <h1>Myspace</h1>
            <p>Welcome existing users! Login to get started.</p>
            <form onSubmit={handleSubmit}>
                <p>Email: </p>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <br/>
                <br/>
                <p>Password: </p>
                <input value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <p>New user? <Link className="Nav-link" to="/register">Register</Link>here.</p>
                <Button variant="primary" size="sm" onClick={handleSubmit}>Login</Button>
            </form>
            </Card>
        </div>
    )
}
export default Login