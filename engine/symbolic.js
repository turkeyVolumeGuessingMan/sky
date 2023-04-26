

const symbolicNotationCheck = (str) => {
    
    const nc = /\?\s*\((.*)\)\s*=>\s\{([^<>]*)\}/mg
    
    const performBoolCheck = (condition) => {
        condition = condition.trim()
        if (condition.indexOf('!') > -1) {
            condition = condition.replace('!')
            const hash = stringToHash(condition)
            return !(g$[hash])
        } else {
            const hash = stringToHash(condition)
            return (g$[hash])
        }
    }
    
    const parseCondition = (condition) => {
        return performBoolCheck(condition)
    }
    
    const scan = () => {
        
        let matches = [...str.matchAll(nc)]
        while (matches.length > 0) {
            const match = matches[0]
            const [content, condition, block] = match
            const index = match.index
            str = str.replace(content, '')
            if (parseCondition(condition)) {
                str = str.slice(0, index) + block + str.slice(index, str.length)
            }
            matches = [...str.matchAll(nc)]
        }

        str = punchText(str)
        str = incrementPrintScan(str)
        
        const lines = str.split(/\r?\n/)
        str = lines.map(line => {
            if (line[0] === '#') {
                let b = true
                let v = line.trim()
                v = v.replace('#', '')
                if (v.indexOf("!") > -1) {
                    b = false
                    v = v.replace("!", "")
                }
                const hash = stringToHash(v)
                g$[hash] = b;
                return ''
            } else if (line[0] === '$') {
                let v = line.trim()
                v = v.replace('$', '')
                v = v.split('/')
                const state = v.pop()
                const dir = `${v.join('/')}-state`.toLowerCase()
                g$[dir] = state
                return ''
            }
            return line
        }).join('\n').trim()
        
    }
    
    scan()
    
    return str
    
}

