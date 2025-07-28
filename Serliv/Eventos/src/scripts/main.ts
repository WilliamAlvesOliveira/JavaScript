// Importa o estilo SCSS para ser aplicado à página
import '../styles/estilo.scss'
import { PubSub } from './pubsub'

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

const pubsub = document.getElementById('pubSub') as HTMLElement

function teste(){
  console.log('teste')
}

// PubSub.subscribe('eventTeste', function(data: any){
//   console.log('teste chamado')
//   console.log(data)
// })// fuções anonimas não podem ser removidas

// PubSub.subscribe('eventTeste1',teste)
PubSub.subscribe('eventTeste1',teste)
PubSub.subscribe('eventTeste2',teste)
PubSub.subscribe('eventTeste3',teste)


PubSub.unsubscriber('eventTeste2', teste)// remove a primeira ocorrencia


console.log(PubSub.subscribers)

PubSub.publish('eventTeste', 20)
PubSub.publish('eventTeste', 'Olá, Mundo do pub/sub')
