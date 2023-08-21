import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import { Key } from "@phosphor-icons/react";
import { Login } from "./services/login";

export default function ModalLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  useEffect(() => {
    setNome('')
    setSenha('')
  }, [])

  async function salvarPrograma() {    
    if (!nome) {
      alert('Preencha o nome');
      return
    }
    
    if (!senha) {
      alert('Preencha a senha')
      return
    }

    await Login(nome, senha)

    onClose()
  }

  return (
    <>
      <Button size='sm' bg="white" color="black" leftIcon={<Key size={12} />} onClick={onOpen}>Login</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input ref={initialRef} placeholder='Nome' onChange={(e) => setNome(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder='Senha' onChange={(e) => setSenha(e.target.value)}/>
            </FormControl>            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => salvarPrograma()}>
              Login
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}