const { GraphQLServer } = require('graphql-yoga');


//sample data
let todos = [
    {
        id: 1,
        title: "This is my todo",
        body: "sample content in id 1",
        userId: 1
    },
    {
        id: 2,
        title: "This is my second todo",
        body: "sample content in id 2",
        userId: 1

    },
    {
        id: 3,
        title: "This is my third todo",
        body: "sample content in id 3",
        userId: 2

    }
]


let users = [

    {
        id: 1,
        name: "sai"
    },
    {
        id: 2,
        name: "gowtham"
    },
]


//Type definitions
const typeDefs = `

type Todo{
    id: ID!
    title: String!
    body: String!
    user:User!
}

type User{
    id:ID!
    name:String!
    todos: [Todo!]!
}

type Query{
     user(id:ID!): User!
}

`

// resolvers

const resolvers = {
    Query: {
        user(parent, args, ctx, info) {

            if (!args.id) {
                throw new Error('id is required')
            }

            return users.find(user => user.id === +args.id)

        }

    },
    User: {
        todos(parent, args, ctx, info) {
            console.log(parent)

            return todos.filter(todo => todo.userId === parent.id)
        }
    }

}


const server = new GraphQLServer({
    typeDefs, resolvers, context: {
        //if we pass anything here can be available in all resolvers
    }
})



server.start(() => console.log('Server is running on localhost:4000☄'))



