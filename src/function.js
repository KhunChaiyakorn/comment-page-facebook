export function random_number(min, max) {
    const number = Math.random() * (max - min) + min;
    return number
}

export async function wait(ms) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(ms) /// waiting 1 second.    
}