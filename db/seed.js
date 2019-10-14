console.log("Seeding ....")

const mongo = require('mongoose')
const host = process.env.HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const db = process.env.DB || 'caminante'
const faker = require('faker/locale/es');

const user = require('../models/user')
const event = require('../models/event')
const comment = require('../models/comment')
const category = require('../models/category')


mongo.connection.on('error', err => console.log(err))

mongo.connect(
  `mongodb://${host}:${dbPort}/${db}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const numberUsers = 100
const numberEvents = 1000
const numberComments = 2000
const numberCategories = 15

mongo.connection.on('connected', () => {
  console.log("DB Coneccted")
  seedCategories()
  seedUsers()
  seedEvents()
  seedComments()
  //user.aggregate([{$sample: {size: 1}}]).then(res => console.log(res[0]._id))
})

function seedUsers() {
  var tmp

  for (let i = 0; i < numberUsers; i++) {
    tmp = new user({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatar: faker.internet.avatar()
    })
    tmp.save((err, usr) => {
      if(err){
        console.log(err)
      } else{
       // console.log(usr)
      }
    })
  }
}

function seedCategories() {
  var tmp

  for (let i = 0; i < numberCategories; i++) {
    tmp = new category({
      category: faker.random.word(),
    })
    tmp.save((err, c) => {
      if(err){
        console.log(err)
      } else{
        //console.log(c)
      }
    })
  }
}

function seedEvents() {
  var tmp

  for (let i = 0; i < numberEvents; i++) {
    user.aggregate([{$sample: {size: 1}}]).then(
      (res) => {
        tmp = new event({
          user_id: res[0]._id,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(3),
          check_number: faker.random.number(125),
          latitude: faker.random.number({min: 60, max: 80}),
          longitude: faker.random.number({min: 60, max: 80}),
        })
        tmp.save((err, e) => {
          if(err){
            console.log(err)
          } else{
            //console.log(e)
          }
        })        
      }
    )
  }
} 

function seedComments() {
  var tmp

  for (let i = 0; i < numberComments; i++) {
    user.aggregate([{$sample: {size: 1}}]).then(
      (randomUser) => {
        user.aggregate([{$sample: {size: 1}}]).then(
          (randomEvent) => {
            if (i == numberComments - 1){
              console.log("Seed finished")
            }
            tmp = new comment({
              user_id: randomUser[0]._id,
              event_id: randomEvent[0]._id,
              comment: faker.lorem.paragraph(4),
              created_date: faker.date.recent()
            })
            tmp.save((err, e) => {
              if(err){
                console.log(err)
              } else{
                //console.log(e)
              }
            })
          } 
        )       
      }
    )
  }
} 