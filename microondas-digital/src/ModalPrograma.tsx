import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import { Plus } from "@phosphor-icons/react";
import { ProgramasAquecimentoResponse } from "./types/MicroondasResponse";
import { criarProgramaAquecimento } from "./services/criarProgramaAquecimento";

type ModalProgramaProps = {
  carregaProgramasAquecimento: () => Promise<void>
}

export default function ModalPrograma(props: ModalProgramaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nome, setNome] = useState('');
  const [alimento, setAlimento] = useState('');
  const [potencia, setPotencia] = useState(10);
  const [character, setCharacter] = useState('');
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [instrucoes, setInstrucoes] = useState('');

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  useEffect(() => {
    setNome('')
    setAlimento('')
    setPotencia(10)
    setCharacter('')
    setMinutos(0)
    setSegundos(0)
    setInstrucoes('')
  }, [])

  async function salvarPrograma() {
    const obj : Omit<ProgramasAquecimentoResponse, "id"> = {
      alimento: alimento,
      instrucoes: instrucoes,
      nome: nome,
      potencia: potencia,
      minutos: minutos,
      segundos: segundos,
      caractere: character ? character : '.',
    }

    const response = await criarProgramaAquecimento(obj)

    if (response == true) {
      await props.carregaProgramasAquecimento()
      onClose()
    }
  }

  return (
    <>
      <Button size='sm' bg="white" color="black" leftIcon={<Plus size={12} />} onClick={onOpen}>Programa de Aquecimento</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Programa de Aquecimento</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input ref={initialRef} placeholder='Nome' onChange={(e) => setNome(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Alimento</FormLabel>
              <Input placeholder='Alimento' onChange={(e) => setAlimento(e.target.value)}/>
            </FormControl>

            <Grid templateColumns='1fr 1fr' gap={4}>
              <GridItem>
                <FormControl mt={4}>
                  <FormLabel>Potência</FormLabel>
                  <Input type="number" placeholder='Potência' onChange={(e) => setPotencia(parseInt(e.target.value))}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mt={4}>
                  <FormLabel>Character</FormLabel>
                  <Input placeholder='' onChange={(e) => setCharacter(e.target.value)}/>
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns='1fr 1fr' gap={4}>
              <GridItem>
                <FormControl mt={4}>
                  <FormLabel>Tempo (minutos)</FormLabel>
                  <Input type="number" placeholder='Minutos' onChange={(e) => setMinutos(parseInt(e.target.value))}/>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mt={4}>
                  <FormLabel>Tempo (segundos)</FormLabel>
                  <Input type="number" placeholder='Segundos' onChange={(e) => setSegundos(parseInt(e.target.value))}/>
                </FormControl>
              </GridItem>
            </Grid>

            <FormControl mt={4}>
              <FormLabel>Instruções</FormLabel>
              <Input placeholder='Instruções' onChange={(e) => setInstrucoes(e.target.value)}/>
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => salvarPrograma()}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}