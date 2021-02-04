import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  adapter: Adapters.Default({
    type: 'mysql',
    database: process.env.DATABASE_NAME,
    synchronize: true,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  }),
  callbacks: {
    session: async (session, user, sessionToken) => {
      session.user.id = user.id
      session.user.email_verified = user.emailVerified
      return Promise.resolve(session)
    }
  }
}

export default (req, res) => NextAuth(req, res, options)
