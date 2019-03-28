
let objectD;

$(document).ready(function () {

    initiateDataSet();
    let mContainer = new Container();
    // mContainer.A('Z=5*X^2+7*X*Y+3*Y^2+1');
    mContainer.A('Z=5*X^2+7*X*Y+3*Y^2+1 ');

});



function initiateDataSet() {
    objectD = new D();
    Object.freeze(objectD);
    objectD.setVariableBox('X', 10);
    objectD.setVariableBox('Y', 1);
    objectD.setVariableBox('Z', 1);
}

class Container {
    constructor() {
        this.ExprLength = 0;

        this.iQueueI = new Queue();
        this.oQueueI = new Queue();
        this.iQueueA = new Queue();
        this.oQueueA = new Queue();
        this.iQueueE = new Queue();
        this.oQueueE = new Queue();
        this.iQueueT = new Queue();
        this.oQueueT = new Queue();
        this.iQueueP = new Queue();
        this.oQueueP = new Queue();
        this.iQueueD = new Queue();
        this.oQueueD = new Queue();
    }

    A(expression) {
        let lhsRhs = expression.split('=');
        this.iQueueE.enqueue(lhsRhs[1]);

        this.E();
    }

    E() {
        while (!this.iQueueE.isEmpty()) {
            console.log('E machine got the input ' + this.iQueueE.front());

            let terms = this.iQueueE.dequeue().split('+');
            this.ExprLength = terms.length;
            console.log("Expre len " + this.ExprLength);
            terms.forEach((term) => {
                console.log("term sent is " + term)
                this.iQueueT.enqueue(term);
                this.T()
            })

        }
        // let terms = rhs.split('+');
        // let objectT = new T();
        // objectT.splitFactor(terms[0]);
        while (!this.oQueueE.isEmpty()) {
            console.log("size is " + this.oQueueE.messages())
            if (this.oQueueE.messages() == this.ExprLength) {
                let sum = 0;
                while (!this.oQueueE.isEmpty()) {
                    sum += this.oQueueE.dequeue();
                }
                console.log(sum);
            } else {
                break;
            }

        }
    }

    T() {
        while (!this.iQueueT.isEmpty()) {

            let term = this.iQueueT.dequeue();
            console.log("term is " + term)
            let factors = term.split('*');
            let resultMul = 1;
            for (let i = 0; i < factors.length; i++) {
                if (!isNaN(factors[i])) {
                    resultMul = resultMul * factors[i];
                } else if (factors[i].length > 1) {

                    this.iQueueP.enqueue(factors[i])
                    console.log("result is " + this.oQueueT.front())
                    resultMul = resultMul * this.P();
                } else {
                    resultMul = resultMul * objectD.getVariableBoxVal(factors[i]);
                }
            }
            this.oQueueE.enqueue(resultMul);
            this.E()
        }
    }

    P() {
        while (!this.iQueueP.isEmpty()) {
            console.log('factor is ' + this.iQueueP.front())
            let numPow = this.iQueueP.dequeue().split('^');
            console.log("calc power for " + numPow[0] + " ^ " + numPow[1])
            if (isNaN(numPow[0])) {
                // let val = Math.pow(objectD.getVariableBoxVal(numPow[0]), numPow[1]);
                // this.oQueueT.enqueue();
                return Math.pow(objectD.getVariableBoxVal(numPow[0]), numPow[1]);

            }
            // this.oQueueT.enqueue(Math.pow(numPow[0], numPow[1]));
            return Math.pow(numPow[0], numPow[1]);
        }

    }

}

class Queue {

    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Machine Free"
        }
        return this.items.shift();
    }

    enqueue(element) {
        this.items.push(element);
    }

    messages() {
        return this.items.length;
    }

    front() {
        if (this.isEmpty())
            return "Machine Free";
        return this.items[0];
    }


}

class D {
    constructor() {
        this._variableBox = {};
    }

    setVariableBox(alpha, val) {
        this._variableBox[alpha] = val;
    }

    getVariableBoxVal(alpha) {
        return this._variableBox[alpha];
    }
}

// class A {
//     constructor() {

//     }

//     splitRHS(expression) {
//         let lhsRhs = expression.split('=');
//         let objectE = new E();
//         objectE.splitExprWithPlus(lhsRhs[1]);
//     }

//     storeResult() {
//         console.log('Store called');
//     }
// }

// class E {
//     constructor() {

//     }

//     splitExprWithPlus(rhs) {
//         let terms = rhs.split('+');
//         let objectT = new T();
//         objectT.splitFactor(terms[0]);

//     }
// }

// class T {
//     constructor() {
//         this.factors = [];
//     }

//     splitFactor(term) {
//         this.factors = term.split('*');
//         this.multiply();
//     }

//     multiply() {
//         let resultMul = 1;
//         for (let i = 0; i < this.factors.length; i++) {
//             if (!isNaN(this.factors[i])) {
//                 console.log(this.factors[i]);
//                 resultMul = resultMul * this.factors[i];
//                 console.log("resutl is " + resultMul);
//             } else if (this.factors[i].length > 1) {
//                 console.log(this.factors[i]);
//                 let pObject = new P();
//                 resultMul = resultMul * pObject.calculatePower(this.factors[i]);
//                 console.log("resutl is " + resultMul);
//             } else {
//                 resultMul = resultMul * objectD.getVariableBoxVal(this.factors[i]);
//                 console.log("resutl is " + resultMul);
//             }
//         }
//         console.log("resutl is " + resultMul);
//     }


// }

// class P {
//     constructor() {

//     }

//     calculatePower(factor) {
//         let numPow = factor.split('^');
//         if (isNaN(numPow[0])) {
//             return Math.pow(objectD.getVariableBoxVal(numPow[0]), numPow[1]);
//         }
//         return Math.pow(numPow[0], numPow[1]);
//     }
// }





// class I {
//     constructor() {
//         this.instructions = {
//             "Z=5*X^2+7*X*Y+3*Y^2+1.": null,
//             "Z=5*X^2+7*X*Y+3*Y^2+4.": null,
//             "Z=5*X^2+7*X*Y+3*Y^2+3.": null,
//             "Z=5*X^2+7*X*Y+3*Y^2+2.": null
//         };
//         this.current = Object.keys(this.instructions)[0];
//     }

//     callA() {
//         let objectA = new A();
//         console.log(this.current);
//         objectA.splitRHS(this.current);
//     }


// }