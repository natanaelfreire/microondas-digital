export type ProgramasAquecimentoResponse = {
  "id": string,
  "nome": string,
  "alimento": string,
  "minutos": number,
  "segundos": number,
  "potencia": number,
  "instrucoes": string,
  "caractere": string,
}

export type MicroondasResponse = {
  "minutos": number,
  "segundos": number,
  "potencia": number,
  "horaInicio": string | null,
  "horaPausa": string | null,
  "programasAquecimento": Array<ProgramasAquecimentoResponse>,
  "caractere": string,
  "programaAquecimentoSelecionadoId": string | null
}