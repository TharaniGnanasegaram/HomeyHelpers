const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('./models/db');

const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const ServiceProvider = require('./models/serviceProvider');
const Customer = require('./models/customer');
const Service = require('./models/services');
const ServiceProviderService = require('./models/serviceProviderServices');
const ServiceProviderAvailability = require('./models/serviceProviderAvailability');


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

    type customer {
      _id : String,
      id : Int,
      username : String,
      password : String,
      firstname : String,
      lastname : String,
      email : String,
      contactnumber : String,
      address : String
    }

    type service {
      _id : String,
      id : Int,
      servicename : String
    }

    type serviceProviderService {
      _id : String,
      id : Int,
      serviceproviderid : String,
      serviceprovidername : String,
      serviceprovideremail : String,
      serviceprovidercontact : String,
      serviceid : String,
      hourlyrate : Float,
      experience : String
    }

    type serviceProviderAvailability {
      _id : String,
      id : Int,
      serviceproviderservicesid : String,
      servicedate : String,
      starttime : String,
      endtime : String,
      duration : Float,
      isavailable : Boolean
    }

    type Query {
        serviceProviderList(username: String, firstname : String): [serviceProvider],
        getServiceProvider(id: String) : serviceProvider,
        loginServiceProvider(username: String!, password: String!) : serviceProvider,
        

        customerList(username: String, firstname : String): [customer],
        getcustomer(id: String) : customer,
        logincustomer(username: String!, password: String!) : customer,


        getService(id : String) : service,
        getServiceByName(servicename : String) : service,
        getAllServices : [service]

        
        getServiceProviderService(id : String) : serviceProviderService,
        ServiceProviderServiceList(serviceproviderid : String, serviceid : String) : [serviceProviderService],
        
        
    }

    type Mutation {
        createServiceProvider(username: String!, password: String!, firstname: String!, lastname: String!, email : String!, contactnumber : String!) : serviceProvider,
        
        createCustomer(username: String!, password: String!, firstname: String!, lastname: String!, email : String!, contactnumber : String!, address : String!) : customer,   
        
        createServiceProviderService(serviceproviderid : String!, serviceid : String!, hourlyrate: Float!, experience: String!) : serviceProviderService, 
        
        deleteServiceProviderService(id : String) : serviceProviderService,

        updateServiceProviderService(id : String!, hourlyrate: Float!, experience: String!) : serviceProviderService,

        createServiceProviderServiceAvailability(serviceproviderservicesid : String!, servicedate : String!, starttime : String!, endtime : String!, duration: Float!) : serviceProviderAvailability, 
    }

