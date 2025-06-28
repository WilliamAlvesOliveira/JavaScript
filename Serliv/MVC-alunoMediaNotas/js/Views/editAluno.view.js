class EditAlunoView{
    constructor(form, materias){
        this.form = form
        console.log(this.form)
        this.container = form.querySelector('[data-edit-notas]')
        this.materias = materias
    }
    
    render(aluno){
        let trimestre = 0
        const html = this.materias.map(materia => `
            <div class="row" data-materia="${materia}">
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
                <input data-trimestre="${trimestre}"
                    id="nota_${materia}_${trimestre}"
                    type="number"
                    class="validate"
                    value="${aluno.notas[materia]?.[trimestre]}"
                />
                </div>
                <div class="input-field col s2">
                <input data-trimestre="${trimestre++}"
                    id="nota_${materia}_${trimestre}"
                    type="number"
                    class="validate"
                    value="${aluno.notas[materia]?.[trimestre]}"
                />
                </div>
                <div class="input-field col s2">
                <input data-trimestre="${trimestre++}"
                    id="nota_${materia}_${trimestre}"
                    type="number"
                    class="validate"
                    value="${aluno.notas[materia]?.[trimestre]}"
                />
                </div>
                <div class="input-field col s2">
                <input data-trimestre="${trimestre++}"
                    id="nota_${materia}_${trimestre}"
                    type="number"
                    class="validate"
                    value="${aluno.notas[materia]?.[trimestre]}"
                />
                </div>
            </div>
        `).join('')

        this.container.innerHTML = html
    }
}