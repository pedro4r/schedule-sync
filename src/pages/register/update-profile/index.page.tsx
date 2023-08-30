import {
    Avatar,
    Button,
    Heading,
    MultiStep,
    Text,
    TextArea,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const updateProfileSchemae = z.object({
    bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchemae>

export default function UpdateProfile() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<UpdateProfileData>({
        resolver: zodResolver(updateProfileSchemae),
    })

    const session = useSession()
    const router = useRouter()

    async function handleUpdateProfile(data: UpdateProfileData) {
        await api.put('/users/profile', {
            bio: data.bio,
        })

        await router.push(`/schedule/${session.data?.user.username}`)
    }

    return (
        <>
            <NextSeo title='Update your profile | Schedule Sync' noindex />
            <Container>
                <Header>
                    <Heading as='strong'>Welcome to Schedule Sync</Heading>
                    <Text>
                        We need some informations to create your profile. You
                        may change those informations after.
                    </Text>
                    <MultiStep size={4} currentStep={4}></MultiStep>
                </Header>

                <ProfileBox
                    as='form'
                    onSubmit={handleSubmit(handleUpdateProfile)}
                >
                    <label>
                        <Text size='sm'>Profile image</Text>
                        <Avatar
                            src={session.data?.user.avatar_url}
                            alt={session.data?.user.name}
                        />
                    </label>

                    <label>
                        <Text size='sm'>About you</Text>
                        <TextArea
                            placeholder='Your name'
                            {...register('bio')}
                        />
                        <FormAnnotation size='sm'>
                            Type a little bit about yourself. It will be shown
                            at your personal page.
                        </FormAnnotation>
                    </label>

                    <Button type='submit' disabled={isSubmitting}>
                        Finish
                        <ArrowRight />
                    </Button>
                </ProfileBox>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res)
    )

    return {
        props: {
            session,
        },
    }
}
