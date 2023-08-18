const http = require('http'); // Importar http
const {URL} = require('url'); // Importar url

// Lista de usuários
let users = [{cpf:'24944978502', nome:'Vitor Moura', data_nascimento:'27-09-2000'}];

function listUsers(request, response){
    // Imprime a lista de usuários 
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(users));
    console.log(JSON.stringify(users));
}

function createUser(request, response){
    // Adiciona o novo usuário na lista de usuários
    let body = '';
    request.on('data', (chunk) =>{
        body+= chunk;
    });

    request.on('end', ()=> {
        body = JSON.parse(body);
        const newUser = {
            cpf:body.cpf,
            nome:body.nome,
            data_nascimento:body.data_nascimento
        };
    
        users.push(newUser);
    
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(users));
        console.log("New User Added\n"+JSON.stringify(users));
    });



}

// Criando servidor e adicionando as rotas e funções
const server = http.createServer((request, response) => { 
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);

    console.log(`Method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

    // Verificando a rota e o método
    if(parsedUrl.pathname=='/users'&&request.method=='GET'){
        listUsers(request, response);
    }else if (parsedUrl.pathname=='/users'&& request.method=='POST'){
        createUser(request, response);
    }else{
        // Endpoint não existe
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(`<h1>The path ${parsedUrl.pathname} does not exists</h1>`);
        console.log(`The path ${parsedUrl.pathname} does not exists`);
    }

});

server.listen(3000, ()=> console.log('💕 server started at http://localhost:3000')); // Iniciando servidor na porta local escolhida