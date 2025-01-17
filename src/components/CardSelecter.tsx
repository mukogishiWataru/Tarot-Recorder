import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { cn } from '~/lib/utils'

type CardSelecterProps = {
  cardList: string[]
  cardNum: number
  index: number
  placeholder: string
  updateCard: Function
  class?: string
}

const CardSelecter = (props: CardSelecterProps) => {
  return (
    <Select
      class={cn('', props.class)}
      value={!isNaN(props.cardNum) ? props.cardList[props.cardNum] : null}
      onChange={(selectedLabel) => {
        if (selectedLabel)
          props.updateCard(
            props.index,
            'card',
            props.cardList.indexOf(selectedLabel as string),
          )
      }}
      options={props.cardList}
      placeholder={props.placeholder}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger aria-label="TarotCard" class="w-[180px]">
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}

export default CardSelecter
