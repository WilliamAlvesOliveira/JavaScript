// Exporta uma função chamada 'MyMod2'
// Essa função é usada como construtora (parecida com uma classe)
// Ao ser chamada com 'new', ela cria um objeto com a propriedade 'name'
export function MyMod2() {
    // Define uma propriedade chamada 'name' no objeto criado
    this.name = 'My Mod 2';
}

// Versão moderna usando class
export class MyMod2Class {
    constructor() {
        this.name = 'My Mod 2';
    }
}
