const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const port = 3000;

let usuarios = [{}];

// Lista de Estados (BRASIL)
const estados = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo',
    'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba',
    'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul',
    'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];

// Lista de Estado civil

const estado_civil = [
    'Solteiro(a)', 'Casado(a)', 'Separado(a)', 'Divorciado(a)', 'Viúvo(a)'
];

// Função para validar CPF
function validarCPF(cpf){
    return /^[0-9]{11}$/.test(cpf);
}

// Função para validar Data de Nascimento
function validarDataNascimento(data){
    const dataNascimento = new Date(data);
    const dataAtual = new Date();
    return dataNascimento < dataAtual;
}

// Função para validar Renda Mensal
function validarRendaMensal(renda){
    return /^\d+(\.\d{1,2})?$/.test(renda);
}


// Coletando dados dos usuários
app.post('/cadastrar', (req, res) => {
    const {nome, cpf, dtnasc, estadoCivil, rendaMensal, logradouro, numero, complemento, estado, cidade} = req.body;
    console.log(req.body.nome);
    console.log(req.body.cpf);
    console.log(req.body.estadoCivil);
    console.log(req.body.rendaMensal);
    
    let error = null;

    // Iniciando as validações
    if(nome && nome.length < 3){
        error = {params: 'nome', msg:'Nome deve conter no mínimo 8 caracteres'};
    } else if(!validarCPF(cpf)){
        error = {params:'cpf', msg:'CPF inválido'};
    } else if(!validarDataNascimento(dtnasc)){
        error = {params: 'dtnasc', msg:'Data de Nascimento inválido'};
    } else if(!estado_civil.includes(req.body.estadoCivil)){
        error = {params: 'estadoCivil', msg:'Estado civil inválido'};
    } else if(!validarRendaMensal(req.body.rendaMensal)){
        error = {params:'rendaMensal', msg:'Renda mensal inválida'};
    } else if(logradouro.length < 8){
        error = {params:'logradouro', msg:'Logradouro deve conter no mínimo 8 caracteres'};
    } else if(isNaN(numero)){
        error = {params:'numero', msg:'Número deve ser um valor númerico'};
    } else if(!estados.includes(estado)){
        error = {params:'estado', msg:'Estado inválido'};
    } else if(cidade.length < 3){
        error = {params:'cidade', msg:'Cidade deve conter no mínimo 8 caracteres'};
    }

    if(error){
        res.render('cadastro', {error, messageCadastroSucesso: null});
    } else {
        usuarios.push({nome, cpf, dtnasc, estadoCivil, rendaMensal, logradouro, numero, complemento, estado, cidade});
        const messageCadastroSucesso = 'Cadastro realizado com sucesso.';
        res.render('cadastro', {error, messageCadastroSucesso});
        console.log('Cadastro realizado com sucesso.');
    }
});

// Pagina da Listagem de usuários
app.get('/', (req, res) => {
    res.render('listagem', {usuarios});
});

// Pagina de Cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro', {error: null, messageCadastroSucesso: null});
});

app.listen(port);
console.log('iniciou...');