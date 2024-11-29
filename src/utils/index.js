
//防抖
export function debounce(func,wait = 1000){
    let timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func,wait)
    }
}