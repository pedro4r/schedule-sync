import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import dayjs from 'dayjs'

const confirmFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Digite um e-mail válido' }),
    observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
    schedulingDate: Date
}

export function ConfirmStep({ schedulingDate }: ConfirmStepProps) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema),
    })

    function handleConfirmScheduling(data: ConfirmFormData) {
        console.log(data)
    }

    const describedDate = dayjs(schedulingDate).format('DD MMMM YYYY')
    const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

    return (
        <ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
            <FormHeader>
                <Text>
                    <CalendarBlank />
                    {describedDate}
                </Text>
                <Text>
                    <Clock />
                    {describedTime}
                </Text>
            </FormHeader>

            <label>
                <Text size='sm'>Nome completo</Text>
                <TextInput placeholder='Seu nome' {...register('name')} />
                {errors.name && (
                    <FormError size='sm'>{errors.name.message}</FormError>
                )}
            </label>

            <label>
                <Text size='sm'>Endereço de e-mail</Text>
                <TextInput
                    type='email'
                    placeholder='johndoe@example.com'
                    {...register('email')}
                />
                {errors.email && (
                    <FormError size='sm'>{errors.email.message}</FormError>
                )}
            </label>

            <label>
                <Text size='sm'>Observations</Text>
                <TextArea {...register('observations')} />
            </label>

            <FormActions>
                <Button type='button' variant='tertiary'>
                    Cancel
                </Button>
                <Button type='submit' disabled={isSubmitting}>
                    Confirm
                </Button>
            </FormActions>
        </ConfirmForm>
    )
}
