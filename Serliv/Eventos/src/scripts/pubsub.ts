// Define o tipo de função (callback) que será usado pelos eventos
// Essa função pode receber um objeto `Output` opcional como parâmetro
type Callback = (data?: Output) => void

// Define o formato dos dados que serão enviados quando um evento for publicado
export type Output = {
  data: any        // Conteúdo genérico que será passado no evento
  type: string     // Nome do evento que está sendo publicado
}

// Define o tipo `Subscribers` como um objeto que mapeia nomes de eventos (strings)
// para arrays de funções que serão chamadas quando o evento for publicado
type Subscribers = {
  [P in string]: Callback[]
}

// Classe que implementa o padrão de projeto "Publish/Subscribe" (Pub/Sub)
export class PubSub {
  // Objeto estático que armazena os assinantes de todos os eventos registrados
  static subscribers: Subscribers = {}

  // Método para se inscrever (subscribe) a um evento
  static subscribe(eventName: string, fn: Callback) {
    // Se o evento ainda não existir na lista de assinantes, inicializa com array vazio
    PubSub.subscribers[eventName] = PubSub.subscribers[eventName] || []

    // Adiciona a função (callback) à lista de assinantes do evento
    PubSub.subscribers[eventName].push(fn)
  }

  // Método para publicar (emitir) um evento
  static publish(eventName: string, data: any) {
    // Verifica se há funções assinadas ao evento
    if (PubSub.subscribers[eventName]) {
      // Para cada função assinante, cria um objeto `Output` e passa como argumento
      PubSub.subscribers[eventName].forEach((fn: Callback) => {
        const output: Output = { data, type: eventName }
        fn(output) // Executa a função assinante com os dados
      })
    }
  }

  // Método para remover (desinscrever) uma função de um evento
  static unsubscriber(eventName: string, fn: Callback) {
    // Verifica se o evento tem assinantes registrados
    if (PubSub.subscribers[eventName]) {
      // Procura o índice da função que queremos remover
      const index = PubSub.subscribers[eventName].findIndex((el: Function) => el === fn)

      // Se encontrada, remove a função da lista
      if (index > -1) {
        PubSub.subscribers[eventName].splice(index, 1)

        // Se não restarem mais assinantes para esse evento, remove o evento do objeto
        if (PubSub.subscribers[eventName].length === 0) {
          delete PubSub.subscribers[eventName]
        }
      }
    }
  }
}
