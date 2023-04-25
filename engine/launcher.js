

const resetGame = () => {
  g$ = { ...Game }
  skyread('start')
}

window.addEventListener("load", () => {
  //createMenu()
  //createPage()
  resetGame()
})
