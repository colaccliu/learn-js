// module.exports = {
//     value: 0,
//     add(...args) {
//         this.value = args.reduce((pv, cv) => pv + cv, this.value || 0)
//         return this
//     },
//     minus(...args) {
//         this.value = args.reduce((pv, cv) => pv - cv, this.value || 0)
//         return this
//     }
// }

// class Math {
//   add(...args) {
//     this.value = args.reduce((pv, cv) => pv + cv, this.value || 0);
//     return this;
//   }
//   minus(...args) {
//     this.value = args.reduce((pv, cv) => pv - cv, this.value || 0);
//     return this;
//   }
//   getValue() {
//       return this.value
//   }
// }

// module.exports = Math

// 想要做到的是调用的时候new，而非创建的时候new，创建时候new，同一个实例会互相污染，调用的时候new，每次调用都是一个新实例。
// 不止一个细节，此时需要把初始条件控制好，不然这样子调用也是有问题的。需要保存的值通过参数保存下去。
const AsyncFunction = (async () => {}).constructor;
const add = (a, b) => a + b
const minus = (a, b) => a - b 

class LazyMath {
  constructor (value) {
    let initValue = value
    if (value instanceof AsyncFunction) {
      this.factory = value
    } else {
      if (!(value instanceof Number)) {
        console.warn(`Unsupported Type[${typeof value}].`)
        initValue = 0
      }
      this.factory = async () => initValue
    }
  }

  async getValue () {
    return await this.factory()
  }

  add (...args) {
    const factory = this.factory
    return new this.constructor(async () => args.reduce(add, await factory()))
  }

  minus (...args) {
    const factory = this.factory
    return new this.constructor(async () => args.reduce(minus, await factory()))
  }
}

class Math {
  constructor(value) {
    this.hasInitValue = true;
    if (value === undefined) {
      this.value = 0;
      this.hasInitValue = false;
    } else {
      this.value = value;
    }
  }
  add(...args) {
    const init = this.hasInitValue ? this.value : 0;
    this.value = args.reduce(add, init);
    return new Math(this.value);
  }
  minus(...args) {
    const init = this.hasInitValue ? this.value : 0;
    this.value = args.reduce(minus, init);
    return new Math(this.value);
  }
  getValue() {
    return this.value;
  }
}
module.exports = {Math, LazyMath};
