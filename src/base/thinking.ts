// 将类型当做集合来思考问题
type A = 'A';   // 单值集合 { 'A' }
type B = 'B';   // 单值集合 { 'B' }
type AorB = A | B;    // 集合的并集 { 'A', 'B' }
type TwoInt = 2 | 4 | 5;
type ThreeInt = 3 | 6 | 9;
type TwoIntersectionThreeInt = TwoInt & ThreeInt;
type TwoUnionThreeInt = 2 | 3 | 4 | 6;
// keyof(A & B) = (keyof A) | (keyof B)
// keyof(A | B) = (keyof A) & (keyof B)



/* 
类型术语和集合术语对照表
Typescript术语                              集合术语
never    *******************************    空集
literal type    ************************    单值集合
value可赋值给T    ***********************    value ∈ T
T1 assignable to T2    *****************    T1是T2的子集
T1 extends T2    ***********************    T1是T2的子集
T1 & T2    *****************************    T1 和T2的交集
unknown    *****************************    全集
*/




// 签名本质上是一种集合映射的关系，ts是如何确定映射之间的父子关系的呢？
type T1th = { [key in 'say']: string }
type T2th = { [key in 'say']: 'hi' }
type T3th = { [key in string]: string }
type T4th = { [key in string]: 'hi' }

/* 
签名是一种映射关系，包含原象（用key指代）和映射象（用value指代）
1、key1 < key2（key1是key2的子集），value1 = value2  =>  entry1 < entry2
2、key1 = key2， value1 < value2 => entry1 < entry2
*/

// 依据上述规则
let t1th: T1th;
let t2th: T2th;
let t3th: T3th;
let t4th: T4th;

t1th = t2th; // t2是t1的子集
t3th = t1th; // t1是t3的子集
t4th = t2th; // t2是t4的子集
t3th = t2th; // t2是t4的子集

let fnth1: (x: number) => number;
let fnth2: (x: number, s: string) => number;

fnth2 = fnth1;
/* 函数的参数中，参数是逆变的，返回值是协变的 
1、key1 < key2（key1是key2的子集），value1 = value2  =>  entry1 > entry2
2、key1 = key2， value1 < value2 => entry1 < entry2
*/
