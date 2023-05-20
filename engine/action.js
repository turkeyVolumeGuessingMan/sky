
// execute action found in button or input.
function executeAction(action) {
    const btns = document.getElementById("btns")
    btns.innerHTML = ''
    action = action.trim()
    action = action.toLowerCase()
    const address = g$.node.split('/')
    if (address) {
        address.pop()
        address.push(action)
        const hash = stringToHash(address.join('/'))
        if (g$[hash]) {
            skyread(address.join('/'))
        } else {
            skyread(action)
        }
    }
}
