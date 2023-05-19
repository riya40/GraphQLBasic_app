const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP

const app = express()
const EmployeeData = require('./data/employees')
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLSchema,
} = require('graphql')


const EmployeeType = new GraphQLObjectType({
    name:'empoyees',
    description:'A employee Schema',
    fields:()=>({
        id:{
            type:new GraphQLNonNull(GraphQLInt),
        },
        emp_name:{
            type:new GraphQLNonNull(GraphQLString),
        },
        emp_designation:{
            type: new GraphQLNonNull(GraphQLString),
        },
        emp_address:{
            type : new GraphQLNonNull(GraphQLString)
        }

    })
})
const RootQueryType = new GraphQLObjectType({
    name:'Query',
    description:'RootQuery',
    fields:()=>({
        employee:{
            type: EmployeeType,
            description:'A single employee',
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent, args)=> DataTransfer.find(item => item.id ===args.id)
        },
        employees:{
            type:new GraphQLList(EmployeeType),
            description:'List of all Employees',
            resolve:()=>EmployeeData
        }
    })
})

const schema = new GraphQLSchema({
    query:RootQueryType,
})

app.use('/',expressGraphQL({
    schema:schema,
    graphiql:true,
}))
const PORT = 8081
app.listen(PORT,()=> console.log('GraphQL Server is Running!'))