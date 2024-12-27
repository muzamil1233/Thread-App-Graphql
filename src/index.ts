import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";

    const app = express()
const PORT = Number(process.env.PORT) || 8000;
app.use(express.json());
// create  Graphql Server

const gqlServer = new  ApolloServer({
    typeDefs: `
    type Query {
        hello: String
        say(name : string): string 
    }
    `,
    resolvers: {
        Query: {
            hello: () => 'Hello, world!',
            say:(_,{name}:{name:string})=> 'hey ${name}, how are you '
        },
    },
 });
 
  await gqlServer.start();

app.get("./",(req, res) =>{

    res.json({message :"server is up and running "});

})
app.use('/graphql', expressMiddleware( gqlServer));
app.listen(PORT,()=> console.log("server is up and running"));
