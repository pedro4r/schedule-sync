// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
    export interface User {
        id: string
        name: string
        email: string
        username: string
        avatar_url: string
    }

    interface Session {
        user: User
    }
}
