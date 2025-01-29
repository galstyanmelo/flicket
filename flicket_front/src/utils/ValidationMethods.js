export function alphaOnly(event) {
  var key = event.keyCode;
  if ((key >= 65 && key <= 90) || key === 8) return true;
  event.preventDefault();
}

export function allowOnlyNumbers(event) {
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
  if (allowedKeys.includes(event.key) || (!isNaN(Number(event.key)) && event.key !== " ")) {
    return true;
  } else {
    event.preventDefault();
  }
}

export function formatCardNumber(value) {
  let cleanedValue = value.replace(/\D/g, "");
  return cleanedValue.replace(/(.{4})/g, "$1 ").trim();
}