import { splitProps, For } from 'solid-js'
import CardSelecter from '~/components/CardSelecter'
import { Button } from '~/components/ui/button'
import { TextField, TextFieldInput } from '~/components/ui/text-field'
import { Toggle } from '~/components/ui/toggle'
import ChevronUp from '~/components/icons/ChevronUp'
import ChevronDown from '~/components/icons/ChevronDown'
import { cardList } from '~/lib/tarotCard'

type InputCardsProps = {
  cards: number[]
  attributes: string[]
  positions: boolean[]
  updateCard: (index: number, key: string, value: any) => void
  removeCard: (index: number) => void
  moveCard: (index: number, direction: 'up' | 'down') => void
  class?: string
}

const InputCards = (props: InputCardsProps) => {
  const [local, others] = splitProps(props, [
    'class',
    'cards',
    'positions',
    'attributes',
    'updateCard',
    'removeCard',
    'moveCard',
  ])

  return (
    <For each={local.cards}>
      {(card, index) => (
        <div class="mb-4 border p-4 rounded">
          <div
            class="flex gap-3 mb-2
          "
          >
            <CardSelecter
              class=""
              cardList={cardList}
              cardNum={card}
              updateCard={local.updateCard}
              index={index()}
              placeholder="カードを選ぶ"
            />
            <Toggle
              pressed={local.positions[index()]}
              onChange={(pressed) =>
                local.updateCard(index(), 'position', pressed)
              }
              class="border h-10 w-full"
            >
              {(state) => <div>{state.pressed() ? '正位置' : '逆位置'}</div>}
            </Toggle>
          </div>

          <TextField>
            <TextFieldInput
              placeholder="属性がある場合は入力"
              value={local.attributes[index()]}
              onChange={(e) =>
                local.updateCard(index(), 'attribute', e.currentTarget.value)
              }
            />
          </TextField>

          {local.cards.length != 1 && (
            <div class="flex justify-between">
              <Button
                class="mt-2 bg-black"
                variant="destructive"
                onClick={() => {
                  setTimeout(() => local.removeCard(index()), 200)
                }}
              >
                削除
              </Button>

              <div>
                {index() > 0 && (
                  <Button
                    class="mt-2 ml-2 bg-black"
                    variant="destructive"
                    onClick={() => {
                      setTimeout(() => local.moveCard(index(), 'up'), 222)
                    }}
                  >
                    <ChevronUp />
                  </Button>
                )}
                {index() < local.cards.length - 1 && (
                  <Button
                    class="mt-2 ml-2 bg-black"
                    variant="destructive"
                    onClick={() => {
                      setTimeout(() => local.moveCard(index(), 'down'), 222)
                    }}
                  >
                    <ChevronDown />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </For>
  )
}

export default InputCards
