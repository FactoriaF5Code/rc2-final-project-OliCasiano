import './Homepage.css';
import { FaHome } from "react-icons/fa";
import { BsEnvelopePaperFill } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import DevsLogo from '../../../public/4devslogo.png';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'
import PostForm from '../PostForm/PostForm.jsx';

function HomePage() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {

            navigate('/');

        } catch (error) {
            console.error('Error cerrando sesión:', error);
        }
    }

    return (
        <div className="move-asides">
            <div className="aside-in-left">
                <div className='wrapper-aside'>

                    <div>
                        <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />
                        <h1><FaHome /><Link to="/HomePage"> Inicio</Link></h1>
                        <h1><IoPersonCircleSharp /><Link to="/PerfilUser"> Mi Perfil</Link></h1>
                    </div>
                    <div>
                        <div className="bussines-mode">
                            <h1>Modo Empresa

                            </h1>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                defaultChecked
                            />
                        </div>
                        <button className="out-button" type="submit" onClick={handleLogout}>Salir</button>

                        <div className="help-contact">
                            <p>Necesitas Ayuda? <a href="#">Contacto</a></p>
                        </div>
                    </div>

                </div>
            </div>


            <PostForm />


            <div className="aside-in-rigth">
                <div className='wrapper-aside'>
                    <div>
                        <h1>Buscar Personas</h1>
                        <SearchBar />
                        <h1>Recomendaciones</h1>
                        <h1>Post más populares</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
