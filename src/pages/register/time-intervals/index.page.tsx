import {
    Button,
    Checkbox,
    Heading,
    MultiStep,
    Text,
    TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
    FormError,
    IntervalBox,
    IntervalDay,
    IntervalInputs,
    IntervalItem,
    IntervalsContainer,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '../../../utils/convert-time-string-to-minutes'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const timeIntervalsFormSchema = z.object({
    intervals: z
        .array(
            z.object({
                weekDay: z.number().min(0).max(6),
                enable: z.boolean(),
                startTime: z.string(),
                endTime: z.string(),
            })
        )
        .length(7)
        .transform((intervals) =>
            intervals.filter((interval) => interval.enable === true)
        )
        .refine((intervals) => intervals.length > 0, {
            message: 'You must select at least one week day',
        })
        .transform((intervals) => {
            return intervals.map((interval) => {
                return {
                    weekDay: interval.weekDay,
                    startTimeInMinutes: convertTimeStringToMinutes(
                        interval.startTime
                    ),
                    endTimeInMinutes: convertTimeStringToMinutes(
                        interval.endTime
                    ),
                }
            })
        })
        .refine(
            (intervals) => {
                return intervals.every(
                    (interval) =>
                        interval.endTimeInMinutes - 60 >=
                        interval.startTimeInMinutes
                )
            },
            {
                message:
                    'The end time must be at least 1 hour after the start time',
            }
        ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<TimeIntervalsFormInput>({
        resolver: zodResolver(timeIntervalsFormSchema),
        defaultValues: {
            intervals: [
                {
                    weekDay: 0,
                    enable: false,
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    weekDay: 1,
                    enable: true,
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    weekDay: 2,
                    enable: true,
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    weekDay: 3,
                    enable: true,
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    weekDay: 4,
                    enable: true,
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    weekDay: 5,
                    enable: true,
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    weekDay: 6,
                    enable: false,
                    startTime: '08:00',
                    endTime: '18:00',
                },
            ],
        },
    })

    const router = useRouter()

    const weekDays = getWeekDays()

    const { fields } = useFieldArray({
        control,
        name: 'intervals',
    })

    const intervals = watch('intervals')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleSetTimeIntervals(data: any) {
        const { intervals } = data as TimeIntervalsFormOutput
        await api.post('/users/time-intervals', { intervals })

        await router.push('/register/update-profile')
    }
    return (
        <>
            <NextSeo title='Select your availability | Schedule Sync' noindex />
            <Container>
                <Header>
                    <Heading as='strong'>Almost there</Heading>
                    <Text>
                        Define the intervals that you are available on each day
                    </Text>

                    <MultiStep size={4} currentStep={3}></MultiStep>
                </Header>

                <IntervalBox
                    as='form'
                    onSubmit={handleSubmit(handleSetTimeIntervals)}
                >
                    <IntervalsContainer>
                        {fields.map((field, index) => {
                            return (
                                <IntervalItem key={field.id}>
                                    <IntervalDay>
                                        <Controller
                                            name={`intervals.${index}.enable`}
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Checkbox
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            field.onChange(
                                                                checked === true
                                                            )
                                                        }}
                                                        checked={field.value}
                                                    />
                                                )
                                            }}
                                        />
                                        <Text>{weekDays[field.weekDay]}</Text>
                                    </IntervalDay>
                                    <IntervalInputs>
                                        <TextInput
                                            size='sm'
                                            type='time'
                                            step={60}
                                            disabled={
                                                intervals[index].enable ===
                                                false
                                            }
                                            {...register(
                                                `intervals.${index}.startTime`
                                            )}
                                        />
                                        <TextInput
                                            size='sm'
                                            type='time'
                                            step={60}
                                            disabled={
                                                intervals[index].enable ===
                                                false
                                            }
                                            {...register(
                                                `intervals.${index}.endTime`
                                            )}
                                        />
                                    </IntervalInputs>
                                </IntervalItem>
                            )
                        })}
                    </IntervalsContainer>

                    {errors.intervals && (
                        <FormError size='sm'>
                            {errors.intervals.message}
                        </FormError>
                    )}

                    <Button type='submit' disabled={isSubmitting}>
                        Next Step <ArrowRight />
                    </Button>
                </IntervalBox>
            </Container>
        </>
    )
}
