import './Homepage.css';
import { FaHome } from "react-icons/fa";
import { BsEnvelopePaperFill } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import DevsLogo from '../../../public/4devslogo.png';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'

function HomePage() {

    return (
        <div className="move-asides">
            <div className="aside-in-left">
                <div className='wrapper-aside'>

                    <div>
                        <img src={DevsLogo} alt="4Devs Logo" className="img-logo" />
                        <h1><FaHome /> Inicio</h1>
                        <h1><BsEnvelopePaperFill /> Mensajes</h1>
                        <h1><IoPersonCircleSharp /> Mi Perfil</h1>
                        <h1><FaSackDollar /> Empleo</h1>
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
                        <h3>Que estas pensando hoy...</h3>
                        <button className='button-add-post' type="submit" ><Link to="#">Añadir Post</Link></button>
                    </div>
                    <input className='wrapper-input-post' type="text" />
                </section>
                </div>
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
