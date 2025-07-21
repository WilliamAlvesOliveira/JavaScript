// Definindo uma interface chamada AnimalInterface
// Interfaces são usadas para definir contratos que as classes devem seguir
interface AnimalInterface {
    categoria: string;             // Propriedade obrigatória
    mostrarDetalhes(): void;      // Método obrigatório que deve ser implementado
    idade?: number;               // Propriedade opcional (pode ou não estar presente)
}

// Criando uma classe chamada Gato2 que implementa a interface AnimalInterface
class Gato2 implements AnimalInterface {
    // O construtor recebe e define as propriedades exigidas pela interface
    constructor(
        public categoria: string,     // Obrigatório (vem da interface)
        public readonly nome: string, // Propriedade extra da classe (não está na interface)
        public idade?: number         // Opcional (vem da interface)
    ) {}

    // Implementando o método da interface
    mostrarDetalhes() {
        console.log('mostrar detalhes do Gato');

        // Exibe os dados. Usa template literals e operador ternário para verificar se há idade
        console.log(
            `'nome: ${this.nome}\ncategoria: ${this.categoria}`,

            // Se idade existir, mostra; senão, mostra string vazia
            (this.idade) ? `\nIdade: ${this.idade}` : ''
        );
    }
}

// Criando uma instância da classe Gato2
const cookie = new Gato2('mamifero', 'Cookie');

// Criando um objeto diretamente a partir da interface (sem classe)
// Esse objeto também precisa seguir o contrato definido pela interface
const mailow: AnimalInterface = {
    categoria: 'mamifero',
    idade: 6,

    // Mesmo criando um objeto literal, é obrigatório implementar o método
    mostrarDetalhes(): void {
        // Este método está incorreto: ele não faz nada visível
        // Seria esperado um console.log ou algo similar. Vamos corrigir:
        console.log(`Categoria: ${this.categoria}`);
        console.log(`Idade: ${this.idade}`);
    }
};

// Definindo uma interface separada para comportamentos específicos de cachorro
interface CachorroInterface {
    latir(): void; // Método obrigatório: todo "CachorroInterface" deve saber latir
}

// Classe que implementa duas interfaces: AnimalInterface e CachorroInterface
// Isso é possível em TypeScript (herança múltipla de interfaces)
class Cachorro2 implements AnimalInterface, CachorroInterface {
    
    // Construtor recebe as propriedades exigidas pela interface AnimalInterface
    constructor(
        public categoria: string,       // Obrigatório pela AnimalInterface
        public readonly nome: string,   // Propriedade extra (não está nas interfaces)
        public idade?: number           // Opcional, conforme definido em AnimalInterface
    ) {}

    // Implementando o método exigido pela AnimalInterface
    mostrarDetalhes(): void {
        console.log('mostrar os detalhes');
        // Poderia incluir detalhes como nome, categoria e idade, se quiser enriquecer
    }

    // Implementando o método exigido pela CachorroInterface
    latir() {
        console.log('Au au'); // Comportamento típico de um cachorro
    }
}

//============================
// INTERFACE vs. TYPE ALIAS
//============================

// Nas interfaces podemos reutilizar o mesmo nome múltiplas vezes.
// O TypeScript faz o "merge" (junção) automático das declarações.
interface PessoaI {
    nome: string;
}

interface PessoaI {
    idade: number;
}

// Agora a interface PessoaI tem as duas propriedades: nome e idade.
// Isso se chama "Declaration Merging" (fusão de declarações).
// Isso NÃO funciona com 'type'!

// Com o 'type' não podemos duplicar o mesmo nome.
// Tentar criar dois 'type PessoaT' causará erro de conflito.
type PessoaT = {
    nome: string;
    idade: number;
};

// Com o 'type' podemos criar aliases para tipos primitivos.
// Isso não é possível com interfaces.
type TesteT = number;

// Agora TesteT é um alias para number, como uma variável de tipo.

// Com o 'type' podemos usar operadores union '|'e intersection '&' para criar tipos compostos.
type Cores = 'red' | 'green' | 'blue';

// Isso cria um tipo literal que só aceita uma dessas strings.
// Excelente para representar estados ou opções limitadas (tipo enum).
const cor: Cores = "blue"; // O IntelliSense vai sugerir "red", "green", "blue"

// Exemplo com intersection '&' (combinando dois tipos):
type Admin = { role: 'admin' };
type User = { nome: string };

type AdminUser = Admin & User;

const user1: AdminUser = {
    role: 'admin',
    nome: 'William'
};
// Agora user1 precisa ter as propriedades dos dois tipos.


//Funções =====================

// Type também pode ser usado para definir a assinatura de funções.
type SomaT = (x: number, y: number) => number;

const somar1: SomaT = (x, y) => x + y;
// Função que segue o tipo definido: recebe dois números e retorna um número.


// Interfaces também podem descrever funções.
// A sintaxe é um pouco diferente, mas o resultado é o mesmo.
interface SomaI {
    (x: number, y: number): number;
}

const somar2: SomaI = (x, y) => x + y;
// Também recebe dois números e retorna um número.


