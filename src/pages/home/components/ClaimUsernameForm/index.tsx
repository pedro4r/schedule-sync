import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Form, FormAnnotation } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const claimUsernameFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must have at least 3 letters' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'Username must have only letter and hyphen',
        })
        .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema),
    })

    async function handleClaimUsername(data: ClaimUsernameFormData) {
        console.log(data)
    }

    return (
        <>
            <Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput
                    size='sm'
                    prefix='ignite.com/'
                    placeholder='seu-usuário'
                    {...register('username')}
                />
                <Button size='sm' type='submit'>
                    Claim
                    <ArrowRight />
                </Button>
            </Form>

            <FormAnnotation>
                <Text size='sm'>
                    {errors.username
                        ? errors.username.message
                        : 'Type your username'}
                </Text>
            </FormAnnotation>
        </>
    )
}
