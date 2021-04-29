const Math = require("./math");
const m = new Math();
const n = new Math();

// console.log(math.add(2, 3).minus(6).value)  // -1
// console.log(math.add(2, 3).minus(6).value)  // -2, expect -1

const a = m.add(2, 3).minus(1);
console.log(a.getValue());
console.log(a.add(2, 3).getValue());

// console.log(n.add(2, 3).minus(6).getValue())
console.log(m.add(2, 3).minus(1).getValue());
// 依旧会被污染到，但是关键在于实例怎么处理值的问题
// 之前的状态如何保存？通过构造函数传参
