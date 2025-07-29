// Importa o estilo SCSS para ser aplicado à página
import '../styles/estilo.scss'
import { PubSub } from './pubsub'
import type { Output } from './pubsub'

// Seleciona os elementos do DOM com os IDs indicados e faz type assertion para HTMLElement
const testeEvent1 = document.querySelector('#testEvent') as HTMLElement
const testeEvent2 = document.querySelector('#testEvent2') as HTMLElement
const testeEvent3 = document.querySelector('#testEvent3') // neste caso o tipo pode ser HTMLElement | null

// Define um tipo personalizado para uma função de evento com contexto específico (HTMLElement ou Document)
// Isso permite que possamos usar `this` de forma tipada dentro da função de evento
type EventFire = (this: HTMLElement | Document, e: MouseEvent) => void

// Função principal de tratamento de eventos
const eventFire: EventFire = function (evnt: MouseEvent) {
  console.log('event fired') // Dispara toda vez que o evento ocorre
  console.log(evnt)          // Mostra o objeto do evento
  console.log(this)          // Mostra o elemento onde o evento foi disparado

  // Recupera o elemento que originou o evento e busca a tag <span> dentro dele
  const currentTarget = evnt.currentTarget as HTMLElement
  const cont = this.querySelector('span') as HTMLSpanElement

  // Converte o texto da <span> para número e incrementa
  const n = parseInt(cont.innerText || '0')
  cont.textContent = (n + 1).toString()

  // Condição para não disparar eventos customizados se o `this` for o segundo elemento ou o `document`
  if (this !== testeEvent2 && this !== document) {
    // Cria e dispara um evento customizado simples
    const event = new Event('customclick')
    testeEvent2?.dispatchEvent(event)

    // Cria e dispara um evento customizado com dados adicionais no `detail`
    const event2 = new CustomEvent('customClick2', { detail: n + 1 })
    testeEvent3?.dispatchEvent(event2)
  }
}

// Adiciona ouvinte de evento "click" no primeiro elemento e usa a função `eventFire`
testeEvent1.addEventListener("click", eventFire)

// O segundo elemento escuta o evento customizado 'customclick' e usa a mesma função
testeEvent2.addEventListener('customclick', eventFire as EventListener)

// O segundo elemento também escuta cliques normais e apenas faz um log
testeEvent2.addEventListener('click', function (e) {
  console.log(e)
})

// O terceiro elemento escuta o evento customizado com dados e imprime o evento no console
testeEvent3?.addEventListener('customClick2', function (e) {
  console.log(e)
})

// O `document` inteiro escuta cliques e também executa a função `eventFire`
document.addEventListener('click', eventFire)

/*=========================================================
                  PUB/SUB DESIGN PATTERN
=========================================================*/

// Seleciona o elemento do DOM que exibirá os dados do evento publicado
const pubsub = document.getElementById('pubSub') as HTMLElement

// Função que será chamada como callback quando um evento for publicado
function teste(data?: Output){
  console.log('teste')     // Log simples indicando que a função foi chamada
  console.log(data)        // Mostra os dados recebidos na publicação
}

// Inscreve a função `teste` no evento 'eventTeste1'
// Essa função será chamada toda vez que 'eventTeste1' for publicado
PubSub.subscribe('eventTeste1', teste)

// Inscreve novamente a função `teste`, mas agora no evento 'eventTeste2'
PubSub.subscribe('eventTeste2', teste)

// Inscreve uma função anônima para escutar o evento 'eventTeste3'
// Essa função anônima atualiza o conteúdo da `<div id="pubSub">` com os dados recebidos
PubSub.subscribe('eventTeste3', data => {
  console.log(data?.data, data?.type)
  pubsub.textContent = `Data: ${data?.data} - type: ${data?.type}`
})

// Remove a função `teste` associada ao evento 'eventTeste1'
// Isso significa que, se 'eventTeste1' for publicado agora, nada acontecerá
// Importante: apenas funções nomeadas podem ser removidas — funções anônimas não podem
PubSub.unsubscriber('eventTeste1', teste)

// Exibe no console todos os eventos registrados e suas respectivas funções
console.log(PubSub.subscribers)

// Após 3 segundos, publica o evento 'eventTeste3' com uma string como dado
// Isso irá acionar a função anônima inscrita anteriormente e atualizar o conteúdo da div
setTimeout(() => {
  PubSub.publish('eventTeste3', 'publish com timeout')
}, 3000)

// Publica o evento 'eventTeste' com o dado 20
// Como nenhuma função está inscrita nesse evento atualmente, nada acontece
PubSub.publish('eventTeste', 20)

// Publica o evento 'eventTeste' novamente, agora com uma string
// Ainda assim, nenhum callback foi registrado para esse evento, então nada é executado
PubSub.publish('eventTeste', 'Olá, Mundo do pub/sub')
