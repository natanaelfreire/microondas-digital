import { AxiosError } from "axios"
import api from "./api"
import { MicroondasResponse } from "../types/MicroondasResponse"
import { getStorageToken } from "./getStorageToken"

export async function tick() {
  const token = getStorageToken()

  const response = await api.get<MicroondasResponse>('microondas/tick', {
    headers: {
      Authorization: token
    }
  })

  if (response instanceof AxiosError)
    alert(response.response?.data)

  return response.data;
}