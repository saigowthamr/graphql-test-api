const { GraphQLServer } = require('graphql-yoga');


//sample data
let todos = [
    {
        id: 1,
        title: "This is my todo",
        body: "sample content in id 1"
    },
    {
        id: 2,
        title: "This is my second todo",
        body: "sample content in id 2"
    },
    {
        id: 3,
        title: "This is my third todo",
        body: "sample content in id 3"
    }
]


//Type definitions
const typeDefs = `

type Todo{
    id: ID!
    title: String!
    body: String!
}



type Query{
   getAlltodos : [Todo!]!
}


type Mutation{
    addTodo(title:String!,body:String!):Todo!,
    updateTodo(id:ID!,title:String!,body:String!):Todo!
    deleteTodo(id:ID!):Todo!
}

`

// resolvers

const resolvers = {
    Query: {
        getAlltodos(root, args, ctx, info) {

            return todos
        }

    },
    Mutation: {
        addTodo(root, args, ctx, info) {

            if (args) {
                todos.push({
                    id: Math.random(),
                    title: args.title,
                    body: args.body
                })
            } else {
                throw new Error()
            }

            return todos[todos.length - 1];

        },
        updateTodo(root, args, ctx, info) {
            const index = todos.findIndex(e => e.id === +args.id)

            let todo = todos[index];

            todo.title = args.title
            todo.body = args.body

            return todos[index]
        },
        deleteTodo(root, args, ctx, info) {
            const index = todos.findIndex(e => e.id === +args.id)

            let todo = todos[index];
            const filter = todos.filter(e => e.id !== +args.id)

            todos = filter

            return todo
        }
    }

}


const server = new GraphQLServer({
    typeDefs, resolvers, context: {
        //if we pass anything here can be available in all resolvers
    }
})



server.start(() => console.log('Server is running on localhost:4000☄'))



