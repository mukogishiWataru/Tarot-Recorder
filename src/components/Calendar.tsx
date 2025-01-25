import { CalendarDate } from '@internationalized/date'

import { Index } from 'solid-js'
import { Portal } from 'solid-js/web'

import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from '~/components/ui/date-picker'

// propsの型定義
interface CalendarProps {
  initialDate: string // 初期日付
  onDateChange: (date: Date) => void // 日付変更時のコールバック (オプショナル)
}

const Calendar = (props: CalendarProps) => {
  const initialDate = props.initialDate?.split('-').map((num) => Number(num))
  const defaultDate = new CalendarDate(
    initialDate[0],
    initialDate[1],
    initialDate[2],
  )

  return (
    <DatePicker
      defaultValue={[defaultDate]}
      onValueChange={props.onDateChange as any}
      format={(e) => {
        return `${e.year}年${e.month}月${e.day}日`
      }}
    >
      <DatePickerControl>
        <DatePickerInput placeholder="Pick a date" />
        <DatePickerTrigger />
      </DatePickerControl>
      <Portal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableHead>
                        <DatePickerTableRow>
                          <Index each={api().weekDays}>
                            {(weekDay) => (
                              <DatePickerTableHeader>
                                {weekDay().short}
                              </DatePickerTableHeader>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      </DatePickerTableHead>
                      <DatePickerTableBody>
                        <Index each={api().weeks}>
                          {(week) => (
                            <DatePickerTableRow>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePickerTableCell value={day()}>
                                    <DatePickerTableCellTrigger>
                                      {day().day}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index
                          each={api().getMonthsGrid({
                            columns: 4,
                            format: 'short',
                          })}
                        >
                          {(months) => (
                            <DatePickerTableRow>
                              <Index each={months()}>
                                {(month) => (
                                  <DatePickerTableCell value={month().value}>
                                    <DatePickerTableCellTrigger>
                                      {month().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index each={api().getYearsGrid({ columns: 4 })}>
                          {(years) => (
                            <DatePickerTableRow>
                              <Index each={years()}>
                                {(year) => (
                                  <DatePickerTableCell value={year().value}>
                                    <DatePickerTableCellTrigger>
                                      {year().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </Portal>
    </DatePicker>
  )
}

export default Calendar
