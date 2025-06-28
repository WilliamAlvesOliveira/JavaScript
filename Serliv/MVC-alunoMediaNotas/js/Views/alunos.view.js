/**
 * ===============================================
 * VIEW (AlunosView) - CAMADA DE APRESENTAÇÃO
 * Responsável por toda a exibição dos dados na interface
 * ===============================================
 */
class AlunosView {
    /**
     * Construtor - Configura os elementos HTML da tabela
     * @param {HTMLElement} tableDOM - Elemento DOM da tabela (#data-table-aluno)
     */
    constructor(tableDOM, materias) {
        // Elementos DOM
        this.tablelist = tableDOM; // Tabela principal
        this.tableHeader = this.tablelist.querySelector('thead'); // Cabeçalho
        this.tableBody = this.tablelist.querySelector('tbody'); // Corpo da tabela

        // Matérias fixas (poderia ser dinâmico)
        this.materias = materias;

        // Renderiza o cabeçalho imediatamente
        this.renderHeader();
    }

    /**
     * Renderiza o cabeçalho da tabela com as matérias
     */
    renderHeader() {
        const htmlHeader = document.createElement('tr');
        htmlHeader.innerHTML = '<td>Nome</td>'; // Coluna fixa para nomes

        // Cria colunas para cada matéria
        let htmlHeaderMaterias = this.materias.map(materia => {
            return `<td>${materia}</td>`; // Ex: <td>portugues</td>
        }).join('');

        htmlHeader.innerHTML += htmlHeaderMaterias;
        this.tableHeader.appendChild(htmlHeader);
    }

    /**
     * Renderiza a lista de alunos no corpo da tabela
     * @param {AlunosService} service - Serviço com os dados dos alunos
     */
    render(service) {
        console.log(service)
        this.tableBody.innerHTML = ''; // Limpa a tabela antes de atualizar
    
        service.alunos.forEach(aluno => {
            const row = document.createElement('tr');
            let rowContent = `<td><a href='edit.html?id=${aluno._id}'>${aluno.nome}</a></td>`; // Coluna do nome

            // Verifica se o aluno tem notas em alguma matéria
            const hasNotes = this.materias.some(materia => materia in aluno.notas);

            if (hasNotes) {
                // Se tiver notas: exibe médias ou link para adicionar
                this.materias.forEach(materia => {
                    rowContent += `
                        <td>
                            ${aluno.media[materia] !== undefined ?
                                aluno.media[materia] : // Exibe a média
                                `<a href='edit.html?id=${aluno._id}'>incluir nota</a>` // Ou link
                            }
                        </td>`;
                });
            } else {
                // Se não tiver nenhuma nota: mensagem única
                rowContent += `
                    <td colspan="${this.materias.length}">
                        <a href='edit.html?id=${aluno._id}'>incluir notas</a>
                    </td>`;
            }

            row.innerHTML = rowContent;
            this.tableBody.appendChild(row);
        });
    }

    renderList(alunos) {
    this.tableBody.innerHTML = '';

    alunos.forEach(aluno => {
        const row = document.createElement('tr');
        let rowContent = `<td><a href='edit.html?id=${aluno._id}'>${aluno.nome}</a></td>`;

        const hasNotes = this.materias.some(materia => materia in aluno.notas);

        if (hasNotes) {
            this.materias.forEach(materia => {
                rowContent += `
                    <td>
                        ${aluno.media[materia] !== undefined ?
                            aluno.media[materia] :
                            `<a href='edit.html?id=${aluno._id}'>incluir nota</a>`
                        }
                    </td>`;
            });
        } else {
            rowContent += `
                <td colspan="${this.materias.length}">
                    <a href='edit.html?id=${aluno._id}'>incluir notas</a>
                </td>`;
        }

        row.innerHTML = rowContent;
        this.tableBody.appendChild(row);
    });
}

}





/**
 * ========================================================
 * EXPLICAÇÃO COMPLETA DA AlunosView (PADRÃO MVC)
 * ========================================================
 * 
 * RESPONSABILIDADES:
 * 1. Renderizar a tabela de alunos no HTML
 * 2. Manter a interface atualizada com os dados do Service
 * 3. Fornecer interatividade (links para edição)
 * 
 * CARACTERÍSTICAS:
 * - Dinâmica: Adapta a exibição conforme os dados (médias existentes ou não)
 * - Desacoplada: Não conhece o Controller, só recebe dados do Service
 * - Reutilizável: Pode ser usada em qualquer página que liste alunos
 * 
 * FLUXO TÍPICO:
 * 1. Controller atualiza o Service
 * 2. Service notifica a View
 * 3. View re-renderiza a tabela
 * 
 * MELHORIAS POSSÍVEIS:
 * 1. Receber a lista de matérias dinamicamente (do Service)
 * 2. Adicionar eventos de clique diretamente (em vez de links)
 * 3. Suporte a ordenação por coluna
 */