`;

const resolvers = {
  Query: {
    serviceProviderList,
    getServiceProvider,
    loginServiceProvider,

    customerList,
    getcustomer,
    logincustomer,

    getService,
    getServiceByName,
    getAllServices,

    getServiceProviderService,
    ServiceProviderServiceList,

  },

  Mutation: {
    createServiceProvider,
    createCustomer,
    createServiceProviderService,
    deleteServiceProviderService,
    updateServiceProviderService,
    createServiceProviderServiceAvailability
  },

};

const apolloserver = new ApolloServer({
  typeDefs,
  resolvers,
});


// Service Provider

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


async function loginServiceProvider(_, { username, password }) {

  const isExistByUsername = await ServiceProvider.findOne({ username })

  if (isExistByUsername) {

    const same = await bcrypt.compare(password, isExistByUsername.password);

    if (same) {
      return isExistByUsername;
    }
    else {
      return null;
    }
  }

  else {
    return null;
  }

}

// ##############################################################################################################


// Customer


async function customerList(_, { username, firstname }) {

  let query = {};

  if (username !== "null" && username !== "" && username !== undefined) {
    query.username = username;
  }

  if (firstname !== "null" && firstname !== "" && firstname !== undefined) {
    query.firstname = firstname;
  }

  return (await Customer.find(query));

}


async function createCustomer(_, { username, password, firstname, lastname, email, contactnumber, address }) {

  const existingCustomerUsername = await Customer.findOne({ username });
  if (existingCustomerUsername) {
    throw new Error('Username already exists. Please provide a new username');
  }

  const existingCustomerEmail = await Customer.findOne({ email });
  if (existingCustomerEmail) {
    throw new Error('Email already exists. Please provide a new email');
  }

  const existingCustomerNum = await Customer.findOne({ contactnumber });
  if (existingCustomerNum) {
    throw new Error('Contact number already exists. Please provide a new contact number');
  }

  const newCustomer = {
    username,
    password,
    firstname,
    lastname,
    email,
    contactnumber,
    address
  };

  const PreId = await (Customer.find().count());
  newCustomer.id = PreId + 1;

  const createdCustomer = await Customer.create(newCustomer);

  return createdCustomer;

}


async function getcustomer(_, { id }) {

  return (await Customer.findById(new mongoose.Types.ObjectId(id)));
}


async function logincustomer(_, { username, password }) {

  const isExistByUsernameCustomer = await Customer.findOne({ username })

  if (isExistByUsernameCustomer) {

    const same = await bcrypt.compare(password, isExistByUsernameCustomer.password);

    if (same) {
      return isExistByUsernameCustomer;
    }
    else {
      return null;
    }
  }

  else {
    return null;
  }

}


// ##############################################################################################################

// Service


async function getService(_, { id }) {

  return (await Service.findById(new mongoose.Types.ObjectId(id)));
}


async function getServiceByName(_, { servicename }) {

  let query = {};

  if (servicename !== "null" && servicename !== "" && servicename !== undefined) {
    query.servicename = servicename;
  }

  return (await Service.find(query));

}

async function getAllServices() {

  return (await Service.find({}));

}


// ##############################################################################################################


//Service Provider Services

async function getServiceProviderService(_, { id }) {

  return (await ServiceProviderService.findById(new mongoose.Types.ObjectId(id)));
}


async function ServiceProviderServiceList(_, { serviceproviderid, serviceid }) {

  let query = {};

  if (serviceproviderid !== "null" && serviceproviderid !== "" && serviceproviderid !== undefined) {
    query.serviceproviderid = serviceproviderid;
  }

  if (serviceid !== "null" && serviceid !== "" && serviceid !== undefined) {
    query.serviceid = serviceid;
  }

  const serviceList = await ServiceProviderService.find(query).populate('serviceid').populate('serviceproviderid');

  console.log("service " + serviceList)

  return serviceList.map((service) => ({
    _id: service._id,
    id: service.id,
    // serviceproviderid: service.serviceproviderid,
    serviceid: service.serviceid.servicename,
    serviceprovidername: service.serviceproviderid.firstname+" " +service.serviceproviderid.lastname,
    serviceprovideremail: service.serviceproviderid.email,
    serviceprovidercontact: service.serviceproviderid.contactnumber,
    hourlyrate: service.hourlyrate,
    experience: service.experience
  }));

}


async function deleteServiceProviderService(_, { id }) {

  await ServiceProviderService.findByIdAndRemove(id)

}




async function createServiceProviderService(_, { serviceproviderid, serviceid, hourlyrate, experience }) {

  const existingServiceProviderService = await ServiceProviderService.findOne({ serviceproviderid, serviceid });
  if (existingServiceProviderService) {
    throw new Error('Service already added to you. Please select a different service!');
  }

  const newServiceProviderService = {
    serviceproviderid,
    serviceid,
    hourlyrate,
    experience
  };

  const PreId = await (ServiceProviderService.find().count());
  newServiceProviderService.id = PreId + 1;

  const createdServiceProviderService = await ServiceProviderService.create(newServiceProviderService);

  return createdServiceProviderService;

}


async function createServiceProviderServiceAvailability(_, { serviceproviderservicesid, servicedate, starttime, endtime, duration }) {

  const existingServiceProviderServiceAvailability = await ServiceProviderAvailability.findOne({ serviceproviderservicesid, servicedate, starttime, endtime });
  if (existingServiceProviderServiceAvailability) {
    throw new Error('Slot already added. Please select a different slot!');
  }

  let isavailable = true;

  const newServiceProviderSlot = {
    serviceproviderservicesid, 
    servicedate, 
    starttime, 
    endtime, 
    duration, 
    isavailable
  };

  const PreId = await (ServiceProviderAvailability.find().count());
  newServiceProviderSlot.id = PreId + 1;

  const createdServiceProviderSlot = await ServiceProviderAvailability.create(newServiceProviderSlot);

  return createdServiceProviderSlot;

}

async function updateServiceProviderService(_, { id, hourlyrate, experience }) {

  await ServiceProviderService.findByIdAndUpdate(id, { hourlyrate: hourlyrate, experience: experience })

  const updatedService = await ServiceProviderService.findById(new mongoose.Types.ObjectId(id))

  return updatedService;
}



// ##############################################################################################################


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