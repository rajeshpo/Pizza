import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from '../../../util/mongoAuth';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

export default NextAuth({
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
          })
          
    ],

    pages:{
        signIn:"/auth/SignIn"
    },
    adapter: MongoDBAdapter(clientPromise)
})