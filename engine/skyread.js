

function renderButtons(buttons) {
    const btns = document.getElementById("btns")
    buttons.map((button) => btns.appendChild(button))
}


function silentRead(x) {

    x = x.toLowerCase()
    const state = g$[`${x}-state`] ?? 'main'
    const hash = stringToHash(`${x}/${state}`)
    let page = ''
    if (g$[hash]) {
        page = g$[hash]
    } else {
        const stateLessHash = stringToHash(x)
        page = g$[stateLessHash]
    }
    page = symbolicNotationCheck(page)
    const [buttons, text] = extractButtons(page)
    return [buttons, text]

}


function skyread(x) {

    x = x.toLowerCase()

    const render = (buttons, text) => {
        const btns = document.getElementById("btns")
        const doc = document.getElementById('page')
        doc.innerHTML = skylight(text)
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
