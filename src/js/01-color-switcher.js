const startBtnEl = document.querySelector('button[data-start]')

const stopBtnEl = document.querySelector('button[data-stop]')

const bodyEl = document.querySelector("body")

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


startBtnEl.addEventListener("click", () => {
    colorSwitcherId = setInterval(() => { bodyEl.style.backgroundColor = getRandomHexColor() }, 1000)
    startBtnEl.setAttribute("disabled", "")
    stopBtnEl.removeAttribute("disabled")
})

stopBtnEl.addEventListener("click", () => {
    clearInterval(colorSwitcherId)
    startBtnEl.removeAttribute("disabled")
    stopBtnEl.setAttribute("disabled", "")
})



