import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React, { SetStateAction, useEffect, useState } from "react"

import { ProgramaAquecimento } from './types/ProgramaAquecimento'
import { Plus } from "@phosphor-icons/react";

type ModalProgramaProps = {
  arrayOriginal: Array<ProgramaAquecimento>,
  setArryOriginal: React.Dispatch<SetStateAction<ProgramaAquecimento[]>>;
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

  function salvarPrograma() {
    if (props.arrayOriginal.length == 10) {
      alert('Limite máximo de programas de aquecimento atingido! 10')
      return
    }
    
    if (!nome) {
      alert('Preencha o nome');
      return
    }
    
    if (!alimento) {
      alert('Preencha o alimento')
      return
    }

    if (potencia < 1 || potencia > 10) {
      alert('Valor da potência deve ser entre 1 a 10')
      return
    }

    if (!character) {
      alert('Preencha o character')
      return
    }
    else if (character.length > 1) {
      alert('Character deve conter apenas 1 letra')
      return
    }

    if (minutos >= 60) {
      alert('Minutos excede o limite máximo de 59min');
      return
    }
    else if (minutos < 0) {
      alert('Minutos não pode ser negativo');
      return
    }

    if (segundos >= 60) {
      alert('Segundo excede o limite máximo de 59secs')
      return
    }
    else if (segundos < 0) {
      alert('Segundos não pode ser negativo');
      return
    }

    if ((segundos + minutos) == 0) {
      alert('Preencha algum tempo para o aquecimento')
      return
    }

    const validaCaractere = props.arrayOriginal.find(item => item.caractere == character);

    if (validaCaractere != null) {
      alert('Caractere já está em uso');
      return
    }

    const obj : ProgramaAquecimento = {
      id: props.arrayOriginal.length + 1,
      alimento: alimento,
      instrucoes: instrucoes,
      nome: nome,
      potencia: potencia,
      tempo: `${minutos}${segundos.toString().padStart(2, '0')}`,
      caractere: character
    }

    props.setArryOriginal(prev => [...prev, obj])
    onClose()
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