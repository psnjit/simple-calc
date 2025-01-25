let display = document.querySelector(".display");
let numbers = document.querySelector(".numbers");
let expression = "";

function getInputValue(target) {
  if (
    expression.length === 0 &&
    (target === "/" || target === "*" || target === "0" || target === "00")
  )
    return;
  if (
    (expression === "+" || expression === "-") &&
    (target === "/" || target === "*")
  )
    return;
  let lastExp = expression.charAt(expression.length - 1);
  let operators = ["+", "-", "/", "*", "%"];
  let isLastExpOperator = operators.find((op) => {
    return lastExp === op;
  });
  if (isLastExpOperator && target === "00") {
    return;
  }
  if (expression.length > 1) {
    let secondLastExp = expression.charAt(expression.length - 2);
    let lastExp = expression.charAt(expression.length - 1);
    let isSecondLastExpOperator = operators.find((op) => {
      return secondLastExp === op;
    });
    if (
      isSecondLastExpOperator &&
      lastExp === "0" &&
      (target === "0" || target === "00")
    ) {
      return;
    }
    if (lastExp === "0" && !isNaN(target)) expression = expression.slice(0, -1);
  }
  if (expression.length > 0) handleInputs(target);
  const inputValue = target;
  console.log(inputValue);
  if (inputValue === "=") {
    try {
      const result = eval(expression);
      display.textContent = result;
      expression = "";
      return;
    } catch (exception) {
      alert("Invalid expression. Please correct and try again.");
      return;
    }
  }
  if (inputValue === "CE") {
    display.textContent = "";
    expression = "";
    return;
  }
  if (inputValue === "D") {
    if (expression.length > 0) {
      expression = expression.slice(0, -1);
      display.textContent = expression;
    }
    return;
  }
  expression += inputValue;
  expression = trimLeadingZeros(expression);
  display.textContent = expression;
}

numbers.addEventListener("click", (event) => {
  getInputValue(event.target.textContent);
});

function trimLeadingZeros(exp) {
  return exp.replace(/^0+/, "") || "0";
}

function handleInputs(exp) {
  let operators = ["+", "-", "/", "*", "%"];
  let isExpOperator = operators.find((op) => {
    return exp === op;
  });
  let lastExp = expression.charAt(expression.length - 1);
  let isLastExpOperator = operators.find((op) => {
    return lastExp === op;
  });
  if (isExpOperator && isLastExpOperator) expression = expression.slice(0, -1);
}
