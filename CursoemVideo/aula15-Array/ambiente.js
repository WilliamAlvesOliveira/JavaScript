let num = [5,8,2,9,3]

console.log(`nosso vetor é ${num}`)

console.log(num.length)
console.log(num.sort())

num.push(1)//adiciona um número
console.log(num)

console.log(num[2])//exibe o número que tem o key '2'

cont = 0
while(cont < num.length){ //exibe o vetor item por item com while
    console.log(num[cont])
    cont++
}

for(let c=0;c<num.length;c++){ //exibe vetor item por item com for
    console.log(num[c])
}