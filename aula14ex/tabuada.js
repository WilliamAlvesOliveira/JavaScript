function tabuada(){
    let n = Number(document.querySelector('input#numero').value)
    res = document.querySelector("#resultado")
    c = 0
    res.innerHTML = ' '
    while (c <= 10){
        res.innerHTML += `<br> ${n} x  ${c} = ${n * c}`
        c++
    }
}