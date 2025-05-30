;(function () {
    const DOMDayTarget = document.querySelector('h1 span').innerText
    
    const eventDate = getDate(DOMDayTarget)
    console.log(eventDate)
    
    const paragraph = document.createElement('p')
    document.querySelector('.hero-content').appendChild(paragraph)

    setInterval(function(){
        const today = new Date()

        const timeLeft = eventDate.getTime() - today.getTime()

        const totalSeconds = Math.floor(timeLeft / 1000)
        const seconds = totalSeconds % 60

        const totalMinutes = Math.floor(totalSeconds / 60)
        const minutes = totalMinutes % 60

        const totalHours = Math.floor(totalMinutes / 60)
        const hours = totalHours % 24

        const days = Math.floor(totalHours / 24)
        
        addLeftTime(days,hours, minutes,seconds)
    },1000)

    function addLeftTime(d,h,m,s){
        paragraph.textContent = `'faltam ${d} dias, ${h} horas, ${m} minutos, ${s} segundos`
    }
  

    function getDate(string){
        const [gettedDate, gettedHour] = string.split(' ')

        const [gettedDay, gettedMonth, gettedYear] = gettedDate.split('/')

        const [gettedHourValue, gettedHourMinutes] = gettedHour.split('H')
        return new Date(gettedYear,gettedMonth -1, gettedDay, gettedHourValue, gettedHourMinutes)
    }
    
})()