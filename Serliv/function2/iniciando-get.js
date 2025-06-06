/*=======================
    iniciando get
========================*/
// usando a palavra get antes do método ele torna-se um método GETTER, assim você pode chamalo como se fosse uma propriedade

function createDog(name){
    let position = 0 //variavel que será acessada via closure
    return {
        name, //shorthand pois name : name
        latir(){
            console.log(this.name, 'está latindo')
        },
        andar(quantPassos){
            position += quantPassos
            console.log(this.name, `andou ${quantPassos} passos`)
        },
        comer(comida){
            console.log(this.name, `está comendo ${comida}`)
        },

        //note aqui que posição ainda é um método, mais poderá ser achamdado como uma propriedade ex: dog.position
        get position(){ 
            return position
        }
    }
}

const rex = createDog('Rex')
console.log(rex)// note que position é [GETTER]
rex.andar(10)
console.log(rex.position) //não precisamos utilizar ()

/*==========================================
    RESUMO SOBRE GETTERS E INTRODUÇÃO AO SETTER
===========================================*/

/*
Nesta aula vimos como criar métodos especiais chamados **getters**, usando a palavra-chave `get` antes da função. 

O getter permite que um método seja acessado como se fosse uma **propriedade**, sem a necessidade de usar parênteses.
Isso traz mais clareza e elegância na hora de acessar dados internos de um objeto, especialmente quando esses dados estão encapsulados por meio de closures (como a variável `position` no exemplo).

Exemplo:
    const rex = createDog('Rex')
    rex.andar(10)
    console.log(rex.position) // acessa como se fosse uma propriedade

➡️ Vantagens:
- Mantém os dados internos privados (encapsulados)
- Expõe apenas o que for necessário ao usuário do objeto
- Interface mais limpa e intuitiva

---

🧠 **SETTER — conceito complementar ao GETTER**

O `set` funciona de forma parecida, mas é utilizado para atribuir valores. Ele também se comporta como uma propriedade, porém permite que você **modifique** um valor interno do objeto.

Exemplo com `set`:

function createDog(name) {
    let position = 0

    return {
        name,
        andar(quantPassos) {
            position += quantPassos
        },
        get position() {
            return position
        },
        set position(value) {
            if (typeof value !== 'number') throw TypeError('Valor inválido')
            position = value
        }
    }
}

const dog = createDog('Rex')
dog.position = 50     // usando o setter
console.log(dog.position) // 50

⚠️ Cuidado: setters podem abrir espaço para alterar valores que você talvez queira manter protegidos. Só use quando realmente quiser permitir essa alteração externa.

---

🎯 **Resumo geral:**
- `get` = permite **ler** um valor como se fosse propriedade
- `set` = permite **atribuir** um valor como se fosse propriedade
- Ambos ajudam a criar objetos com **interfaces mais naturais**, sem perder o controle interno dos dados (encapsulamento)

Esses conceitos fazem parte da base de **Programação Orientada a Objetos (OOP)**, mesmo quando aplicados em função fábrica.
*/
