import { createSignal } from 'solid-js'
import { Button } from '~/components/ui/button'
import {
  TextField,
  TextFieldTextArea,
  TextFieldLabel,
  TextFieldInput,
} from '~/components/ui/text-field'
import { Toggle } from '~/components/ui/toggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

import Section from '~/layouts/Section'
import Title from '~/layouts/Title'
import { addRecord } from '~/lib/firestore'
import Calendar from '~/components/Calendar'
import CardSelecter from '~/components/CardSelecter'

const Input = () => {
  const [question, setQuestion] = createSignal('')
  const [cards, setCards] = createSignal<number[]>([NaN])
  const [positions, setPositions] = createSignal<boolean[]>([true])
  const [attributes, setAttributes] = createSignal<string[]>([''])
  const [selectedDate, setSelectedDate] = createSignal(
    formatDateToString(new Date()),
  )

  function formatDateToString(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月は0始まりなので+1する
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date.valueAsString[0])
  }

  const cardList = [
    '愚者',
    '魔術師',
    '女教皇',
    '女帝',
    '皇帝',
    '法王',
    '恋人',
    '戦車',
    '力',
    '隠者',
    '運命の輪',
    '正義',
    '吊るされた男',
    '死神',
    '節制',
    '悪魔',
    '塔',
    '星',
    '月',
    '太陽',
    '審判',
    '世界',
  ]

  const addCard = () => {
    setCards([...(cards() || []), NaN])
    setPositions([...positions(), true])
    setAttributes([...attributes(), ''])
  }

  const removeCard = (index: number) => {
    setCards(cards()?.filter((_, i) => i !== index) || [])
    setPositions(positions().filter((_, i) => i !== index))
    setAttributes(attributes().filter((_, i) => i !== index))
  }

  const updateCard = (index: number, key: string, value: any) => {
    if (key === 'card') {
      const updatedCards = [...(cards() || [])]
      updatedCards[index] = value
      setCards(updatedCards)
    } else if (key === 'position') {
      const updatedPositions = [...positions()]
      updatedPositions[index] = value
      setPositions(updatedPositions)
    } else if (key === 'attribute') {
      const updatedAttributes = [...attributes()]
      updatedAttributes[index] = value
      setAttributes(updatedAttributes)
    }
  }

  const postData = async () => {
    const data = {
      date: selectedDate(),
      question: question(),
      cards: (cards() || []).map((card, index) => ({
        card: isNaN(card) ? null : card,
        position: positions()[index],
        attribute: attributes()[index],
      })),
      tags: [], // タグの処理を後で追加
    }
    const res = await addRecord(data)

    if (res) {
      setQuestion('')
      setCards([NaN])
      setPositions([true])
      setAttributes([''])
      setSelectedDate(formatDateToString(new Date()))
    }
  }

  return (
    <>
      <Title>Record</Title>
      <Section>
        <Calendar
          initialDate={selectedDate()}
          onDateChange={handleDateChange}
        />
      </Section>

      <Section>
        <TextField value={question()} onChange={setQuestion} class="mb-5">
          <TextFieldLabel class="text-xl font-bold">質問</TextFieldLabel>
          <TextFieldTextArea placeholder="Type your question here." />
        </TextField>

        <div class="text-xl font-bold mb-1">カード</div>
        {(cards() || []).map((card, index) => (
          <div class="mb-4 border p-4 rounded">
            <div
              class="flex gap-3 mb-2
            "
            >
              <CardSelecter
                class=""
                cardList={cardList}
                cardNum={card}
                updateCard={updateCard}
                index={index}
                placeholder="カードを選ぶ"
              />
              <Toggle
                pressed={positions()[index]}
                onChange={(pressed) => updateCard(index, 'position', pressed)}
                class="border h-10 w-full"
              >
                {(state) => <div>{state.pressed() ? '正位置' : '逆位置'}</div>}
              </Toggle>
            </div>

            <TextField>
              <TextFieldInput
                placeholder="属性がある場合は入力"
                value={attributes()[index]}
                onChange={(e) =>
                  updateCard(index, 'attribute', e.currentTarget.value)
                }
              />
            </TextField>

            {index !== 0 && (
              <Button
                class="mt-2 bg-black"
                variant="destructive"
                onClick={() => removeCard(index)}
              >
                削除
              </Button>
            )}
          </div>
        ))}

        <Button variant="default" onClick={addCard}>
          カードを追加
        </Button>
      </Section>

      <Section>
        <Button variant="default" onClick={postData}>
          Save
        </Button>
      </Section>
    </>
  )
}
export default Input
