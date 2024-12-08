// Throttle function to limit the rate at which a function is invoked
export const throttle = (func, limit, cookieKey) => {
    let lastFunc
    let lastRan
    return function (...args) {
        const context = this
        const now = Date.now()

        // Clear the cookies if the function was throttled
        if (lastRan && now - lastRan < limit) {
            // You can clear cookies or refresh them here
            Cookies.remove(cookieKey) // Remove the cookie
            console.log(`${cookieKey} cookie cleared due to throttling.`)

            // Optional: Refresh cookie or session data
            Cookies.set(cookieKey, 'new-session', {
                expires: 365,
                secure: true,
                sameSite: 'Strict',
            })
            console.log(`Refreshed ${cookieKey} cookie.`)
        }

        if (!lastRan || now - lastRan >= limit) {
            func.apply(context, args)
            lastRan = now
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(
                () => {
                    if (now - lastRan >= limit) {
                        func.apply(context, args)
                        lastRan = now
                    }
                },
                limit - (now - lastRan),
            )
        }
    }
}

// Debounce function to delay invoking a function after the last event
export const debounce = (func, delay) => {
    let timer
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, args), delay)
    }
}
