/*============================
    constructor function
=============================*/

// funções construtoras servem para criar objetos assim como as factory functions, porém devemos cria-las sempre utilizando o operador Neu e deve ter a primeira letra maiúscula.
//obs atualmenente, as funções construtoras foram substituidas pelas classes

function Cachorro(nome){
    let position = 0
    this.name = nome

    this.latir = function(){
        console.log(this.name, 'está latindo')
    }// em funções construtoras não é necessário separar os métodos com ,

    this.andar = function(quantPassos){
        position += quantPassos
        console.log(this.name, `andou ${quantPassos} passos`)
        console.log('a posição atual é', position)
    }
}

const rex = new Cachorro( 'Rex') //a palavra new cria um 'Objeto vazio que receberá os métodos e propriedades
const toto = new Cachorro('Totó')

console.log(rex)
rex.latir()
rex.andar(5)
rex.andar(10)

toto.andar(3)

console.log('----------------------')

/* 
Resumo:
Funções construtoras são uma forma tradicional de criar múltiplos objetos com uma estrutura comum. Elas funcionam junto com o operador `new`, que cria um novo objeto e vincula `this` à função chamada. É uma alternativa às Factory Functions, com uma sintaxe mais próxima do paradigma OO clássico.

Obs: Embora atualmente se use mais `class`, entender função construtora é essencial para compreender a fundo como objetos e protótipos funcionam no JavaScript.

Diferente das factory functions, aqui os métodos são definidos diretamente no objeto com `this`, o que pode ter impacto em performance (caso cada instância crie cópias dos métodos). Com classes e prototypes, conseguimos otimizar isso.

*/

/*============
    CLASS
=============*/
//class é um açucar sintatico introduzido no ES6 para se aproximar dos classes de outras lunguagens como Java, python ou C#, é uma forma moderna, recomendada e é mais usada atualmente. Ela encapsula melhor o construtor e os métodos e evita confusões com o prototype explicito (ele ainda existe mais fica 'escondido')

class Cachorro2{
    #position = 0  // o # significa que é uma propriedade privada (usando a sintaxe ES2022+)

    constructor(name){ //aqui é a instância(objeto) que será criada
        this.name = name
    }

    //os métodos na classe pertencem ao prototype da classe, não a instância(objeto) é como se a instância carregace ponteiros(ou link) para os métodos que estão no prototype da classe, evitando assim cópias dos mesmos métodos.
    latir(){
        console.log(this.name, 'está latindo')
    }

    andar(quantPassos){
        this.#position += quantPassos //note que aqui position é uma propriedade
        console.log(this.name, `andou ${quantPassos} passos`)
        console.log('a posição atual é', this.#position)//position escrito como propriedade
    }

    get position(){ //o método get pode ser usado normalmente
        return this.#position
    }
}

const mailow = new Cachorro2('Mailow')
const brutus = new Cachorro2('Brutus')

console.log(mailow) //aqui o objeto refere-se apenas ao cachorro mailow, os métodos pertencem a classe cachorro, portanto a saída no console será apenas {Name: 'Mailow'}
//Os métodos poderam ser usados normalmente
mailow.latir()
mailow.andar(5)
mailow.andar(10)

brutus.andar(3)
console.log(brutus.position)

/* 
=====================
Resumo Final
=====================

➡️ As **funções construtoras** são uma forma tradicional em JavaScript de criar objetos reutilizáveis com `new`. Usam `this` para atribuir propriedades e métodos diretamente à instância. Porém, isso pode impactar a performance, pois cada instância carrega suas próprias cópias dos métodos.

➡️ As **classes (class)**, introduzidas no ES6, são uma sintaxe moderna e recomendada. Elas encapsulam melhor o construtor, organizam os métodos no `prototype` automaticamente (melhorando performance), e permitem uso de recursos como **propriedades privadas** (`#`) e **getters/setters** de forma mais clara.

🧠 **Boas práticas:**
- Prefira `class` para projetos atuais.
- Use `get`/`set` apenas quando necessário (evite uso abusivo, como ensina o Calisthenics).
- Evite definir métodos dentro de `constructor` com `this.metodo = function()` (isso cria múltiplas cópias).

Entender `function constructor`, `factory function` e `class` é fundamental para dominar a criação de objetos e se aprofundar em **Programação Orientada a Objetos (OOP)** em JavaScript.

*/

