

const incrementPrintScan = (str) => {

    const ps = /\(.*\)/gm
    const matches = [...str.matchAll(ps)]
    matches.map(match => {
        const [content] = match
        if (content.indexOf('|') > -1) {
            const arr = content.slice(1, -1).split('|')
            const hash = stringToHash(`${g$.node}-${arr[0]}`)
            const index = g$[hash] ?? 0
            const s = arr[index]
            if (index === 0) {
                g$[hash] = 1
            } else if (index < arr.length - 1) {
                g$[hash] += 1
            }
            str = str.replace(content, s)
        }
    })
    return str

}

