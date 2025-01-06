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
        <TextField value={question()} onChange={setQuestion}>
          <TextFieldLabel>Question</TextFieldLabel>
          <TextFieldTextArea placeholder="Type your question here." />
        </TextField>
      </Section>

      <Section>
        {(cards() || []).map((card, index) => (
          <div class="mb-4 border p-4 rounded">
            <Select
              value={!isNaN(card) ? cardList[card] : null}
              onChange={(selectedLabel) => {
                if (selectedLabel)
                  updateCard(
                    index,
                    'card',
                    cardList.indexOf(selectedLabel as string),
                  )
              }}
              options={cardList}
              placeholder="カードを選択してください。"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <SelectTrigger aria-label="TarotCard" class="w-[180px]">
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>

            <Toggle
              pressed={positions()[index]}
              onChange={(pressed) => updateCard(index, 'position', pressed)}
            >
              {(state) => <div>{state.pressed() ? '正位置' : '逆位置'}</div>}
            </Toggle>

            <TextField>
              <TextFieldLabel>属性</TextFieldLabel>
              <TextFieldInput
                placeholder=""
                value={attributes()[index]}
                onChange={(e) =>
                  updateCard(index, 'attribute', e.currentTarget.value)
                }
              />
            </TextField>

            {index !== 0 && (
              <Button variant="destructive" onClick={() => removeCard(index)}>
                Remove Card
              </Button>
            )}
          </div>
        ))}

        <Button variant="default" onClick={addCard}>
          Add Card
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
