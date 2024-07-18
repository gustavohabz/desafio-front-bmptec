const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const cpf =  [
    v => !!v || 'O campo "CPF" é obrigatório',
    v => v.length == 14 || 'CPF deve ter no mínimo 14 caracteres'
]

const modeloVeiculo = [
    v => !!v || 'O campo "Modelo do Veículo" é obrigatório'
]

const corVeiculo = [
    v => !!v || 'O campo "Cor do Veículo" é obrigatório'
]

const placaVeiculo = [
    v => !!v || 'O campo "Placa do Veículo" é obrigatório',
    v => v.length == 8 || 'Placa do veículo deve ter no mínimo 8 caracteres'
]

const anoVeiculo = [
    v => !!v || 'O campo "Ano do Veículo" é obrigatório'
]

const servicosVeiculo = [
    v => v.length > 0 || 'O campo "Serviços" é obrigatório'
]

const dataAtendimento = [
    v => !!v || 'O campo "Data do Atendimento" é obrigatório',
    v => v.length == 10 || 'Data do Atendimento está incorreta'
]

const nomeCliente = [
    v => !!v || 'O campo "Nome do Cliente" é obrigatório',
]

const email = [
    v => !!v || 'O campo "E-mail" é obrigatório',
    v => regexEmail.test(v) || 'E-mail inválido'
]

const telefone = [
    v => !!v || 'O campo "Telefone" é obrigatório',
    v => v.length == 15 || 'Placa do veículo deve ter no mínimo 15 caracteres'
]

export default { 
    cpf, 
    modeloVeiculo, 
    corVeiculo, 
    placaVeiculo,
    anoVeiculo,
    servicosVeiculo,
    dataAtendimento,
    nomeCliente,
    email,
    telefone
}