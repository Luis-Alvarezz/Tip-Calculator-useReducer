import type { Dispatch, SetStateAction } from "react"
const tipOptions = [
  {
    id: '.10',
    value: .10,
    label: '10%'
  },
  {
    id: '.20',
    value: .20,
    label: '20%'
  },
  {
    id: '.50',
    value: .50,
    label: '50%'
  },
]

type TipPercentageProps = {
  setTip: Dispatch<SetStateAction<number>>, // * Inferencia de vsCode para values mas avanzados
  tip: number
}

export default function TipPercentageForm({setTip, tip} : TipPercentageProps) {
  return (
    <div>
      <h3 className="font-black text-2xl">Propina: </h3>

      <form>
          { tipOptions.map(tipOption => (
            <div key={tipOption.id} className="flex gap-2">
              <label htmlFor={tipOption.id}>{tipOption.label}</label>
              <input 
                type="radio" 
                id={tipOption.id} 
                name="tip"  
                value={tipOption.value}
                onChange={e => setTip(+e.target.value)} // * +e.target.value -> Convertimos el string a number
                // * Opc 2: e.target.valueAsNumber -> Pero NO funciona con radio, unicamente con tipo TEXT y otros inputs
                checked={tipOption.value === tip} // * Revisa si el valor del tip es igual al que se almacena en mi orden al dar 'Guardar Orden'
                // * (claramente no, por ende NO seran iguales y se deja de marcar )
              />
            </div>
          )) }
      </form>
    </div>
  )
}
