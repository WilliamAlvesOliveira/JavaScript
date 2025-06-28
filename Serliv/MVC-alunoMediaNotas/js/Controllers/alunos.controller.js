/**
 * ===============================================
 * CONTROLLER (AlunosController) - CAMADA DE CONTROLE
 * Responsável por intermediar a View e o Service
 * ===============================================
 */
class AlunosController {
    /**
     * Construtor - Inicializa Service e View
     * @param {AlunosService} service - Camada de negócio
     * @param {AlunosView} view - Camada de visualização
     */
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.view.render(this.service); // Renderização inicial
    }

    /**
     * Adiciona um novo aluno e atualiza a View
     * @param {Object} aluno - Dados do aluno ({ nome, notas })
     */
    add(aluno) {
        try {
            if (!aluno || typeof aluno !== 'object' || !aluno.nome) {
                throw new Error('Dados do aluno inválidos.');
            }

            this.service.add(new AlunoModel(aluno));
            this.view.render(this.service); // Atualiza a View

        } catch (error) {
            console.error('Erro ao adicionar aluno:', error.message);
            // Exemplo: this.view.showError('Falha ao adicionar aluno.');
        }
    }

    search(name) {
    const data = this.service.search(name);
    console.log(data);
    this.view.renderList(data);  // Agora renderiza com um array
}
}

/**
 * ========================================================
 * EXPLICAÇÃO COMPLETA DO AlunosController (PADRÃO MVC)
 * ========================================================
 * 
 * RESPONSABILIDADES:
 * 1. Receber dados da View e repassar ao Service.
 * 2. Garantir que a View seja atualizada após operações.
 * 3. Tratar erros básicos de validação.
 * 
 * FLUXO:
 * 1. View chama controller.add(alunoData).
 * 2. Controller valida e repassa ao Service.
 * 3. Service adiciona o aluno (AlunoModel).
 * 4. Controller solicita re-renderização da View.
 * 
 * OBSERVAÇÕES:
 * - O Controller NÃO acessa DOM diretamente (tudo via View).
 * - Métodos adicionais (edit/delete) podem ser implementados
 *   seguindo o mesmo padrão.
 * 
 * MELHORIAS POSSÍVEIS:
 * 1. Adicionar handlers para edição/exclusão.
 * 2. Validação mais robusta (ex.: notas devem ser array).
 * 3. Feedback visual para erros (integrado à View).
 */