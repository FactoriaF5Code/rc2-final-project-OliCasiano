import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import DevsLogo from '../../../public/4devslogo.png';
import './LoginForm.css';
import { useAuthenticationContext } from '../../authentication/AuthenticationProvider';

function LoginForm() {
    const navigate = useNavigate();

    const { login } = useAuthenticationContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let loginOk = await login(email, password);
        
        if (loginOk) {
            navigate("/HomePage")
        }

        setError('Invalid email or password');

    };

    return (
        <div className="all-page">
            <div className='container-wrapper'>
                <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Inicio sesión</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className='icon' />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button className='button-login' type="submit">Login</button>
                        <div className="register-link">
                            <p>¿No tienes cuenta?<Link to="/RegisterPage"> Registrate</Link></p>
                        </div>
                    </form>
                </div>
                <h1>Una red social hecha por y para Desarrolladores <span>Juniors</span> </h1>
            </div>
        </div>
    )
}

export default LoginForm;
