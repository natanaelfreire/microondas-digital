import { ProgramasAquecimentoResponse } from '../services/getMicroondasByUser';

export default function dividirArray(arrayOriginal: Array<ProgramasAquecimentoResponse>, tamanho: number) {
  const arraysMenores : ProgramasAquecimentoResponse[][] = []

  for (let i = 0; i < arrayOriginal.length; i += tamanho) {
    arraysMenores.push(arrayOriginal.slice(i, i + tamanho));
  }

  return arraysMenores;
}