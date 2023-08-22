import { useContext, useEffect, useState } from 'react'
import { Backspace, Lightning } from '@phosphor-icons/react'
import { Button, Stack, Text } from '@chakra-ui/react'

import './App.css'

import ButtonNumerico from './ButtonNumerico';
import dividirArray from './utils/dividirArray.ts'
import ModalPrograma from './ModalPrograma.tsx';

import { ProgramaAquecimento } from './types/ProgramaAquecimento'
import { JanelaVidro } from './components/Microondas/JanelaVidro.tsx';
import AuthContext from './Context/auth.tsx';
import ModalLogin from './ModalLogin.tsx';
import { MicroondasResponse, getMiroondasByUser } from './services/getMicroondasByUser.ts';
import api from './services/api.ts';
import { getStorageToken } from './services/getStorageToken.ts';
import { iniciar } from './services/iniciar.ts';
import { retornaMinsSecs } from './utils/retornaMinsSecs.ts';

function App() {
  const [inputUser, setInput] = useState('')
  // const [potencia, setPotencia] = useState(10);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  // const [pausado, setPausado] = useState(false);
  // const [programaSelecionado, setProgramaSelecionado] = useState<string | null>(null);

  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [instrucoes, setInstrucoes] = useState('');

  const { signed, user } = useContext(AuthContext);

  const [microondas, setMicroondas] = useState<MicroondasResponse>({
    caractere: '.',
    horaInicio: null,
    horaPausa: null,
    minutos: 0,
    segundos: 0,
    potencia: 10,
    programaAquecimentoSelecionadoId: null,
    programasAquecimento: []
  });

  const programas = dividirArray(microondas?.programasAquecimento ?? [], 5)

  async function getMicroondas() {
    const response = await getMiroondasByUser()

    if (response != null) {
      setMicroondas(response);

      if (response.horaInicio != null && response.horaPausa == null) {
        await configuraTick()
      }
    }
  }

  useEffect(() => {
    getMicroondas()

    document.addEventListener('keydown', (event) => {
      if (event.key == 'Backspace') {
        clickApagaNumero()
        return
      }

      const num = parseInt(event.key)

      if (!isNaN(num)) {
        setMicroondas(prev => {
          const { minutos, segundos } = retornaMinsSecs(num.toString(), prev.minutos, prev.segundos)

          const novoMicroondas: MicroondasResponse = {
            ...prev,
            minutos: minutos,
            segundos: segundos
          }

          return novoMicroondas
        })
      }
    })
  }, [])

  let stringInformativa = ''

  if (intervalId != null || (microondas?.horaPausa != null)) {
    let caractere = '.';
    const programa = microondas?.programasAquecimento?.find(item => item.id == (microondas.programaAquecimentoSelecionadoId ?? 0));

    if (programa != null) {
      caractere = programa.caractere ? programa.caractere : '.'
    }

    let stringInfo = caractere?.repeat(microondas?.potencia ?? 10)
    const totalSegundos = (microondas.minutos * 60) + microondas.segundos
    stringInfo = `${stringInfo} `.repeat(totalSegundos)
    stringInformativa = stringInfo;
  }

  function mudaPotencia() {
    if (microondas?.programaAquecimentoSelecionadoId == null) {
      if (microondas?.potencia === 10)
        setMicroondas(prev => {
          const novoMicroondas: MicroondasResponse = {
            ...prev,
            potencia: 1,
          }

          return novoMicroondas;
        })
      else
        setMicroondas(prev => {
          const novoMicroondas: MicroondasResponse = {
            ...prev,
            potencia: prev.potencia + 1,
          }

          return novoMicroondas;
        })
    }
  }

  function clickApagaNumero() {
    if (microondas.programaAquecimentoSelecionadoId == null) {
      setMicroondas(prev => {
        const { minutos, segundos } = retornaMinsSecs('', prev.minutos, prev.segundos)

        const novoMicroondas: MicroondasResponse = {
          ...prev,
          minutos: minutos,
          segundos: segundos
        }

        return novoMicroondas
      })
    }
  }

  async function iniciarAquecimento() {
    const response = await iniciar({
      minutos: microondas.minutos,
      segundos: microondas.segundos,
      potencia: microondas.potencia,
      programaAquecimentoId: microondas.programaAquecimentoSelecionadoId
    })

    if (response != null) {
      setMicroondas(response)
      await configuraTick()
    }
    else {
      clearInterval(intervalId ?? 0)
      setIntervalId(null)
    }
  }

  async function configuraTick() {
    if (intervalId != null)
      clearInterval(intervalId)

    const id = setInterval(async () => {
      const token = getStorageToken()
      const microodasTick = await api.get<MicroondasResponse>('microondas/tick', {
        headers: {
          Authorization: token
        }
      })

      setMicroondas(microodasTick.data)

      if (microodasTick.data.horaInicio == null && microodasTick.data.horaPausa == null) clearInterval(id)
    }, 1000)

    setIntervalId(id)
  }

  async function pararAquecimento() {
    const token = getStorageToken()
    const response = await api.get<MicroondasResponse>('microondas/parar', {
      headers: {
        Authorization: token
      }
    })

    setMicroondas(response.data)
    clearInterval(intervalId ?? 0)
    setIntervalId(null)
  }

  return (
    <>
      <Stack align='center' direction='row' mb={4}>
        <ModalPrograma carregaProgramasAquecimento={getMicroondas} />
        {
          signed ? <Text color='white'>Olá, {user}</Text> : <ModalLogin />
        }
      </Stack>
      <div className='microondas-container'>
        <JanelaVidro
          programaAquecimentoSelecionadoId={microondas.programaAquecimentoSelecionadoId}
          programasAquecimento={microondas.programasAquecimento}
          stringInformativa={stringInformativa}
          mostrarDetalhes={microondas.horaInicio == null}
        />
        <div className='painel'>
          <div className='painel-display'>
            <span><span>{microondas.minutos.toString().padStart(2, '0')}</span>:<span>{microondas.segundos.toString().padStart(2, '0')}</span></span>

            <span>P {microondas.potencia}</span>
          </div>
          <div className='painel-acoes'>
            <div className='botoes-container'>
              <div className='botoes'>
                <ButtonNumerico setInput={setMicroondas} num='1' />
                <ButtonNumerico setInput={setMicroondas} num='2' />
                <ButtonNumerico setInput={setMicroondas} num='3' />
              </div>
              <div className='botoes'>
                <ButtonNumerico setInput={setMicroondas} num='4' />
                <ButtonNumerico setInput={setMicroondas} num='5' />
                <ButtonNumerico setInput={setMicroondas} num='6' />
              </div>
              <div className='botoes'>
                <ButtonNumerico setInput={setMicroondas} num='7' />
                <ButtonNumerico setInput={setMicroondas} num='8' />
                <ButtonNumerico setInput={setMicroondas} num='9' />
              </div>
              <div className='botoes' style={{
                marginBottom: '16px'
              }}>
                <button className='botao-apaga' onClick={() => clickApagaNumero()}><Backspace size={20} /></button>
                <ButtonNumerico setInput={setMicroondas} num='0' />
                <button className='botao-potencia' onClick={() => mudaPotencia()}>P<Lightning size={14} /></button>
              </div>
              {
                programas && programas.map((arrayProgramas, idx) => {
                  return (
                    <Stack spacing={1} key={idx} display='flex' direction='row' paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1} border='1px solid #fff'>
                      {arrayProgramas.map((item, i) => <Button width='20%' colorScheme='blue' size='xs' color='black' key={i} onClick={() => {
                        if (intervalId == null && microondas.horaPausa == null)
                          setMicroondas(prev => {
                            const novoMicroondas: MicroondasResponse = {
                              ...prev,
                              programaAquecimentoSelecionadoId: item.id,
                              potencia: item.potencia,
                              minutos: item.minutos,
                              segundos: item.segundos,
                            }

                            return novoMicroondas;
                          })
                      }}>
                        <small>
                          {
                            item.caractere != '.' ?
                              <i>{item.nome.split(' ')[0]}</i> :
                              item.nome.split(' ')[0]
                          }
                        </small>
                      </Button>)}
                    </Stack>
                  )
                })
              }
            </div>
            <Stack direction='row' spacing={2} align='center' justifySelf='flex-end' margin={2}>
              <Button onClick={() => pararAquecimento()} width='50%' colorScheme='red' size='md' color='white'>
                Pausar / Cancelar
              </Button>
              <Button onClick={() => iniciarAquecimento()} width='50%' colorScheme='green' size='md' color='white'>
                Iniciar (+30 secs)
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
