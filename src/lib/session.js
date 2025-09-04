

export function saveSession() {
    const expiryTime = Date.now() + 60 * 60 * 1000
    localStorage.setItem(
        "session",
        JSON.stringify({expiry: expiryTime })
    )
}


export function removeSession() {
    const sessionStr = localStorage.getItem("session")

    if(!sessionStr) return null

    const { expiry } = JSON.parse(sessionStr)

    if(Date.now() > expiry) {
        localStorage.removeItem("session")
        return null
    }
    return true
}