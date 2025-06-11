/* enunciado: Classe abastrata ContaBancária
1. criar conta abstrata chamada ContaBancaria   
- cliente   
- numero   
- saldo   
- depositar(valor)   
- sacar(valor) */

class ContaBancaria{
    constructor(cliente, numero){
        if(this.constructor === ContaBancaria) throw new Error('ContaBancaria é uma classe abstrata')

        this.cliente = cliente
        this.numero = numero
        this.saldo = 0.00
    }

    get dadosCliente(){
        return `${this.cliente.nome}, ${this.cliente.tipoDocumento}: ${this.cliente.documento}`
    }

    depositar(valor){
        if (typeof valor === 'number' && valor > 0){
            this.saldo += valor
        }else{
            throw new Error('Não é possivel depositar um valor negativo')
        }
    }

    sacar(){
        throw new Error('O método precisa ser implementado')
    }
}

/* enunciado: Classes concretas ContaPoupanca e ContaCorrente
2. Criar duas classes que herdam de ContaBancaria

- ContaCorrente
    - limite
    - sacar(valor)
  - ContaPoupanca
    - aniversario
    - sacar(valor) */

class ContaPoupança extends ContaBancaria{
    constructor(cliente,numero){
        super(cliente, numero)
        this.aniversario = Date.now()
    }
    sacar(valor){
        if(this.saldo < valor){
            throw new Error('saldo insuficiente)')
        }
        this.saldo -= valor
    }
}

class ContaCorrente extends ContaBancaria{
    constructor(cliente,numero){
        super(cliente, numero)
        this.limite = 0.00
    }

    sacar(valor){
        if(typeof valor === 'number' && this.saldo + this.limite >= valor){
            this.saldo -= valor
            if (this.saldo < 0){
                this.limite += this.saldo
            }
        }else{
            throw new Error('Saldo insuficiente')
        }
    }
}

const contapoupança1 = new ContaPoupança('pessoa1',1)
const contapoupança2 = new ContaPoupança('pessoa2', 2)
const contacorrente1 = new ContaCorrente('correntista1',1)

contacorrente1.depositar(1000)
contacorrente1.limite = 1000
contacorrente1.sacar(3000)
contacorrente1.depositar(2000)
contacorrente1.sacar(3000)
console.log(contacorrente1)
contacorrente1.sacar(200)
console.log(contacorrente1)
contacorrente1.depositar(2000)

/* enunciado: Composição
3. criar classe Cliente e compor as classes concretas
  - nome
  - documento
*/

class ClienteDirect{
    constructor(nome, documento){
        this.nome = nome
        this.documento = documento
    }
}

const cliente1 = new ClienteDirect('cliente 1',1234)
const cliente2 = new ClienteDirect('cliente 2', 2345)

const CCcliente1 = new ContaCorrente(cliente1,1)
const CCcliente2 = new ContaCorrente(cliente2,2)
const CPcliente2 = new ContaPoupança(cliente2,3)

console.log(CCcliente1)
console.log(CPcliente2)
console.log(CCcliente2)

/*enunciado: Cliente agora é classe abstrata
4. Agora surgiu a necessidade de Cliente ser Pessoa Física ou Juridica.
   Pessoa Física tem documento CPF e Juridica tem documento CNPJ*/
class Cliente{
    constructor(nome, documento, tipoDocumento){
        if(this.constructor === Cliente) throw new Error('Cliente é uma classe abstrata')

        this.nome = nome
        this.documento = documento
        this.tipoDocumento = tipoDocumento
    }
}

class PessoaFisica extends Cliente{
    constructor(nome, documento){
        super(nome, documento, 'CPF')

        this.cpf = documento
    }
}

class PessoaJuridica extends Cliente{
    constructor(nome, documento){
        super(nome, documento ,'CNPJ')
        this.cnpj = documento
    }
}

const pfCCcliente1 = new PessoaFisica('william','123.123.123-12')
const pjCCcliente1 = new PessoaJuridica('william','123123-0001/12')

console.log(pfCCcliente1)

const coreentepfCCcliente1 = new ContaCorrente(pfCCcliente1)
console.log(coreentepfCCcliente1)

const coreentepfCCcliente2 = new ContaPoupança(pjCCcliente1)
console.log(pjCCcliente1)

console.log(coreentepfCCcliente1.dadosCliente)

/* 5.Polimorfismo
    -criar uma classe especializada em transferir
    -essa classe tera apenas um método execute(contaOrigem, contaDestino,valor).
    -Tanto contaOrigem quanto contaDestino precisam ser instancias de ContaBancaria.
    -tanto ContaCorrente quanto ContaPoupanca tem o metodo sacar(), que tem implementações diferentes
    Mas como sabemos contaOrigem e contaDestino possuem o metodo sacar,
    independente se for ContaCorrete ou contaPoupanca podemos chamar este método
*/

class Transferir{
    static execute(contaOrigem, contaDestino, valor){
        if(!contaOrigem.instanceOf(ContaBancaria) ||!contaDestino.instanceOf(ContaBancaria)){
             throw new Error('Ambas as contas precisam herdar de ContaBancaria')
        }
        try{
            contaOrigem.sacar(valor)
            contaDestino.depositar(valor)
        }catch (error){
            console.log('ERRO!!!!: ',error.message)
        }
    }
}