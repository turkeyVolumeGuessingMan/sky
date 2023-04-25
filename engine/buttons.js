
const extractButtons = (str) => {

    const executeAction = (action) => {

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

    const extractLine = (line) => {
        const button = document.createElement('button')
        const [content, action] = line.replace('>', '').split('@')
        button.textContent = content.trim()
        button.onclick = () => executeAction(action)
        return button
    }

    const lines = str.split('\n')
    const buttons = lines.map(line => {
        if (line[0] === '>') {
            return extractLine(line)
        }
        return null
    }).filter(x => x)
    return [buttons, lines.filter(line => line[0] !== '>').join('\n')]

}

