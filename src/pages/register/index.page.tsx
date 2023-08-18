import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'User must have at least 3 letters' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'Username must have only letter and hyphen',
        })
        .transform((username) => username.toLowerCase()),

    name: z.string().min(3, { message: 'Name must have at least 3 letters' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    const router = useRouter()

    useEffect(() => {
        if (router.query.username) {
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterFormData) {
        try {
            await api.post('/users', {
                name: data.name,
                username: data.username,
            })

            await router.push('/register/connect-calendar')
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                return
            }
            console.error(err)
        }
    }

    return (
        <Container>
            <Header>
                <Heading as='strong'>Welcome to Schedule Sync</Heading>
                <Text>
                    We need some informations to create your profile. You may
                    change those informations after.
                </Text>
                <MultiStep size={4} currentStep={1}></MultiStep>
            </Header>

            <Form as='form' onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size='sm'>Username</Text>
                    <TextInput
                        prefix='schedulesync.com/'
                        placeholder='your-user'
                        {...register('username')}
                    />
                </label>

                {errors.username && (
                    <FormError size='sm'>{errors.username.message}</FormError>
                )}

                <label>
                    <Text size='sm'>Full name</Text>
                    <TextInput placeholder='Your name' {...register('name')} />
                </label>

                {errors.name && (
                    <FormError size='sm'>{errors.name.message}</FormError>
                )}

                <Button type='submit' disabled={isSubmitting}>
                    Next step
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}
