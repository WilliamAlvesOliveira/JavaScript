const delay = (ms)=>{
    const startTime = new Date().getTime()
    while(new Date().getTime() - startTime <= ms){
        //bloqueia o restante do código por 10 seh
    }
}


this.addEventListener("message", function(e){
    console.log(e)
    console.log(e.data)
    delay(10000)
    self.postMessage("processo demorado finalizado!")
})