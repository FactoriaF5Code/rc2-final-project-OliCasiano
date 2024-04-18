import './PerfilUser.css';
import { FaHome } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import DevsLogo from '../../../public/4devslogo.png';
import { Link } from 'react-router-dom';


function PerfilUser() {

    return (
        <div className="move-asides">
            <div className="aside-in-left">
                <div className='wrapper-aside'>

                    <div>
                        <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />
                        <h1>
                <FaHome />
                <Link to="/HomePage" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Inicio
                </Link>
            </h1>
            <h1>
                <IoPersonCircleSharp />
                <Link to="/PerfilUser" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Mi Perfil
                </Link>
            </h1>
                    </div>
                    <div>
                        <div className="bussines-mode">
                          
                        </div>
                        <button className="out-button" type="submit" ><Link to="/HomePage">Salir</Link></button>
                        <div className="help-contact">
                            <p>Necesitas Ayuda? <a href="#">Contacto</a></p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="doc-central">
                <section className='header-post-central'>
                    <div className='title-post-central'>
                        <h3>Perfil de </h3>
                    </div>
                    <h3>NOMBRE</h3>
                    <h3>APELLIDOS</h3>
                    <h3>CORREO</h3>
                    <h3>SOBRE MI</h3>
                    <h3>REDES SOCIALES</h3>
                </section>
                </div>
        </div>
    );
}

export default PerfilUser;
