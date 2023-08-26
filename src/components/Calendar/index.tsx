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
import { useMemo, useState } from 'react'
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

    const calendarWeeks = useMemo(() => {
        const daysInMonthArray = Array.from({
            length: currentDate.daysInMonth(),
        }).map((_, i) => {
            return currentDate.set('date', i + 1)
        })

        const firstWeekDay = currentDate.get('day')

        const previousMonthFillArray = Array.from({
            length: firstWeekDay,
        })
            .map((_, i) => {
                console.log(currentDate.subtract(i + 1, 'day'))
                return currentDate.subtract(i + 1, 'day')
            })
            .reverse()

        return daysInMonthArray
    }, [currentDate])

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
