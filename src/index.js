const http = require('http'); // Importar http

var users = [{cpf:'24944978502', nome:'Vitor Moura', data_nascimento:'27-09-2000'}];

// Criando servidor e adicionando respostas
const server = http.createServer((request, response) => { 
    console.log(`Method: ${request.method} | Endpoint: ${request.url}`);

    // Verificando o endpoint e o método
    if(request.url=='/users'&&request.method=='GET'){
        // Imprime a lista de usuários 
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(users));
        console.log(JSON.stringify(users));
    }else if (request.url=='/users'&& request.method=='POST'){

    }else{
        // Endpoint não existe
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(`<h1>The path ${request.url} does not exists</h1>`);
        console.log(`The path ${request.url} does not exists`);
    }

});

server.listen(3000, ()=> console.log('💕 server started at http://localhost:3000')); // Iniciando servidor na porta local escolhida