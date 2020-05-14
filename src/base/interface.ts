//接口主要用来检查一个value是不是符合某一个shape
// 接口就是用来描述shape的，接口可以约束函数、对象、数组等


// 1、约束普通的对象


// 可选属性
interface SquareConfig {
    color?: string,
    width?: number
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSqare = { color: 'red', area: 100 };
    if (config.color) {
        newSqare.color = config.color;
    }
    if (config.width) {
        newSqare.area = config.width * config.width;
    }
    return newSqare;
}
console.log(createSquare({}));


// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 2; 不能给只读属性赋值


// 对象字面量的额外的属性check
// let mySquare = createSquare({ colour: 'red', width: 100 });
let config = { colour: 'red', width: 100 };
// 如果不是对象字面，会绕过额外的属性check
let mySquare1 = createSquare(config);






// 接口约束函数
interface SearchFunc {
    // 该约束一个函数，函数存在一个是string的属性
    // 本质上，函数也是对象，如果有多余的
    (source: string, subString: string): boolean;
    name: string; // 因为函数都有有个name属性
    // yanna: string  //如果有多余的属性的话，采用字面函数很难满足shape约束
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}






// 接口约束可索引类型，一般是数组
// 索引的类型被约束为string、number两种类型
interface StringArray {
    // 索引是number类型，value是string类型
    [index: number]: string
}
let myArray: StringArray = ['bob', 'tom'];


class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string
}

// 因为js在运行时，将索引转化为stiring类型 
// 所以索引是number类型的value的type必须是索引是string类型的value的type的子类型
// 才能够符合ts的类型兼容性规则
/* 
interface NotOk {
    [x: number]: Animal;
    [s: string]: Dog
} 
*/

interface Ok {
    [x: number]: Dog,
    [s: string]: Animal
}