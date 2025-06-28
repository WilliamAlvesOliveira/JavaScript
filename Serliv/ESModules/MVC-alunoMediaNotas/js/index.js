import {AlunosService} from './Services/alunos.service.js'
import {AlunosView} from './Views/alunos.view.js'
import {AlunosController} from './Controllers/alunos.controller.js'
import {MateriasService} from './Services/materias.service.js'

const alunosService = new AlunosService();


const alunosView = new AlunosView(
    document.querySelector('#data-table-aluno'), // Elemento HTML da tabela
    new MateriasService().materias // Lista de matérias do serviço
);


const alunosController = new AlunosController(
    alunosService,  // Conexão com a lógica de negócio
    alunosView      // Conexão com a interface
);


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