let menuShown = false

const toggleMenu = () => {
  if (!menuShown) {
    const menuDiv = document.createElement("div")
    menuDiv.className = "menu"
    const innerMenu = document.createElement("div")
    innerMenu.style = `
      max-width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    `
    let m = []
    if (g$.map) {
      m = g$.map.sort().filter(x => g$[x]?.location !== g$.currentLocationName)
      m.map((id) => {
        if (g$[id].location) {
          const btn = document.createElement("button")
          btn.innerText = g$[id].name
          btn.style = "width: 80vw;"
          btn.onclick = () => {
            const outMenu = document.createElement("div")
            outMenu.className = "outMenu"
            outMenu.innerHTML = menuDiv.innerHTML
            menuShown = false
            menuDiv.remove()
            clearScreen()
            createPage()
            go(g$[id].location)()
            document.body.appendChild(outMenu)
            setTimeout(() => {
              outMenu.remove()
            }, 400)
          }
          innerMenu.appendChild(btn)
        }
      })
    }
    const closeButton = document.createElement("button")
    closeButton.style =
      "aspect-ratio: 1; font-size: 32pt; font-weight: bold; width: 64px; height: 64px;"
    closeButton.innerText = "⤒"
    closeButton.onclick = () => {
      menuShown = false
      menuDiv.remove()
      const outMenu = document.createElement("div")
      outMenu.className = "outMenu"
      outMenu.innerHTML = menuDiv.innerHTML
      document.body.appendChild(outMenu)
      setTimeout(() => {
        outMenu.remove()
      }, 400)
    }
    if (m.length > 0) {
      innerMenu.appendChild(closeButton)
      menuDiv.appendChild(innerMenu)
      document.body.appendChild(menuDiv)
    }
  }
}

const createMenu = () => {
  const topBar = document.createElement("div")
  topBar.className = "topBar"
  topBar.onclick = toggleMenu
  document.body.appendChild(topBar)
}
