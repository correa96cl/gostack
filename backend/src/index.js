const express = require('express');
const cors = require('cors');
const {uuid, isUuid} = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Metodos HTTP
 * 
 * GET: Buscar informações ou informação.
 * POST: Criar uma informção no backend.
 * DELETE: Eliminar uma informação no backend.
 * PUT/PATCH: Alterar uma informação no backend.
 * 
 * 
 */

 /**
  * Tipos de parametros
  * 
  * Query params: Filtros e paginação.
  * Route params: Identificar recusos na hora de atualizar ou deletar.
  * Request Body: Conteudo na hora de criar ou editar um recurso. (JSON).
  * 
  * 
  */

  /**
   * Middleware: 
   * 
   * Interceptador de requisições que interropem totalmente a requisição ou alteram os dados da requisição.
   */

const projects = [];

function logRequests(request, response, next){
    const {method, url} = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

console.time(logLabel);

next(); // Proximo middleware

console.timeEnd(logLabel);

}


function validateProjectId(request, response, next){
    const {id} = request.params;

    if (!isUuid(id)){
        return response.status(400).json({error: 'Invalid Project ID'});
    }

    return next();

}
app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects' , (request, response) => {
    const {title} = request.query;

    const results = title ? projects.filter(project => project.title.includes(title))
    : projects;

    return  response.json(results);
});

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;
   
    const project = {id: uuid(), title, owner};

    projects.push(project);

    return  response.json(project);

})

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title, owner} = request.body;
   
    const projectIndex = projects.findIndex( project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({error: 'Project not found'})
    }


    const project = {
        id,
        title,
        owner,

    };

    projects[projectIndex] = project;

    return  response.json(project);

});

app.delete('/projects/:id', (request, response) => {

    const {id} = request.params;

    const projectIndex = projects.findIndex( project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({error: 'Project not found'})
    }


    projects.splice(projectIndex, 1);

    return  response.status(204).send();

});

app.listen(3333, () => {
    console.log("Backend started! 😍")
});
