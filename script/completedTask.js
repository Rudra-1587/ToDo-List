export const cmplTaskArray = JSON.parse(localStorage.getItem('ToDoCmpl')) === null ? [] : JSON.parse(localStorage.getItem('ToDoCmpl'));

export function saveToCmplStorage() {
  localStorage.setItem('ToDoCmpl', JSON.stringify(cmplTaskArray));
}

console.log(cmplTaskArray)
