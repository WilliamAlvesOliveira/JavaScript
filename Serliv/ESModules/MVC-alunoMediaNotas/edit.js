import {AlunosService} from './js/Services/alunos.service.js'
import {EditAlunoView} from './js/Views/editAluno.view.js'
import {MateriasService} from './js/Services/materias.service.js'
import {EditAlunoController} from './js/Controllers/editAluno.controller.js'

const alunosService = new AlunosService()

const parameterString = window.location.search
const URLParameter = new URLSearchParams(parameterString)
const id = parseInt(URLParameter.get('id'))

const aluno = (alunosService.searchById(id))
document.querySelector('#aluno_name').value = aluno.nome

const editAlunoView = new EditAlunoView(
document.querySelector('[data-edit-aluno-form]'),
new MateriasService().materias
)

const editAlunoController = new EditAlunoController(aluno, editAlunoView, alunosService)

document.querySelector('form').addEventListener('submit', function(e){
e.preventDefault()
const nome = document.querySelector('#aluno_name').value

editAlunoController.edit(aluno, nome)
window.location.replace('index.html')
})