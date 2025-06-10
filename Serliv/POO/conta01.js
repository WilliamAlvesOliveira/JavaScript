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
            console.log('Saldo insuficiente')
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
