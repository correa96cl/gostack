import React, {useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import './App.css';
import backgroundImage from './assets/desafio2gostack.png';

/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */
function App(){

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    //useSTate devolve um array com dois psições
    //1. Variavel com seu valor inicial
    //2. Função para atualizarnos esse valor

  async  function handleAddProject(){
        //projects.push(`Novo Projeto ${Date.now()}`);

        //setProjects([...projects, `Novo Projeto ${Date.now()}`]);

       const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Edmilson Junger"
        });

       const project = response.data;

       setProjects([...projects, project]);
    }

    return ( 
    <>
    <Header title="Homepage"/>
    <img width={1380} src={backgroundImage}/>

    <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        
    </>)
}

export default App;