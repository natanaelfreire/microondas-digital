import { AxiosError } from "axios"
import api from "./api"
import { MicroondasResponse } from "../types/MicroondasResponse"
import { getStorageToken } from "./getStorageToken"

interface IniciarAquecimentoProps {
  potencia: number,
  minutos: number,
  segundos: number,
  programaAquecimentoId: string | null
}

export async function iniciar(props : IniciarAquecimentoProps) {
  const token = getStorageToken()

  const response = await api.post<MicroondasResponse>('microondas/iniciar', {
    potencia: props.potencia,
    minutos: props.minutos,
    segundos: props.segundos,
    programaAquecimentoId: props.programaAquecimentoId
  }, {
    headers: {
      Authorization: token
    }
  })

  if (response instanceof AxiosError)
    alert(response.response?.data)

  return response.data;
}