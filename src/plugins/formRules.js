const regexCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/

const cpf =  [
    v => !!v || 'O campo "CPF" é obrigatório'
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

export default { 
    cpf, 
    modeloVeiculo, 
    corVeiculo, 
    placaVeiculo,
    anoVeiculo,
    servicosVeiculo,
    dataAtendimento
}