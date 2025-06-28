/**
 * ===============================================
 * DADOS INICIAIS - MODEL
 * Aqui definimos os dados brutos dos alunos que serão
 * processados pelo sistema
 * ===============================================
 */
// const alunos = [
//     {
//         _id: 0,
//         nome: "chico melato",
//         notas: {
//             portugues: [1, 1, 2, 2],
//             matematica: [2, 2, 2, 2],
//             historia: [5, 5, 5, 5],
//             ciencias: [3, 3, 3, 3],
//         },
//     },
//     {
//         _id: 1,
//         nome: "talita lima",
//         notas: {
//             portugues: [10, 10, 10, 10],
//             matematica: [4, 4, 5, 5],
//             historia: [5, 5, 6, 6],
//             ciencias: [7, 7, 8, 9],
//         },
//     },
// ];

/**
 * ===============================================
 * INICIALIZAÇÃO DO SERVICE (LÓGICA DE NEGÓCIO)
 * O service manipula os dados conforme as regras do sistema
 * ===============================================
 */
const alunosService = new AlunosService();

// Processa cada aluno: calcula médias e armazena no service
// alunos.forEach(aluno => {
//     alunosService.add(new AlunoModel(aluno)); // Model transforma os dados brutos
// });

/**
 * ===============================================
 * INICIALIZAÇÃO DA VIEW (INTERFACE)
 * A view é responsável por exibir os dados na tela
 * ===============================================
 */
const alunosView = new AlunosView(
    document.querySelector('#data-table-aluno'), // Elemento HTML da tabela
    new MateriasService().materias // Lista de matérias do serviço
);

/**
 * ===============================================
 * INICIALIZAÇÃO DO CONTROLLER (INTERMEDIÁRIO)
 * O controller coordena a view e o service
 * ===============================================
 */
const alunosController = new AlunosController(
    alunosService,  // Conexão com a lógica de negócio
    alunosView      // Conexão com a interface
);

/**
 * ===============================================
 * CONFIGURAÇÃO DE EVENTOS (INTERAÇÃO DO USUÁRIO)
 * Aqui vinculamos ações do usuário aos métodos do controller
 * ===============================================
 */
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede recarregamento da página
    
    const nome = document.getElementById("first_name").value.trim();
    
    if (nome != '') {
        // Controller adiciona o novo aluno (MVC em ação!)
        alunosController.add({ nome }); // shorthand ES6 para { nome: nome }
        
        // Limpa o campo após adicionar
        document.getElementById("first_name").value = '';
    }
});

document.querySelector('#search_name').addEventListener('input', function() {
    const name = this.value.trim();
    sessionStorage.setItem('search', name)

    if (name.length > 2 || name.length === 0) {
        alunosController.search(name);
    }
});

const inputEvent = new Event('input')

if(sessionStorage.getItem('search')){
    document.querySelector('#search_name').value = sessionStorage.getItem('search')
    document.querySelector('#search_name').dispatchEvent(inputEvent)
}

/**
 * ===============================================
 * CÓDIGO LEGADO (COMENTADO)
 * Mostra como seria uma implementação sem MVC para comparação
 * ===============================================
 */
// Todo o código comentado abaixo representa uma abordagem não-MVC
// onde a lógica está toda misturada (dificil de manter e escalar)


// //inserir o nome de cada uma das matérias no thead
// let HTML_Header = document.createElement('tr')
// HTML_Header.innerHTML = '<td>Nome</td>'

// const HTML_HeaderMaterias = Object.keys(alunos[0].notas).map(materia => {
//     return '<td>'+materia+'</td>'
// }).join('')

// HTML_Header.innerHTML += HTML_HeaderMaterias

// document.querySelector('#data-table-aluno').appendChild(HTML_Header)

// //percorer cada aluno e gerar o html para incluir no tbody
// function render(){
//     document.querySelector('#data-table-aluno').innerHTML = ''
//     document.querySelector('#data-table-aluno').appendChild(HTML_Header)
//     alunos.forEach(aluno => {
//         const HTML_tBody = document.createElement('tr')
//         let HTMLMedias = `<td>${aluno.nome}</td>`
//         Object.keys(aluno.notas).forEach(materia => {
//             HTMLMedias += `<td>${aluno.media[materia]}</td>`
//         })
//         HTML_tBody.innerHTML += HTMLMedias
//         document.querySelector('#data-table-aluno').appendChild(HTML_tBody)
//     })
// }
// render()

// //adicionar aluno
// document.querySelector('form').addEventListener('submit', function(e){
//     e.preventDefault()
//     const nome = document.getElementById("first_name").value.trim()
//     if(nome != ''){
//         const newAluno = {
//             _id: 0,
//             nome: nome,
//             notas: {
//                 portugues: [0, 0, 0, 0],
//                 matematica: [0, 0, 0, 0],
//                 historia: [0, 0, 0, 0],
//                 ciencias: [0, 0, 0, 0],
//             },
//         }
//         newAluno.media = {}

//         for(materia in newAluno.notas){
//             newAluno.media[materia] = avarege(...newAluno.notas[materia])
//         }

//         alunos.push(newAluno)
//         render()
//         document.getElementById("first_name").value = ''
//     }
// })
