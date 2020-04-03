import React from 'react';
import logoImage from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { useState } from 'react';
import api from '../../services/api';

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    async function handleNewIncident(e) {
        
        e.preventDefault();

        const ongId = localStorage.getItem('ongId');
        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('./incidents', data, {
                headers:{
                    Authorization:ongId
                }
            });
            
            history.push('/profile');

        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImage} alt="Be the Hero"></img>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para isso.</p>
                <Link className="route-link" to="/profile">
                    <FiArrowLeft size="16" color="#E02041" />
                    Voltar.
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Título do Caso" 
                    value={title}
                    onChange={e=> setTitle(e.target.value)}
                />
                <textarea 
                    placeholder='Descrição'          
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                />
                <input 
                    placeholder="Valor em reais" 
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                />
                <button className="button" type="submit">Register</button>
            </form>
        </div>
    </div>
    );
}