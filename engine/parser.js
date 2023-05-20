

function activateParser(inputLabel, keywords) {
    
    // create html input element and add click event callback
    const form = document.createElement("form")
    const input = document.createElement("input")
    const submit = document.createElement("input")
    const div = document.createElement("div")
    form.className = "inputForm"
    form.action = "javascript:void(0)"
    form.onsubmit = event => {
      event.preventDefault()
      execute()
    }
    div.className = "inputLabel"
    div.innerHTML = skylight(inputLabel)
    input.type = "text"
    input.action = "javascript:void(0)"
    input.enterkeyhint = "go"
    input.className = "inputString"
    submit.action = "javascript:void(0)"
    submit.type = "submit"
    submit.className = "submit"
    submit.hidden = true
    submit.onclick = (event) => {
      event.preventDefault()
      execute()
    }
    form.appendChild(div)
    form.appendChild(input)
    form.appendChild(submit)

    const execute = () => {
      const value = input.value.trim()
      const defaultActionCommand = keywords.filter(x => x.indexOf('*') === 0)[0]
      const normalCommands = keywords.filter(x => x.indexOf('*') !== 0).map(fullString => fullString.split('@'))
      const parse = (str) => value.indexOf(str) > -1
      if (value.trim() === '') {
        return
      }
      for (const [cmd, action] of normalCommands) {
        const tokens = cmd.split('|')
        for (const token of tokens) {
          if (parse(token.trim())) {
            console.log(token)
            executeAction(action)
            return
          }
        }
      }
      if (defaultActionCommand) {
        const action = defaultActionCommand.split('@').pop()
        if (action) {
          executeAction(action)
          return
        }
      }
    }
    return form

}

