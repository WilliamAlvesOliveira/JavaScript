;(function(){
    window.addEventListener('scroll', imagePosition)

    const dataParalaxContainer = [...document.querySelectorAll('[data-paralax]')]

    function isGettingOut(container) {
        return container.getBoundingClientRect().top <= 0;
    }

    function getNewPosition(container){
        const velocity = parseFloat(container.getAttribute('data-p-velocity')) || .5
        return container.getBoundingClientRect().top*velocity*-1
    }

    function imagePosition(){
        dataParalaxContainer.forEach(container => {
            let originalPositionY = getComputedStyle(container).backgroundPositionY
            let originalPositionX = getComputedStyle(container).backgroundPositionX

            if(isGettingOut(container)){
                container.style.backgroundPosition = `${originalPositionX} ${getNewPosition(container)}px`
            } else{
                container.style.backgroundPosition = `${originalPositionX} 0px`
            }
        })
    }

    imagePosition()
})()