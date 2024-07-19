const statusAtendimentoArray = [
    { status: 0, label: 'Aguardando'},
    { status: 1, label: 'Em atendimento'},
    { status: 2, label: 'Finalizado'}
]

const getStatusAtendimento = (status) => {
    const statusDisponiveis = {
        0: 'Aguardando',
        1: 'Em atendimento',
        2: 'Finalizado'
    }
    return statusDisponiveis[status]
}

const getAlert = (status, mensagem, tempoAlert) => {
    const alerts = {
        'sucesso': {
            colorAlert: 'success', 
            iconAlert: 'mdi-check', 
            mensagemAlert: mensagem,
            tempoAlert: tempoAlert,
            tituloAlert: 'Sucesso'
        },
        'erro': {
            colorAlert: 'error', 
            iconAlert: 'mdi-alert-circle-outline', 
            mensagemAlert: mensagem,
            tempoAlert: tempoAlert,
            tituloAlert: 'Erro'
        },
    }
    return alerts[status]
}

export default { statusAtendimentoArray, getStatusAtendimento, getAlert }