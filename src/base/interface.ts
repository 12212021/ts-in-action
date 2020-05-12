interface Someting {
    [index: number]: string,
    length: string,
    version: string
}

let a: Someting = {
    length: '2',
    version: '12.3',
    1: '3',
    3: '5'
}

console.log(a[3]);