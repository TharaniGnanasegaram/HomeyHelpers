const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('./models/db');

const mongoose = require('mongoose')
const ServiceProvider = require('./models/serviceProvider');

const typeDefs = `
    type serviceProvider {
        _id : String,
        id : Int,
        username : String,
        password : String,
        firstname : String,
        lastname : String,
        email : String,
        contactnumber : String
    }

    type Query {
        serviceProviderList(username: String, firstname : String): [serviceProvider],
        getServiceProvider(id: String) : serviceProvider
        
    }

    type Mutation {
        createServiceProvider(username: String!, password: String!, firstname: String!, lastname: String!, email : String!, contactnumber : String!) : serviceProvider,    
    }

`;

const resolvers = {
  Query: {
    serviceProviderList,
    getServiceProvider

  },

  Mutation: {
    createServiceProvider
  },

};

const apolloserver = new ApolloServer({
  typeDefs,
  resolvers,
});


async function serviceProviderList(_, { username, firstname }) {

  let query = {};

  if (username !== "null" && username !== "" && username !== undefined) {
    query.username = username;
  }

  if (firstname !== "null" && firstname !== "" && firstname !== undefined) {
    query.firstname = firstname;
  }

  return (await ServiceProvider.find(query));

}


async function createServiceProvider(_, { username, password, firstname, lastname, email, contactnumber }) {

  const existingServiceProviderUsername = await ServiceProvider.findOne({ username });
  if (existingServiceProviderUsername) {
    throw new Error('Username already exists. Please provide a new username');
  }

  const existingServiceProviderEmail = await ServiceProvider.findOne({ email });
  if (existingServiceProviderEmail) {
    throw new Error('Email already exists. Please provide a new email');
  }

  const existingServiceProviderNum = await ServiceProvider.findOne({ contactnumber });
  if (existingServiceProviderNum) {
    throw new Error('Contact number already exists. Please provide a new contact number');
  }

  const newServiceProvider = {
    username,
    password,
    firstname,
    lastname,
    email,
    contactnumber
  };

  const PreId = await (ServiceProvider.find().count());
  newServiceProvider.id = PreId + 1;

  const createdServicePro = await ServiceProvider.create(newServiceProvider);

  return createdServicePro;

}


async function getServiceProvider(_, { id }) {

  return (await ServiceProvider.findById(new mongoose.Types.ObjectId(id)));
}


const app = express();

app.use(express.static('public'));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

apolloserver.start()
  .then(() => {
    apolloserver.applyMiddleware({ app, path: '/graphql', cors: true });  // have to edit this at the end of testing
  });

app.listen('4000', () => {
  console.log('Server is running');
});