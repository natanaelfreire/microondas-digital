export default function retornaMinsSecs(display: string, setProgramaSelecionado: string | null) : string {
  let minsN = ''
  let secsN = ''

  if (display.length === 4) {
    minsN = display.slice(0, 2) ? display.slice(0, 2) : '0'
    secsN = display.slice(2, 4) ? display.slice(2, 4) : '0'
  } 
  else if (display.length === 3) {
    minsN = display.slice(0, 1) ? display.slice(0, 1) : '0'
    secsN = display.slice(1, 3) ? display.slice(1, 3) : '0'
  }
  else if (display.length < 3) {
    secsN = display
  }

  const segundosExcedentes = parseInt(secsN ? secsN : '0') % 60
  const minutosConvertidos = Math.floor(parseInt(secsN ? secsN : '0') / 60)
  const minutosTotais = minsN + (minutosConvertidos > 0 ? minutosConvertidos : '')
  const newDisplay = `${minutosTotais}${segundosExcedentes.toString().padStart(2, '0')}`
  console.log("new Display", newDisplay)
  
  if (parseInt(newDisplay) > 200 && setProgramaSelecionado == null)
    return '200'
  else
    return newDisplay;
}