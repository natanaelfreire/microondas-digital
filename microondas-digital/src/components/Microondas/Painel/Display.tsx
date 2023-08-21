type DisplayProps = {
  mins: string;
  secs: string;
  potencia: number;
}

export function Display({
  mins,
  secs,
  potencia
} : DisplayProps) {

  return (
    <div className='painel-display'>
      <span><span>{mins.padStart(2, '0')}</span>:<span>{secs.padStart(2, '0')}</span></span>

      <span>P {potencia}</span>
    </div>
  )
}
