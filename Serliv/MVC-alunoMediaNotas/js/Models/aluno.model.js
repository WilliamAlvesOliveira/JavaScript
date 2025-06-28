/**
 * ===============================================
 * MODEL (AlunoModel) - CAMADA DE DADOS
 * Responsável por representar a entidade "Aluno" e suas regras
 * ===============================================
 */
class AlunoModel {
    /**
     * Construtor - Transforma dados brutos em um objeto Aluno estruturado
     * @param {Object} alunoData - Dados do aluno (nome, _id, notas)
     * @param {string} alunoData.nome - Nome do aluno
     * @param {number} alunoData._id - ID único (opcional)
     * @param {Object} alunoData.notas - Notas por matéria (ex.: { portugues: [1, 2, 3] })
     */
    constructor({ nome, _id, notas } = { notas: {} }) {
        // Propriedades básicas
        this.nome = nome; // Nome do aluno (string)
        this.notas = { ...notas }; // Copia as notas para evitar mutações externas

        // Gerenciamento de IDs automáticos
        this._id = (_id !== undefined) ? _id : this.generateId();
        
        // Atualiza o contador de IDs (para garantir que sejam únicos)
        if (this._id > AlunoModel.maxId) {
            AlunoModel.maxId = this._id;
        }

        // Calcula as médias automaticamente ao criar o aluno
        this.media = {};

        this.generateAvarege()
        
    }

    /**
     * Gera um novo ID único para o aluno
     * @returns {number} - Novo ID (último ID + 1)
     */
    generateId() {
        return AlunoModel.maxId + 1;
    }

    generateAvarege(){
        for (let materia in this.notas) {
            this.media[materia] = avarege(...this.notas[materia]); // Usa a função externa `avarege`
        }
    }
}

// Variável estática para controle dos IDs
AlunoModel.maxId = 0; // Inicializa o contador de IDs


/**
 * ========================================================
 * EXPLICAÇÃO COMPLETA DO AlunoModel (PADRÃO MVC)
 * ========================================================
 * 
 * O AlunoModel é a representação dos dados e regras de negócio
 * de um aluno no sistema, seguindo o padrão MVC (Model-View-Controller).
 * 
 * RESPONSABILIDADES PRINCIPAIS:
 * 1. Estruturar os dados do aluno de forma consistente
 * 2. Gerenciar identificadores únicos (_id)
 * 3. Calcular propriedades derivadas (como médias)
 * 4. Validar/transformar dados recebidos
 * 
 * DETALHAMENTO DAS FUNCIONALIDADES:
 * 
 * 1. CONSTRUTOR:
 *    - Recebe: { nome, _id (opcional), notas }
 *    - Padroniza:
 *      * Copia as notas para evitar mutações acidentais (...notas)
 *      * Gera ID automático se não fornecido (generateId())
 *      * Calcula médias automaticamente para cada matéria
 * 
 * 2. GERENCIAMENTO DE IDs:
 *    - maxId: Variável estática que rastreia o maior ID usado
 *    - generateId(): Retorna maxId + 1 (garantindo IDs únicos)
 *    - Se _id > maxId, atualiza maxId (evitando colisões futuras)
 * 
 * 3. CÁLCULO DE MÉDIAS:
 *    - Percorre todas as matérias em this.notas
 *    - Usa a função avarege() externa para calcular
 *    - Armazena em this.media (ex.: { portugues: 7.5, matematica: 8 })
 * 
 * 4. IMUTABILIDADE:
 *    - Notas são copiadas ({...notas}), não referenciadas
 *    - Protege contra alterações externas acidentais
 * 
 * RELAÇÃO COM O PADRÃO MVC:
 * - MODEL: Manipula dados e regras (esta classe)
 * - VIEW: Exibe os dados (não os modifica)
 * - CONTROLLER: Intermedia View e Model
 * 
 * EXEMPLO DE USO:
 * const aluno = new AlunoModel({
 *   nome: "João",
 *   notas: { portugues: [6,7,8], matematica: [5,6,7] }
 * });
 * 
 * MELHORIAS POSSÍVEIS:
 * 1. Adicionar validação de tipos (ex.: notas deve ser objeto)
 * 2. Implementar capitalização automática do nome
 * 3. Adicionar método para atualizar notas/recalcular médias
 */