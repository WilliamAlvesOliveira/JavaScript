let num = [5,8,2,9,3]

console.log(`nosso vetor é ${num}`)

console.log(num.length)
console.log(num.sort())

num.push(1)
console.log(num)

console.log(num[2])

cont = 0
while(cont < num.length){
    console.log(num[cont])
    cont++
}

for(let c=0;c<num.length;c++){
    console.log(num[c])
}