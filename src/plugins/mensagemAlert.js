import constants from './constants'
const tempoMensagensMilis = 5000

export default {
    mensagens: {
        'alertErroCadastroUsuario': constants.getAlert('erro', 'Já existe um usuário com este CPF.', tempoMensagensMilis),
        'alertSucessoCadastroUsuario': constants.getAlert('sucesso', 'Usuário criado com sucesso.', tempoMensagensMilis),
        'alertErroLogin': constants.getAlert('erro', 'Usuário não encontrado, crie uma conta na opção "CADASTRAR".', tempoMensagensMilis),
        'alertSucessoRemoverAtendimento': constants.getAlert('sucesso', 'Atendimento removido com sucesso.', tempoMensagensMilis),
        'alertErroRemoverAtendimento': constants.getAlert('erro', 'Erro ao remover o atendimento.', tempoMensagensMilis),
        'alertSucessoSolicitarAtendimento': constants.getAlert('sucesso', 'Atendimento solicitado.', tempoMensagensMilis),
        'alertErroSolicitarAtendimento': constants.getAlert('erro', 'Erro ao solicitar atendimento.', tempoMensagensMilis),
        'alertSucessoEditarServicos': constants.getAlert('sucesso', 'Serviços alterados com sucesso.', tempoMensagensMilis),
        'alertErroEditarServicos': constants.getAlert('erro', 'Erro ao salvar os serviços.', tempoMensagensMilis),
        'alertErroServicosDuplicados': constants.getAlert('erro', 'Existem itens duplicados.', tempoMensagensMilis),
        'alertErroNenhumServico': constants.getAlert('erro', 'Registre ao menos um serviço.', tempoMensagensMilis)
    }
}