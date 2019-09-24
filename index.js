let arithmeticArr = [];

// TooMuchValue Error will be thrown when the arithmeticArr length is more than 3
class TooMuchValue extends Error {};
// NotANumber Error will be thrown when final value is NaN
class NotANumber extends Error {};

document.querySelector('#container').addEventListener('click', function(e) {
  e.preventDefault();
  let input = e.target.textContent;
  let currConsole = document.querySelector('input');
  let headingChildren = document.querySelector('#heading').children;
  let convertVal = Number(currConsole.value);

  try {
    if (/C|AC/.test(input) && currConsole.value != 0) {
      clearInput(input);
    } else {
      performArithemeticOperation(input);
    }
    inputValue();
  }
  catch (e) {
    let p = document.createElement('p');
    if (e instanceof TooMuchValue) {
      p.textContent = 'ERR: Too Much Value!!';
      console.log(e);
    }
    else if (e instanceof NotANumber) {
      p.textContent = 'ERR: Not A Number!!';
      console.log(e);
    } else {
      p.textContent = 'ERR: Something went wrong!! Check the console for more details.';
      console.log(e);
    }
    // remove existing error message(s) if there's any.
    for (let i = 0; i < headingChildren.length; i++){
      if (headingChildren[i].getAttribute('id') == 'error'){
        headingChildren.removeChild(headingChildren[i]);
      }
    }
    p.setAttribute('id','error');
    document.querySelector('#heading').appendChild(p);
  }


  // Utility functions

  function performArithemeticOperation(input) {
    // performArithemeticOperation() manages the operator input
    // & diplay the answer

    let arithmeticOperation;
    // if input is an arithmetic operator & current console value isnt equals to 0.
    if (/\+|-|\*|\/|%|\+\/-/.test(input) &&
              !/[0]$|[\+??|\-??]$/.test(currConsole.value)) {
      if (arithmeticArr.length == 2) {
        arithmeticArr.push(currConsole.value);
        let val = convertStringToOperatorAndPerform(arithmeticArr);
        if (!val) throw new NotANumber();
        currConsole.value = val;
        arithmeticArr = [val, input];
      }
      else if (arithmeticArr.length > 3) {
        throw new TooMuchValue();
      } else {
        arithmeticArr.push(currConsole.value);
        arithmeticArr.push(input);
        currConsole.value = 0;
      }
    }
    else if (/=/.test(input)) {
      arithmeticArr.push(currConsole.value);
      arithmeticOperation = convertStringToOperatorAndPerform(arithmeticArr);
      console.log('Not a Number: ', arithmeticOperation)
      if (!arithmeticOperation) throw new NotANumber();
      currConsole.value = arithmeticOperation;
    }
  }

  function convertStringToOperatorAndPerform(arr) {
    // perform arithmetic on input
    let math_it_up = {
      "+": (x, y) => x + y,
      "-": (x, y) => x - y,
      "/": (x, y) => x / y,
      "*": (x, y) => x * y,
    };
    return math_it_up[arr[1]](Number(arr[0]), Number(arr[2]));
  }

  function inputValue() {
    // inputValue() manages the input values & add to the text field.
    let match = currConsole.value.match(/(\d)/g);
    // if input is a number or '.'
    if (/\d|\./.test(input)) {
      // if textfield has value zero &  neither + nor -
      if (!convertVal && !/\+|-/.test(currConsole.value)) {
        if (currConsole.value == '.')
          currConsole.value += input;
        else
          currConsole.value = input;
      }
      // if input is "." and has digits less than 8
      else if (/\./.test(input) && match == null || match <= 7) {
        if (/[\.]|[\.\d*]/.test(currConsole.value)) {
          currConsole.value += input;
        }
      }
      // if input has either + or minus or digit is less than or equals 8
      else if (match == null || match.length <= 7) {
        currConsole.value += input;
      }
    }
    // if input is an operator & the textfield has value zero
    else if (/\+|-/.test(input) && !convertVal) {
      currConsole.value = input;
    }
  }

  function clearInput(input) {
    // perform the clear 'C' or clear-all 'AC' action
    if (input == 'C') {
      let newVal = currConsole.value.split('');
      newVal.pop();
      currConsole.value = newVal.join('');
      currConsole.value ? currConsole.value : currConsole.value = 0;
    } else {
      currConsole.value = 0;
    }
  }

});
