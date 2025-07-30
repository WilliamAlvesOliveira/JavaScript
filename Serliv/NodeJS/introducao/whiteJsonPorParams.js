const fs = require('fs').promises;
const path = require('path');

// Função para pegar flags do terminal
function getFlagValue(flag) {
    const index = process.argv.indexOf(flag);
    return index === -1 ? null : process.argv[index + 1];
}

async function main() {
    const filePath = 'dados/users.json';
    const hasNameFlag = process.argv.includes('--name');
    const hasEmailFlag = process.argv.includes('--email');

    try {
        // Tenta ler o arquivo existente ou cria array vazio se não existir
        let dados = await readOrCreateData(filePath);

        if (!hasNameFlag && !hasEmailFlag) {
            // Caso 1: Nenhuma flag foi passada - apenas mostra os dados existentes
            if (dados.length === 0) {
                console.log('Arquivo encontrado mas vazio. Use --name e/ou --email para adicionar dados.');
            } else {
                console.log('Dados atuais:');
                console.log(dados);
            }
            return;
        }

        // Caso 2: Pelo menos uma flag foi passada - adiciona novo registro
        const newUser = {
            name: hasNameFlag ? getFlagValue('--name') : 'não informado',
            email: hasEmailFlag ? getFlagValue('--email') : 'não informado',
        };

        // Validação final dos valores
        if (newUser.name === null) newUser.name = 'não informado';
        if (newUser.email === null) newUser.email = 'não informado';

        dados.push(newUser);
        await saveData(filePath, dados);

        console.log('Novo registro adicionado:');
        console.log(newUser);
        console.log('\nDados completos:');
        console.log(dados);

    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('Arquivo não encontrado. Use --name e/ou --email para criar um novo arquivo.');
        } else {
            console.error('Erro:', err.message);
        }
    }
}

// Funções auxiliares
async function readOrCreateData(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return []; // Retorna array vazio se o arquivo não existir
        }
        throw err;
    }
}

async function saveData(filePath, data) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function generateNextId(dados) {
    return dados.length > 0 ? Math.max(...dados.map(item => item.id)) + 1 : 1;
}

// Executa o programa
main();