import { createSignal } from 'solid-js'
import { Button } from '~/components/ui/button'
import {
  TextField,
  TextFieldTextArea,
  TextFieldLabel,
} from '~/components/ui/text-field'

import Section from '~/layouts/Section'
import Title from '~/layouts/Title'
import { addRecord } from '~/lib/firestore'
import Calendar from '~/components/Calendar'
import InputCards from '~/components/InputCards'

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

  const addCard = () => {
    setCards([...(cards() || []), NaN])
    setPositions([...positions(), true])
    setAttributes([...attributes(), ''])
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // スムーズにスクロールする
    })
  }

  const removeCard = (index: number) => {
    setCards(cards()?.filter((_, i) => i !== index) || [])
    setPositions(positions().filter((_, i) => i !== index))
    setAttributes(attributes().filter((_, i) => i !== index))
  }

  const moveCard = (index: number, direction: 'up' | 'down') => {
    const newCards = [...(cards() || [])]
    const newPositions = [...positions()]
    const newAttributes = [...attributes()]

    if (direction === 'up' && index > 0) {
      newCards[index] = cards()[index - 1]
      newCards[index - 1] = cards()[index]
      newPositions[index] = positions()[index - 1]
      newPositions[index - 1] = positions()[index]
      newAttributes[index] = attributes()[index - 1]
      newAttributes[index - 1] = attributes()[index]
    } else if (direction === 'down' && index < newCards.length - 1) {
      newCards[index] = cards()[index + 1]
      newCards[index + 1] = cards()[index]
      newPositions[index] = positions()[index + 1]
      newPositions[index + 1] = positions()[index]
      newAttributes[index] = attributes()[index + 1]
      newAttributes[index + 1] = attributes()[index]
    }

    setCards(newCards)
    setPositions(newPositions)
    setAttributes(newAttributes)
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
        <InputCards
          cards={cards()}
          positions={positions()}
          attributes={attributes()}
          updateCard={updateCard}
          removeCard={removeCard}
          moveCard={moveCard}
        />

        <Button
          variant="default"
          onClick={() => {
            setTimeout(addCard, 100)
          }}
        >
          カードを追加
        </Button>
      </Section>

      <Section>
        <Button variant="default" onClick={postData}>
          結果を記録する
        </Button>
      </Section>
    </>
  )
}
export default Input
