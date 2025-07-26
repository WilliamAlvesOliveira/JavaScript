export interface Card{
    id: string,
    description: string,
    img: string
}

const uniqueCards: Card[] = [
    {img: '01.png', description: 'card1', id:'card1'},
    {img: '02.jpg', description: 'card2', id:'card2 '},
    {img: '03.jpg ',description: 'card3', id:'card3'},
    {img: '04.png', description: 'card4', id:'card4'},
    {img: '05.png' ,description: 'card5', id:'card5'},
    {img: '06.jpg', description: 'card6', id:'card6'},
    {img: '07.jpg', description: 'card7', id:'card7'},
    {img: '08.jpg', description: 'card8', id:'card8'}
]

const cardsOriginais: Card[] = []

function shuffleNumber(min: number, max: number){
    const n = Math.random() * (max - min + 1) + min
    return parseInt(n.toString())
}

uniqueCards.forEach((card) => {
    cardsOriginais.push( {...card} )
    cardsOriginais.push( {...card} )
})

const cards: Card[] = []

const len = cardsOriginais.length

while(cards.length < len){
    let shuffled = shuffleNumber(0, cardsOriginais.length - 1)
    const item = cardsOriginais.splice(shuffled, 1)
    cards.push(item[0])
}


export {cards}

