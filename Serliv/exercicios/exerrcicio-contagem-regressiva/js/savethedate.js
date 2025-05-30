;(function () {
    const DOMDayTarget = document.querySelector('h1 span').innerText

    const eventDate = getDate(DOMDayTarget)
    console.log(eventDate)

    const today = new Date()
    console.log(today) 

    const timeLeft = eventDate.getTime() - today.getTime()

    const totalSeconds = parseInt(timeLeft / 1000)
    const seconds = totalSeconds % 60

    const totalMinutes = parseInt(totalSeconds / 60)
    const minutes = totalMinutes % 60

    const totalHours = parseInt(totalMinutes / 60)
    const hours = totalHours % 24

    const days = parseInt(totalHours / 24)

    addLeftTime(days,hours, minutes,seconds)

    function addLeftTime(d,h,m,s){
        const paragraph = document.createElement('p')
        paragraph.textContent = `'faltam ${d} dias, ${h} horas, ${m} minutos, ${s} segundos`
        document.querySelector('.hero-content').appendChild(paragraph)
    }
  

    function getDate(string){
        const [gettedDate, gettedHour] = string.split(' ')

        const [gettedDay, gettedMouth, gettedYear] = gettedDate.split('/')

        const [gettedHourValue, gettedHourMinutes] = gettedHour.split('H')
        return new Date(gettedYear,gettedMouth -1, gettedDay, gettedHourValue, gettedHourMinutes)
    }

})()