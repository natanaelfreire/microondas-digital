import { AxiosError } from "axios"
import api from "./api"
import { ProgramasAquecimentoResponse } from "../types/MicroondasResponse"
import { getStorageToken } from "./getStorageToken"

export async function criarProgramaAquecimento(props : Omit<ProgramasAquecimentoResponse, "id">) {
  const token = getStorageToken()

  const response = await api.post<boolean>('microondas/ProgramasAquecimento', {
    potencia: props.potencia,
    minutos: props.minutos,
    segundos: props.segundos,
    alimento: props.alimento,
    instrucoes: props.instrucoes,
    nome: props.nome,
    caractere: props.caractere,
  }, {
    headers: {
      Authorization: token
    }
  })

  if (response instanceof AxiosError)
    alert(response.response?.data)

  return response.data;
}