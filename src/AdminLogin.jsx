import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import './AdminLogin.css'

export default function AdminLogin() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [shouldLogin, setShouldLogin] = useState(false)
    const [cookies, setCookies] = useCookies()
    const navigate = useNavigate();

    const passwordChanged = (event) => {
        setPassword(event.target.value)
    }

    const loginChanged = (event) => {
        setLogin(event.target.value)
    }

    useEffect(() => {
        if (cookies["access_token"] && cookies["access_token"] !== "undefined") {
            navigate('/')
            return;
        }
        let refresh_token = cookies.refresh_token
        if (refresh_token) {
            fetch('http://127.0.0.1:5000/adminLogin', {
                mode: 'cors',
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
                    if (result["status"] !== 200) {
                        setError(result["message"])
                        return;
                    }
                    let time = new Date()
                    time.setTime(time.getTime() + 30 * 60 * 1000)
                    console.log(result)
                    setCookies('access_token', result["access_token"], {expires: time})
                    setCookies('refresh_token', result['refresh_token'])
                    navigate('/')
                })
            return;
        }
        setShouldLogin(true)
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
                if (result["status"] !== 200) {
                    setError(result["message"])
                    return;
                }
                let time = new Date()
                time.setTime(time.getTime() + 30 * 60 * 1000)
                setCookies('access_token', result["access_token"], {expires: time})
                setCookies('refresh_token', result['refresh_token'])
                navigate('/')
            })
        event.preventDefault()
    }

    return shouldLogin ? (
        <div>
            <form onSubmit={formSubmit} className="container_form">
                <div className="loginForm">
                    <label>Username : </label>
                    <input type="text" value={login} onChange={loginChanged} placeholder="Enter Username" className="input_form"/>
                    <label>Password : </label>
                    <input type="password" value={password} onChange={passwordChanged} placeholder="Enter Password" className="input_form"/>
                    <button type="submit" className="form_submit_button">Login</button>
                </div>
            </form>
            {error !== "" &&
            (<div>
                error
            </div>)}
        </div>
    ) : (<div/>)
}