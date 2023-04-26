

const punchText = (str) => {
    
    const loadTag = (tag) => {
        tag = tag.trim()
        tag = tag.toLowerCase()
        const address = g$.node.split('/')
        if (address) {
            address.pop()
            address.push(tag)
            const hash = stringToHash(address.join('/'))
            if (g$[hash]) {
                let [buttons, text] = silentRead(address.join('/'))
                renderButtons(buttons)
                return text
            } else {
                let [buttons, text] = silentRead(tag)
                renderButtons(buttons)
                return text
            }
        }
    }
    
    const re = /\{\{(.*)\}\}/gm
    const matches = [...str.matchAll(re)]
    matches.map(match => {
        let [content, tag] = match
        const tagContent = loadTag(tag)
        str = str.replace(content, tagContent)
    })
    
    return str
}

