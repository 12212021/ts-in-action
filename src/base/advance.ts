// 类型推断

// 基础类型的推断
let a; // a会被推断为any类型
let adb = 1;
let stringc = '12';
// 会被推断为(number | null)[]，关闭strictNullChecks会被推断为number[]类型，number类型兼容null类型
let array = [1, null];
// 对象会自动被推断为其具体接口的实现，所以不能赋值
let objAd = {
    a: 1,
    b: 'stringc'
}
objAd = 2;

// 函数类型的推断
// 参数a直接被推断为可选number，返回值会被推断为void
function testAd(a = 2) {

}







// 类型兼容性
// core rule：x兼容y，如果y含有所有的x属性（属性值少的兼容属性值多的）
interface Named {
    name: string
}
let x1: Named;
let y1 = { name: 'ychi', location: 'beijing' };
x1 = y;

// 函数兼容性
// 1）函数的参数个数需要兼容
// 参数多的能够兼容参数少的
// handler1中y参数可以不用，加入handler1可以赋值给handler2类型，handler2并没有声明y参数，handler1使用y参数会报错
// 这在类型中是不兼容的
let handler1 = (x: number, y: number) => { }
let handler2 = (x: number) => { }
handler1 = handler2;
// handler2 = handler1;

// 可选参数可以认为该参数不存在，仍然符合函数参数少的兼容参数多的原则
let handler3 = (x: number, y?: number) => { }
// 剩余参数可以认为所有的参数都不存在，符合函数参数少的兼容参数多的
let handler4 = (...rest: number[]) => { }

// handler3 = handler1
handler1 = handler3
handler4 = handler1
handler4 = handler2
handler4 = handler3

// 2）函数的参数类型需要兼容
// 可以将接口的成员个数视为函数参数的个数来判断函数的兼容性，仍然符合函数参数多的兼容参数少的原则
type Point3D = {
    x: number,
    y: number,
    z: number
}
type Point2D = {
    x: number,
    y: number
}
let handler5 = (p: Point2D) => { }
let handler6 = (p: Point3D) => { }

handler5 = handler6
handler6 = handler5;

// 3）函数的返回值需要兼容
// 返回值属性值少的的兼容返回值属性值多的
let handler7 = (): Point2D => ({ x: 1, y: 2 });
let handler8 = (): Point3D => ({ x: 2, y: 3, z: 4 });

handler7 = handler8;
handler8 = handler7;







// 类型保护机制
class Java {
    helloJava() {
        console.log('java');
    }
    java = 'java'
}

class JavaScript {
    helloJavaScript() {
        console.log('javaScript');
    }
    javaScript = 'javaScript'
}


function getLang(type: string): JavaScript | Java {
    let lang = type === 'java' ? new Java() : new JavaScript();
    // 要调用一下对象的方法，如果是java，调用helloJava否则helloJavaScript

    // 1）利用instanceof
    if (lang instanceof Java) {
        // 在这个代码块lang是Java类型
        lang.helloJava();
    }
    else {
        lang.helloJavaScript();
    }

    // 2)利用in判断属性是否存在于改对象
    if ('java' in lang) {
        lang.helloJava();
    }
    else {
        lang.helloJavaScript();
    }

    // 3) 利用typeof操作符来判断原始数据类型
    let num: string | number = '2';
    if (typeof num === 'number') {
        num.toFixed();
    }
    else {
        num.toString();
    }

    return lang;
}

// 自定义的类型断言机制
interface Fish {
    swim(): any;
    layEggs(): any;
}

interface Bird {
    fly(): any;
    layEggs(): any;
}

function getSmallPet(): Fish | Bird {
    let pet: any = {
        layEggs() { }
    }
    if (Math.random() < 0.5) {
        (pet as Fish).swim = () => { };
    }
    else {
        (pet as Bird).fly = () => { };
    }
    return pet;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function testTypeGuard() {
    let pet = getSmallPet();
    if (isFish(pet)) {
        pet.swim();
    }
    else {
        pet.fly();
    }
}