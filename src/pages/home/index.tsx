import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
    return (
        <>
            <NextSeo
                title='Easy Google Calendar Schedule | Schedule Sync'
                description='Connect it to your Google Calendar'
            />

            <Container>
                <Hero>
                    <Heading as='h1' size='4xl'>
                        Schedule Sync
                    </Heading>
                    <Text size='xl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Text>
                    <ClaimUsernameForm />
                </Hero>

                <Preview>
                    <Image
                        src={previewImage}
                        height={400}
                        quality={100}
                        priority
                        alt='Lorem ipsum dolor sit amet'
                    />
                </Preview>
            </Container>
        </>
    )
}
