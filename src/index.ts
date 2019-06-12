import { ApolloServer } from 'apollo-server'
import { ApolloGateway } from '@apollo/gateway'

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'quantum', url: 'http://localhost:4001/graphql' },
    { name: 'wiki', url: 'http://localhost:4002/graphql' },
  ],
})

const init = async () => {
  const { schema, executor } = await gateway.load()

  const server = new ApolloServer({ schema, executor })

  server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

init()
