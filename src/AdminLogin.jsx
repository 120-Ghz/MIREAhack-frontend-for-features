import {useState} from "react";

export default function AdminLogin() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const passwordChanged = (event) => {
        setPassword(event.target.value)
    }

    const loginChanged = (event) => {
        setLogin(event.target.value)
    }

    const formSubmit = (event) => {
        fetch('http://127.0.0.1:5000/adminLogin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": login,
                "password": password,
                "refresh_token": ""
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
        event.preventDefault()
    }

    return (
        <form onSubmit={formSubmit}>
            <div className="loginForm">
                <label>Username : </label>
                <input type="text" value={login} onChange={loginChanged} placeholder="Enter Username"/>
                <label>Password : </label>
                <input type="password" value={password} onChange={passwordChanged} placeholder="Enter Password"/>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}