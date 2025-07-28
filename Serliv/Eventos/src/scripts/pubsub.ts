export class PubSub{
   static subscribers: Record<string, Function[]> = {}


   static subscribe(eventName: string, fn: Function){
        PubSub.subscribers[eventName] = PubSub.subscribers[eventName] || []
        PubSub.subscribers[eventName].push(fn)
   }

   static publish(eventName: string, data: any){ 
    if(PubSub.subscribers[eventName]){
        PubSub.subscribers[eventName].forEach((fn: Function) => {
            fn(data)
        })
    }
   }

   static unsubscriber(eventName: string, fn: Function){
        if(PubSub.subscribers[eventName]){
            const index = PubSub.subscribers[eventName].findIndex((el: Function) => el === fn)
            console.log(index)
            if(index > -1){
                PubSub.subscribers[eventName].splice(index,1)
            }
        }
   }
}