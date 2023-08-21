import { SetStateAction } from "react";
import { MicroondasResponse } from "./services/getMicroondasByUser";

type ButtonNumericoProps = {
  num: string;
  setInput: React.Dispatch<SetStateAction<MicroondasResponse>>;
}

function ButtonNumerico(props: ButtonNumericoProps) {
  function clickNumero(num: string) {
    props.setInput(prev => {
      const display = `${prev.minutos}${prev.segundos.toString().padStart(2, '0')}` + num
      // console.log(parseInt(display).toString())
      if (parseInt(display).toString().length > 4)
        return prev;

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
      
      const novoMicroondas : MicroondasResponse = {
        ...prev,
        minutos: parseInt(mins),
        segundos: parseInt(secs)
      }

      return novoMicroondas
    })
  }

  return <>
    <button
      type="button"
      onClick={() => clickNumero(props.num)}
    >
      {props.num}
    </button>
  </>
}

export default ButtonNumerico;