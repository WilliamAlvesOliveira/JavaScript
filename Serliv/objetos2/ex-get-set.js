/* 
Crie um objeto Pessoa
Deve ter uma propriedade get chamada usuarios que armazena um array de strings;
Deve ter uma propeiedade get usuario que deve retornar o ultimo usuario do array;
Sempre que alterar(set), não deve substituir mais sim colocar no arrauy caso já não existar no array
*/

;(function(){
    const usuarios = []
  
    this.pessoa = {
        get usuario(){
            if(usuarios.length > 0){
                return usuarios[usuarios.length -1]
            }else{
                return 'não há histórico de usuários'
            }
        },
        set usuario(nome){
            if(typeof nome === 'string' && nome.trim() !== ''){
                const index = this.usuarios.indexOf(nome)
                if(index >= 0){
                    this.usuarios.splice(index,1)
                }
                usuarios.push(nome.trim())
            }
            console.log(usuarios)
        },

       get usuarios() {
            // Evitamos retornar o array original diretamente:
            // return usuarios

            // Pois ao retornar o array original, quem acessar esse getter
            // poderia alterar o conteúdo fora do controle do objeto:
            // exemplo perigoso: pessoa.usuarios.push('Hacker')

            // Usamos o spread operator para retornar uma **cópia**:
            return [...usuarios]
            // Isso garante que o array retornado não é o mesmo armazenado internamente.
            // Assim, protegemos o estado interno do objeto (evitamos mutações externas).
        }
    }
})()