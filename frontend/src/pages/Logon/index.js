import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import herosImage from '../../assets/heroes.png';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState();
    const history = useHistory();

    async function handleLogin(e)
    {
        e.preventDefault();

        try {
            const response = await api.post('session', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be the Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça Seu Logon</h1>
                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}    
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="route-link" to="/register">
                        <FiLogIn size="16" color="#E02041" />
                        Não tenho cadastro.
                    </Link>
                </form>
            </section>
            <img src={herosImage} alt="Heros" />
        </div>
    );

}