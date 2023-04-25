
function skyread(x) {

    x = x.toLowerCase()

    const render = (buttons, text) => {
        const doc = document.getElementById('page')
        const btns = document.getElementById('btns')
        doc.innerHTML = skylight(text)
        btns.innerHTML = ''
        buttons.map((button) => btns.appendChild(button))
    }
    
    const state = g$[`${x}-state`] ?? 'main'
    const hash = stringToHash(`${x}/${state}`)
    let page = ''
    g$.base = x
    if (g$[hash]) {
        g$.node = `${x}/${state}`
        page = g$[hash]
    } else {
        const stateLessHash = stringToHash(x)
        g$.node = x
        page = g$[stateLessHash]
    }
    page = symbolicNotationCheck(page)
    const [buttons, text] = extractButtons(page)
    render(buttons, text);
    
}
