import '../lib/dayjs'
import { globalStyles } from '../styles/global'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/react-query'
import { DefaultSeo } from 'next-seo'

globalStyles()

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <DefaultSeo
                    openGraph={{
                        type: 'website',
                        locale: 'en-US',
                        url: 'https://www.schedulesync',
                        siteName: 'Schedule Sync',
                    }}
                />
                <Component {...pageProps} />
            </SessionProvider>
        </QueryClientProvider>
    )
}
