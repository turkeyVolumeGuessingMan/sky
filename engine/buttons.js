
/**
 * 
 * Extract buttons from text content. This will remove the button creation commands and 
 * perform the work of creating the buttons which are ready to be put into the onscreen
 * buttons field.
 * 
 * @param {*} str 
 * @returns An array containing first the buttons as html elements, and the text content with buttons removed.
 */
const extractButtons = (str) => {


    // create executable button that will appear only once.
    const onceButtonAction = (hash, action) => {
        g$[hash] = true
        executeAction(action)
    }

    // get the first punctuation mark of text content.
    const getFirstPunc = (s) => {
        const lastPos = s.indexOf('"', 2) - 1
        const firstPos = 1
        return s.substr(firstPos, lastPos)
    }

    // if the sentence (inside a quote) ends in a comma,
    // replace the comma with a period
    const replaceLastComma = (s) => {
        const lastPos = s.length - 1
        if (s[lastPos] === ',') {
            return s.substr(0, lastPos) + '.'
        }
        return s
    }

    // extract the first sentence of content
    const getFirstSentence = (s) => {
        const a = getFirstPunc(s)
        const b = replaceLastComma(a)
        return `“${b}”`
    }


    // tool used by the extract functions below to prepare the content to be displayed 
    // once the action is executed
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


    // private function to extract the one-time action command, >
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

    // private function to extract the standard action command,  >>
    const extractNormalAction = (line) => {
        const button = document.createElement('button')
        const [content, action] = line.slice(2).split('@')
        button.textContent = getContent(content, action)
        button.onclick = () => executeAction(action)
        return button
    }

    const extractParser = (line) => {
        const splitLine = line.split(' ---- ')
        const keywords = splitLine.pop().trim().split('///').filter(x => x)
        const exampleLine = splitLine.pop() ?? 'Type input here:'
        return activateParser(exampleLine.substr(1).trim(), keywords)
    }

    const lineFilter = (line) => {
        if (line.indexOf('>') === 0) {
            return false
        } else if (line.indexOf('_') === 0) {
            return false
        }
        return true
    }

    const getBlocks = (s) => {
        const lines = s.split('\n')
        let insideBlock = -1
        for (let i = 0; i < lines.length; i += 1) {
            const line = lines[i]
            const nextLine = lines[i] ?? ''
            if (line.indexOf('_') > -1 && insideBlock === -1) {
                insideBlock = i
                lines[i] += ' ---- '
            } else if (line === '\n' && nextLine === '\n') {
                insideBlock = -1
            } else if (insideBlock > -1) {
                lines[insideBlock] += lines[i] + '///'
                lines[i] = ''
            }
        }
        return lines.join('\n')
    }


    // final stage - step through file line by line and extract actions,
    // which will in turn be displayed on screen at next refresh
    str = getBlocks(str)
    const lines = str.split('\n')
    const buttons = lines.map(line => {
        if (line.indexOf('>>') === 0) {
            return extractNormalAction(line)
        } else if (line.indexOf('>') === 0) {
            return extractOnceAction(line)
        } else if (line.indexOf('_') === 0) {
            return extractParser(line)
        }
        return null
    }).filter(x => x)
    return [buttons, lines.filter(lineFilter).join('\n')]

}

