function onEnd(event) {
  // remove the event listeners
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseup', onEnd)

  document.removeEventListener('touchmove', onMove)
  document.removeEventListener('touchend', onEnd)

  // saber si el usuario tomo una decisión
  const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

  if (decisionMade) {
    const goRight = pullDeltaX >= 0

    // add class according to the decision
    actualCard.classList.add(goRight ? 'go-right' : 'go-left')
    actualCard.addEventListener('transitionend', () => {
      actualCard.remove()
    })
  } else {
    actualCard.classList.add('reset')
    actualCard.classList.remove('go-right', 'go-left')

    actualCard.querySelectorAll('.choice').forEach(choice => {
      choice.style.opacity = 0
    })
  }

  // reset the variables
  actualCard.addEventListener('transitionend', () => {
    actualCard.removeAttribute('style')
    actualCard.classList.remove('reset')

    pullDeltaX = 0
    isAnimating = false
  })

  // reset the choice info opacity
  actualCard
    .querySelectorAll(".choice")
    .forEach((el) => (el.style.opacity = 0));
}


document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, { passive: true })
