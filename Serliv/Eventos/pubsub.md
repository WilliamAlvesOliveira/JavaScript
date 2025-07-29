
# 🧩 Pub/Sub (Publish/Subscribe) Design Pattern

## 📖 O que é?

O padrão **Pub/Sub** (Publicador/Assinante), ou **Publish/Subscribe**, é um **padrão de design comportamental** que define uma forma de comunicação **assíncrona e desacoplada** entre componentes.

No Pub/Sub:

- **Publicadores (publishers)** emitem (publicam) eventos.
- **Assinantes (subscribers)** se inscrevem para escutar determinados eventos.
- Um **canal de comunicação** (ou broker) gerencia os eventos e repassa os dados aos assinantes.

## 🧪 Como funciona?

1. Um componente se inscreve em um evento através do método `subscribe(eventName, callback)`.
2. Outro componente publica esse evento através de `publish(eventName, data)`.
3. Todos os assinantes desse evento são notificados com os dados fornecidos.
4. É possível também remover a inscrição usando `unsubscribe(eventName, callback)`.

## ✅ Vantagens

- **Desacoplamento:** os emissores e ouvintes não precisam conhecer uns aos outros.
- **Flexibilidade:** novos assinantes podem ser adicionados sem alterar o código do publicador.
- **Escalabilidade:** facilita a adição de funcionalidades de forma modular.
- **Reutilização:** os componentes ficam mais genéricos e reutilizáveis.

## ❌ Desvantagens

- **Depuração mais difícil:** como os componentes não estão diretamente conectados, pode ser difícil rastrear a origem dos eventos.
- **Gerenciamento de memória:** assinantes não removidos corretamente podem gerar vazamentos de memória.
- **Ordem de execução:** não há garantia de ordem entre os assinantes (a menos que seja implementado manualmente).

## 🧠 Quando usar?

- Quando você deseja comunicação entre partes da aplicação que não devem depender umas das outras.
- Ideal em sistemas com **eventos assíncronos**, como interfaces gráficas, jogos, sistemas de mensagens e notificações.
- Muito comum em frameworks e bibliotecas JavaScript, como Vue.js, React (via context/event bus), e sistemas baseados em eventos como o Node.js.

## 📌 Exemplo simples

```ts
PubSub.subscribe('userLoggedIn', (data) => {
  console.log('Usuário logado:', data)
})

PubSub.publish('userLoggedIn', { name: 'João', id: 123 })
```

## 🛠️ Implementação básica

A implementação apresentada usa um objeto estático que mantém os assinantes organizados por nome de evento. Quando `publish` é chamado, todos os callbacks daquele evento são executados com os dados passados.

## 🧭 Conclusão

O padrão **Pub/Sub** é uma poderosa ferramenta para tornar sistemas mais modulares, escaláveis e desacoplados. Porém, como qualquer padrão, deve ser usado com cuidado, especialmente em projetos muito grandes onde o controle dos eventos pode se tornar complexo.

---

🔗 Ideal para: notificações, atualizações em tempo real, comunicação entre módulos, sistemas reativos, etc.
