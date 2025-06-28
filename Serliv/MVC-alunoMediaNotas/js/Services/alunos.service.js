/**
 * ===============================================
 * SERVICE (AlunosService) - CAMADA DE NEGÓCIO
 * Responsável por gerenciar os dados dos alunos
 * ===============================================
 */
class AlunosService {
    /**
     * Construtor - Inicializa a lista de alunos
     */
    constructor() {
        this.alunos = []; // Armazena instâncias de AlunoModel
        this.updateAlunosListFromLocalStorage()
    }

    /**
     * Adiciona um aluno à lista
     * @param {AlunoModel} aluno - Instância válida de AlunoModel
     * @throws {TypeError} Se o aluno não for instância de AlunoModel
     */
    add(aluno) {
        if (!(aluno instanceof AlunoModel)) {
            throw new TypeError('aluno must be an instance of AlunoModel');
        }
        this.alunos.push(aluno)

        this.updateLocalStorage(aluno)
    }

    /**
     * Edita um aluno existente (Método básico - pode ser expandido)
     * @param {AlunoModel} aluno - Aluno a ser editado
     * @returns {AlunoModel} Aluno editado (sem lógica implementada)
     */
    edit(aluno) {
        aluno.generateAvarege()
        this.updateLocalStorage()
    }

    searchById(id){
        return this.alunos.find(aluno => aluno._id === id)
    }

    search(name) {
    return this.alunos.filter(aluno => aluno.nome.includes(name));
}


    updateLocalStorage(){
        const alunosJSON = JSON.stringify(this.alunos)
        localStorage.setItem("alunos", alunosJSON)
    }

    updateAlunosListFromLocalStorage(){
        const localStorageAlunosList = localStorage.getItem('alunos')
        if(localStorageAlunosList){
            const alunosListObject = JSON.parse(localStorageAlunosList)
            alunosListObject.forEach(aluno =>{
                this.add(new AlunoModel(aluno))
            })
        }
    }
}

/**
 * ========================================================
 * EXPLICAÇÃO COMPLETA DO AlunosService (PADRÃO MVC)
 * ========================================================
 * 
 * RESPONSABILIDADES:
 * 1. Armazenar a lista de alunos (this.alunos).
 * 2. Validar e adicionar novos alunos (método add).
 * 3. Fornecer estrutura para edição (método edit).
 * 
 * FLUXO:
 * - O Controller chama service.add(aluno) após validações.
 * - O Service garante que apenas AlunoModel seja adicionado.
 * 
 * OBSERVAÇÕES:
 * - O método edit() está simplificado para implementação futura.
 * - Não há acesso direto ao array alunos (encapsulamento preservado).
 * 
 * MELHORIAS FUTURAS (OPCIONAIS):
 * 1. Implementar edição por ID.
 * 2. Adicionar exclusão de alunos.
 * 3. Incluir validações customizadas.
 */