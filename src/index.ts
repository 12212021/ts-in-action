// import './base/datatype.ts';
import './base/func.ts'

let hello: string = 'hello typescript';
let app = document.querySelector('#app');
if (app) {
    app.innerHTML = hello;
}