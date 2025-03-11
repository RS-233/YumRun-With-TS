/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState, FormEvent, ChangeEvent } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { message } from 'antd'

interface LoginData {
    name: string;
    email: string;
    password: string;
}

interface ContextType{
    url: string;
    setToken: (token: string) => void;
}

const Login = ({ setShowLogin }: { setShowLogin: (show: boolean) => void }) => {
    const { url, setToken } = useContext(StoreContext) as ContextType

    const [currState, setCurrState] = useState<'Login' | 'sign Up'>('Login')
    const [data, setData] = useState<LoginData>({
        name: '',
        email: '',
        password: ''
    })

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const onLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let newUrl = url

        if (currState === 'Login') {
            newUrl += `/api/user/login`
        } else {
            newUrl += `/api/user/register`
        }

        try {
            const response = await axios.post(newUrl, data)

            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                setShowLogin(false)
                message.success(response.data.message)
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            message.error("An error occurred. Please try again.")
        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Login' ? null : (
                        <input
                            type="text"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder="Your name"
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        placeholder="Your email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">{currState === 'sign Up' ? 'Create account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currState === 'Login' ? (
                    <p>
                        Create a new account?{' '}
                        <span onClick={() => setCurrState('sign Up')}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account? <span onClick={() => setCurrState('Login')}> Login here</span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default Login;
