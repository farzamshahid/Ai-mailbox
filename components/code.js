import React from 'react'

const Code = () => {
    let codeOfEmail = `<form>
        <input type="email" placeholder="Enter your email">
        <button type="submit" onclick="handleEmail">send</button>
    </form>`
    return (
        <div dangerouslySetInnerHTML={{ __html: codeOfEmail }}></div>
    )
}

export default Code