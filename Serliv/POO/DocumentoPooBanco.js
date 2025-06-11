// DOCUMENTAÇÃO DAS CLASSES E EXPLICAÇÃO POR BLOCOS

// ============================================================
// BLOCO 1 - CLASSE ABSTRATA: ContaBancaria
// ------------------------------------------------------------
// Classe base para contas bancárias. Não pode ser instanciada diretamente.
// Define as propriedades comuns e os métodos padrões que serão herdados.

class ContaBancaria {
    constructor(cliente, numero) {
        if (this.constructor === ContaBancaria) throw new Error('ContaBancaria é uma classe abstrata')

        this.cliente = cliente
        this.numero = numero
        this.saldo = 0.00
    }

    get dadosCliente() {
        return `${this.cliente.nome}, ${this.cliente.tipoDocumento}: ${this.cliente.documento}`
    }

    depositar(valor) {
        if (typeof valor === 'number' && valor > 0) {
            this.saldo += valor
        } else {
            throw new Error('Não é possível depositar um valor negativo ou inválido')
        }
    }

    sacar() {
        throw new Error('O método sacar precisa ser implementado nas subclasses')
    }
}


// ============================================================
// BLOCO 2 - CLASSES CONCRETAS: ContaPoupanca e ContaCorrente
// ------------------------------------------------------------
// Herda de ContaBancaria e implementa o método sacar de forma específica

class ContaPoupanca extends ContaBancaria {
    constructor(cliente, numero) {
        super(cliente, numero)
        this.aniversario = Date.now() // Pode ser usado futuramente para aplicar juros
    }

    sacar(valor) {
        if (this.saldo < valor) {
            throw new Error('Saldo insuficiente')
        }
        this.saldo -= valor
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(cliente, numero) {
        super(cliente, numero)
        this.limite = 0.00 // Limite adicional ao saldo para saque
    }

    sacar(valor) {
        if (typeof valor === 'number' && this.saldo + this.limite >= valor) {
            this.saldo -= valor
            if (this.saldo < 0) {
                this.limite += this.saldo // Reduz o limite conforme o saldo entra no negativo
            }
        } else {
            throw new Error('Saldo insuficiente considerando o limite')
        }
    }
}


// ============================================================
// BLOCO 3 - CLASSES DE CLIENTE
// ------------------------------------------------------------
// A classe Cliente é abstrata. PessoaFisica e PessoaJuridica herdam dela.
// Define a composição usada nas contas.

class Cliente {
    constructor(nome, documento, tipoDocumento) {
        if (this.constructor === Cliente) throw new Error('Cliente é uma classe abstrata')

        this.nome = nome
        this.documento = documento
        this.tipoDocumento = tipoDocumento
    }
}

class PessoaFisica extends Cliente {
    constructor(nome, documento) {
        super(nome, documento, 'CPF')
    }
}

class PessoaJuridica extends Cliente {
    constructor(nome, documento) {
        super(nome, documento, 'CNPJ')
    }
}


// ============================================================
// BLOCO 4 - CLASSE TRANSFERIR (POLIMORFISMO)
// ------------------------------------------------------------
// Permite realizar transferência entre qualquer tipo de conta bancária
// desde que herde de ContaBancaria.

class Transferir {
    static execute(contaOrigem, contaDestino, valor) {
        if (!(contaOrigem instanceof ContaBancaria) || !(contaDestino instanceof ContaBancaria)) {
            throw new Error('Ambas as contas precisam herdar de ContaBancaria')
        }
        try {
            contaOrigem.sacar(valor)
            contaDestino.depositar(valor)
        } catch (error) {
            console.log('ERRO!!!!: ', error.message)
        }
    }
}

// ========== FUNCIONÁRIO ==========

// Criando uma pessoa física
const ps1 = new PessoaFisica('William', '123.123.123-12')
console.log(ps1)

// Criando contas bancárias para o funcionário
const contaC1 = new ContaCorrente(ps1, '12345-5')  // Conta corrente
const contaP1 = new ContaPoupanca(ps1, '11111-1')  // Conta poupança
console.log(contaC1)
console.log(contaP1)


// ========== EMPRESA ==========

// Criando uma pessoa jurídica (empresa)
const Empresa1 = new PessoaJuridica('Mercado', '12.123.123/0001-12')
console.log(Empresa1)

// Criando contas bancárias para a empresa
const contaC2 = new ContaCorrente(Empresa1, '12121-1') // Conta corrente
const contaP2 = new ContaPoupanca(Empresa1, '22222-2') // Conta poupança
console.log(contaC2)
console.log(contaP2)


// ========== DEPÓSITOS INICIAIS ==========

// Depositando R$1000 na conta do funcionário e atribuindo limite de crédito
contaC1.depositar(1000.00)
contaC1.limite = 1000.00
console.log('Conta funcionário após depósito:', contaC1)

// Depositando R$100.000 na conta da empresa
contaC2.depositar(100000.00)
console.log('Saldo empresa:', contaC2.saldo)


// ========== PAGAMENTO DA EMPRESA AO FUNCIONÁRIO ==========

// Transferindo R$2600 da empresa para o funcionário
Transferir.execute(contaC2, contaC1, 2600)

console.log('Saldo funcionário após pagamento:', contaC1.saldo)
console.log('Saldo empresa após pagamento:', contaC2.saldo)


// ========== MOVIMENTAÇÃO DO FUNCIONÁRIO ==========

// Funcionário saca R$1000
contaC1.sacar(1000)  // saldo: 2600 → 1600

// Transferência de R$1000 da conta corrente para a poupança do funcionário
Transferir.execute(contaC1, contaP1, 1000) // saldo: 1600 → 600
console.log('Conta Corrente funcionário:', contaC1)
console.log('Conta Poupança funcionário:', contaP1)
