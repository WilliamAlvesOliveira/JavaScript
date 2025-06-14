// Criamos uma constante Contador que recebe o retorno de uma IIFE (Immediately Invoked Function Expression).
// A IIFE é uma função que é executada imediatamente após ser declarada.
// Isso permite criar um escopo isolado, protegendo tudo que está dentro dela do acesso externo.
const Contador = (function(){

    // Declaramos um Symbol chamado _symbol.
    // Esse Symbol vive apenas dentro do escopo da IIFE.
    // Isso impede que qualquer código externo acesse diretamente essa chave.
    let _symbol = Symbol()

    // Retornamos uma classe chamada Contador.
    return class Contador {
        
        // O constructor é executado ao criar uma nova instância da classe.
        constructor(){
            // Criamos uma propriedade privada no objeto,
            // usando o Symbol como chave.
            // Cada instância da classe terá seu próprio contador, iniciando em 0.
            this[_symbol] = 0
        }

        // Método increment — responsável por adicionar +1 ao contador.
        increment(){
            this[_symbol]++                      // Incrementa o valor privado.
            console.log(this[_symbol])           // Exibe o valor atual no console.
        }

        // Getter contador — permite acessar o valor atual do contador de forma controlada.
        get contador(){
            return this[_symbol]                 // Retorna o valor da propriedade privada.
        }
    }

// A IIFE é encerrada e executada imediatamente com ()
})()


// Criamos uma instância da classe Contador chamada c1.
const c1 = new Contador()

// Incrementamos o contador 4 vezes na instância c1.
c1.increment()    // Saída: 1
c1.increment()    // Saída: 2
c1.increment()    // Saída: 3
c1.increment()    // Saída: 4

// Criamos uma nova instância da classe Contador chamada c2.
const c2 = new Contador()

// Incrementamos o contador 1 vez na instância c2.
c2.increment()    // Saída: 1

// Acessamos o valor atual do contador de cada instância.
// Cada instância possui seu próprio contador, independente uma da outra.
console.log(c1.contador)    // Saída: 4
console.log(c2.contador)    // Saída: 1


/* =======================================================
🧠 Aula — Protegendo propriedades com Symbol + IIFE

📌 O que aprendemos aqui?
- Utilizamos uma IIFE para criar um escopo isolado.
- Dentro dela, declaramos um Symbol que serve como chave privada.
- A classe Contador armazena seu contador usando esse Symbol.
- Dessa forma, a propriedade do contador não é acessível de fora da classe,
  pois o Symbol está isolado dentro da IIFE.

🔐 Como funciona a proteção?
- O Symbol `_symbol` não é visível fora da IIFE.
- Ninguém consegue acessar diretamente `objeto[_symbol]`,
  porque fora desse escopo o Symbol não existe.
- Isso impede alterações indesejadas, protegendo os dados internos do objeto.

🚀 Vantagens:
- Simula encapsulamento (privacidade) no JavaScript.
- Garante que apenas métodos internos da classe podem ler ou modificar o contador.
- Cada instância possui seu próprio contador isolado e protegido.

🕰️ Contexto histórico:
- Antes da chegada dos **private fields (#)** no JavaScript moderno,
  essa era uma das formas mais utilizadas para simular privacidade.

💎 Como seria com a sintaxe moderna (private field):
class Contador {
    #contador = 0

    increment() {
        this.#contador++
        console.log(this.#contador)
    }

    get contador() {
        return this.#contador
    }
}

📚 Conclusão:
- A abordagem com Symbol + IIFE continua válida.
- Ensina muito sobre escopo, privacidade e organização do código.
- Hoje, com os campos privados (`#`), temos uma solução mais elegante e oficial,
  mas entender essa estratégia ajuda a compreender a evolução da linguagem.

======================================================= */
