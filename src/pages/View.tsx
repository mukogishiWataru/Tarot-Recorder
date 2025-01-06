import { createSignal, onMount } from 'solid-js'
import { getAllRecords } from '~/lib/firestore'
import { cardList } from '~/lib/tarotCard'

const View = () => {
  // createSignalで状態を管理
  const [records, setRecords] = createSignal<any[]>([]) // 初期値は空配列

  // データ取得
  onMount(async () => {
    try {
      const data = await getAllRecords()
      setRecords(data as any) // データをSignalにセット
    } catch (error) {
      console.error('Error fetching records:', error)
    }
  })

  return (
    <div>
      <h1>Tarot Records</h1>
      <ul>
        {records().map((record) => (
          <li class="mt-3">
            <strong>Date:</strong> {record.date} <br />
            <strong>question:</strong> {record.question} <br />
            <strong>card:</strong> <br />
            {record.cards.map((item, i) => {
              const position = item.position ? '正' : '逆'
              return (
                <div>
                  <div>{i + 1}枚目：</div>
                  <div>
                    {cardList[item.card]}の{position}位置
                  </div>
                  {item.attribute && <div>属性：{item.attribute}</div>}
                </div>
              )
            })}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default View
