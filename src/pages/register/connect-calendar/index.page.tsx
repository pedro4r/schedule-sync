import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
    const session = useSession()
    const router = useRouter()

    const hasAuthError = !!router.query.error
    const isSignedIn = session.status === 'authenticated'

    async function handleConnectCalendar() {
        await signIn('google')
    }

    async function handleNavigateToNextStep() {
        await router.push('/register/time-intervals')
    }

    return (
        <>
            <NextSeo
                title='Connect with your Google Calendar | Schedule Sync'
                noindex
            />
            <Container>
                <Header>
                    <Heading as='strong'>Connect your agenda</Heading>
                    <Text>
                        Connect your calendar to automatically check busy times
                        and new events as they are scheduled.
                    </Text>
                    <MultiStep size={4} currentStep={2}></MultiStep>
                </Header>

                <ConnectBox>
                    <ConnectItem>
                        <Text>Google Calendar</Text>
                        {isSignedIn ? (
                            <Button size='sm' disabled>
                                Connected <Check />
                            </Button>
                        ) : (
                            <Button
                                variant='secondary'
                                size='sm'
                                onClick={handleConnectCalendar}
                            >
                                Connect
                                <ArrowRight />
                            </Button>
                        )}
                    </ConnectItem>

                    {hasAuthError && (
                        <AuthError size='sm'>
                            Fail to connect, check if you enable the access to
                            Google Calendar.
                        </AuthError>
                    )}

                    <Button
                        onClick={handleNavigateToNextStep}
                        type='submit'
                        disabled={!isSignedIn}
                    >
                        Next step
                        <ArrowRight />
                    </Button>
                </ConnectBox>
            </Container>
        </>
    )
}
