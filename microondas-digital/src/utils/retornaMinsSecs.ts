export function retornaMinsSecs(inputNum: string, minutos: number, segundos: number) {
  let display = `${minutos}${segundos.toString().padStart(2, '0')}`
  display = inputNum ? display + inputNum : display.substring(0, display.length - 1)

  console.log(display)

  if (parseInt(display).toString().length > 4)
    return { minutos: minutos, segundos: segundos };

  let mins = ''
  let secs = ''
  
  if (display.length === 4) {
    mins = display.slice(0, 2) ? display.slice(0, 2) : '0'
    secs = display.slice(2, 4) ? display.slice(2, 4) : '0'
  } 
  else if (display.length === 3) {
    mins = display.slice(0, 1) ? display.slice(0, 1) : '0'
    secs = display.slice(1, 3) ? display.slice(1, 3) : '0'
  }
  else if (display.length < 3) {
    secs = display
  }



  return { minutos: parseInt(mins ? mins : '0'), segundos: parseInt(secs ? secs : '0') };
}