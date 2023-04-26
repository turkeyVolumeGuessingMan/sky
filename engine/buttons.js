
const extractButtons = (str) => {

    const executeAction = (action) => {

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

    const onceButtonAction = (hash, action) => {
        g$[hash] = true
        executeAction(action)
    }

    const getFirstPunc = (s) => {
        const lastPos = s.indexOf('"', 2) - 1
        const firstPos = 1
        return s.substr(firstPos, lastPos)
    }

    const replaceLastComma = (s) => {
        const lastPos = s.length - 1
        if (s[lastPos] === ',') {
            return s.substr(0, lastPos) + '.'
        }
        return s
    }

    const getFirstSentence = (s) => {
        const a = getFirstPunc(s)
        const b = replaceLastComma(a)
        return `“${b}”`
    }


    const getContent = (content, action) => {
        content = content.trim()
        if (content === '') {
            let path = g$.node.split('/')
            const lastElement = path.pop()
            if (action === lastElement) {
                action = 'main'
            }
            path = path.join('/')
            const lbl = (action.indexOf('/') === -1) ? `${path}/${action}` : action
            let [buttons, nextAction] = silentRead(lbl)
            nextAction = nextAction.trim().split('\n')[0]
            if (nextAction.indexOf(`"`) > -1) {
                nextAction = getFirstSentence(nextAction)
            }
            return nextAction
        }
        return content
    }


    const extractOnceAction = (line) => {
        const button = document.createElement('button')
        const [content, action] = line.slice(1).split('@')
        const hash = `${g$.node}-${stringToHash(content)}`
        if (!g$[hash]) {
            button.textContent = getContent(content, action)
            button.onclick = () => onceButtonAction(hash, action);
            return button
        }
        return null
    }

    const extractNormalAction = (line) => {
        const button = document.createElement('button')
        const [content, action] = line.slice(2).split('@')
        button.textContent = getContent(content, action)
        button.onclick = () => executeAction(action)
        return button
    }


    const lines = str.split('\n')
    const buttons = lines.map(line => {
        if (line.indexOf('>>') === 0) {
            return extractNormalAction(line)
        } else if (line.indexOf('>') === 0) {
            return extractOnceAction(line)
        }
        return null
    }).filter(x => x)
    return [buttons, lines.filter(line => line.indexOf('>') !== 0).join('\n')]

}

