import { SetStateAction } from "react";
import { MicroondasResponse } from "./services/getMicroondasByUser";
import { retornaMinsSecs } from "./utils/retornaMinsSecs";

type ButtonNumericoProps = {
  num: string;
  setInput: React.Dispatch<SetStateAction<MicroondasResponse>>;
}

function ButtonNumerico(props: ButtonNumericoProps) {
  function clickNumero(num: string) {
    props.setInput(prev => {
      const { minutos, segundos } = retornaMinsSecs(num, prev.minutos, prev.segundos)
      
      const novoMicroondas : MicroondasResponse = {
        ...prev,
        minutos: minutos,
        segundos: segundos
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