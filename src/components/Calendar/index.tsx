import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '../../utils/get-week-days'
import {
    CalendarActions,
    CalendarBody,
    CalendarContainer,
    CalendarDay,
    CalendarHeader,
    CalendarTitle,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs().set('date', 1)
    })

    function handlePreviousMonth() {
        const previousMonthDate = currentDate.subtract(1, 'month')
        setCurrentDate(previousMonthDate)
    }

    function handleNextMonth() {
        const nextMonthDate = currentDate.add(1, 'month')
        setCurrentDate(nextMonthDate)
    }

    const shortWeekDays = getWeekDays({ short: true })

    const currentMonth = currentDate.format('MMMM')
    const currentYear = currentDate.format('YYYY')

    return (
        <CalendarContainer>
            <CalendarHeader>
                <CalendarTitle>
                    {currentMonth} <span>{currentYear}</span>
                </CalendarTitle>

                <CalendarActions>
                    <button
                        onClick={handlePreviousMonth}
                        title='Previous Month'
                    >
                        <CaretLeft />
                    </button>
                    <button onClick={handleNextMonth} title='Next Month'>
                        <CaretRight />
                    </button>
                </CalendarActions>
            </CalendarHeader>

            <CalendarBody>
                <thead>
                    <tr>
                        {shortWeekDays.map((weekDay) => (
                            <th key={weekDay}>{weekDay}.</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <CalendarDay>1</CalendarDay>
                        </td>
                        <td>
                            <CalendarDay>2</CalendarDay>
                        </td>
                        <td>
                            <CalendarDay>3</CalendarDay>
                        </td>
                    </tr>
                </tbody>
            </CalendarBody>
        </CalendarContainer>
    )
}
