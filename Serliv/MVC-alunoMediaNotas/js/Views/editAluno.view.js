class EditAlunoView{
    constructor(container, materias){
        this.container = container
        this.materias = materias
    }
    
    render(aluno){
        const html = this.materias.map(materia => `
            <div class="row">
                <div class="input-field col s4">
                <input
                    id="materia_${materia}"
                    type="text"
                    class="validate"
                    disabled
                    value="${materia}"
                />
                </div>
                <div class="input-field col s2">
                <input
                    id="nota_materia_1"
                    type="text"
                    class="validate"
                />
                </div>
                <div class="input-field col s2">
                <input
                    id="nota_materia_2"
                    type="text"
                    class="validate"
                />
                </div>
                <div class="input-field col s2">
                <input
                    id="nota_materia_3"
                    type="text"
                    class="validate"
                />
                </div>
                <div class="input-field col s2">
                <input
                    id="nota_materia_4"
                    type="text"
                    class="validate"
                />
                </div>
            </div>
        `).join('')

        this.container.innerHTML = html
    }
}