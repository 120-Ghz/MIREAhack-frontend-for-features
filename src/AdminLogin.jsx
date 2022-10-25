import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export default function AdminLogin() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie] = useCookies()

    const passwordChanged = (event) => {
        setPassword(event.target.value)
    }

    const loginChanged = (event) => {
        setLogin(event.target.value)
    }

    useEffect(() => {
        if (cookies.access_token) {

        }
        let refresh_token = cookies.refresh_token
        if (refresh_token) {
            fetch('http://127.0.0.1:5000/adminLogin', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "login": "",
                    "password": "",
                    "refresh_token": refresh_token
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // set refresh and access tokens
            })
        }
    }, [])

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