let isAnimating = false;
let pullDeltaX = 0; //distancia que la card se esta arrastrando
const DECISION_THRESHOLD = 75;


function startDrag (e) {
    if(isAnimating) return

    //get the first article element
    const actualCard = e.target.closest('article');

    //get initial position of mouse or finger
    const startX = e.pageX ?? e.touches[0].pageX;

    //listen the mouse and touch movenets
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    document.addEventListener('touchmove', onMove, {passive: true});
    document.addEventListener('touchend', onEnd ,{passive: true});

    function onMove (e) {
        //current position of mouse or finger
        const currentX = e.pageX ?? e.touches[0].pageX;
    
        //the distance between the initial and current position
        pullDeltaX = currentX - startX;

        //no hay distancia recorrida
        if(pullDeltaX === 0) return
        
        //change the flag to indicate we are animating
        isAnimating = true

        //calculate the rotation of the card using the distance 
        const deg = pullDeltaX / 14;

        //apply the transformation on the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;

        //change the cursor to grabbing
        actualCard.style.cursor = 'grabbing'

        //change opacity of the choise info
        const opacity = Math.abs(pullDeltaX) / 100;

        const isRight = pullDeltaX >= 0;
        const choiseEl = isRight
            ? actualCard.querySelector('.choise.like')
            : actualCard.querySelector('.choise.nope')
        
        choiseEl.style.opacity = opacity
    };
    
    function onEnd (e) {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)
    
        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)

        //saber si el usuario tomo una decision
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

        if(decisionMade){
            const goRight = pullDeltaX >= 0
            const goLeft = !goRight;
            
            //add class acording to the decision
            actualCard.classList.add(goRight ? 'go-right' : 'go-left')
            actualCard.addEventListener('transitionend', () => {
                actualCard.remove();
            })
        }else{
            actualCard.classList.add('reset');
            actualCard.classList.remove('go-right' , 'go-left')
            
        }

        //reset the variables
        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')
            pullDeltaX = 0;
            isAnimating = false;
        })
    };
};


document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {passive: true});