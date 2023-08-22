import { Box } from "@chakra-ui/react";
import { useMediaQuery } from '@chakra-ui/react'
import { ProgramasAquecimentoResponse } from "../../types/MicroondasResponse";

type JanelaVidroProps = {
  programaAquecimentoSelecionadoId: string | null;
  programasAquecimento: ProgramasAquecimentoResponse[];
  stringInformativa: string;
  mostrarDetalhes: boolean;
}

function JanelaVidro({
  programaAquecimentoSelecionadoId,
  programasAquecimento,
  stringInformativa,
  mostrarDetalhes
}: JanelaVidroProps) {
  const programaSelecionado = programasAquecimento.find(item => item.id == programaAquecimentoSelecionadoId)
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)')
  
  const cssProps = isSmallerThan600 ?
   {
    height: '60%', 
    width: '100%',
    padding: 1, 
    fontSize: 10,
   } : {
    height: '100%', 
    width: '65%',
    padding: 3, 
    fontSize: 14,
   }

   console.log(mostrarDetalhes)

  return (
    <Box
      bg='transparent'
      color='white'
      overflow='hidden'
      {...cssProps}
    >
      {
        programaSelecionado && mostrarDetalhes ? <p>{programaSelecionado.nome} ({programaSelecionado.alimento})</p> : null
      }
      {
        programaSelecionado && mostrarDetalhes ? <p>{programaSelecionado.instrucoes}</p> : null
      }
      {
        stringInformativa ? `[ ${stringInformativa}]` : null
      }
    </Box>
  )
}

export { JanelaVidro }
