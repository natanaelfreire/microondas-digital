import { Box } from "@chakra-ui/react";
import { useMediaQuery } from '@chakra-ui/react'

type JanelaVidroProps = {
  feedbackMsg: string;
  instrucoes: string;
  stringInformativa: string;
}

function JanelaVidro({
  feedbackMsg,
  instrucoes,
  stringInformativa
}: JanelaVidroProps) {
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

  return (
    <Box
      bg='transparent'
      color='white'
      overflow='hidden'
      {...cssProps}
    >
      {
        feedbackMsg ? <p>{feedbackMsg}</p> : null
      }
      {
        instrucoes ? <p>{instrucoes}</p> : null
      }
      {
        stringInformativa ? `[ ${stringInformativa}]` : null
      }
    </Box>
  )
}

export { JanelaVidro }
