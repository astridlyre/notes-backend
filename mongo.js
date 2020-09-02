const mongoose = require('mongoose')

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhonebookEntry = mongoose.model('Number', numberSchema)

if (process.argv.length < 3) {
  console.log(
    'Please provide the following arguments: node mongo.js <password> <entry-name> <entry-number>'
  )
  process.exit(1)
}

if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@mymongodb.cgiti.mongodb.net/phonebook-app?retryWrites=true`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  PhonebookEntry.find({}).then(result => {
    console.log('Phonebook entries:')
    for (let i = 0; i < result.length; i++) {
      console.log(
        `${i + 1} - Name: ${result[i].name} Number: ${result[i].number} Id: ${
          result[i]._id
        }`
      )
    }
    mongoose.connection.close()
  })
}

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log(
    'Please provide the following arguments: node mongo.js <password> <entry-name> <entry-number>'
  )
  process.exit(1)
}

if (process.argv.length === 5) {
  const password = process.argv[2]
  const entryName = process.argv[3]
  const entryNumber = process.argv[4]
  const url = `mongodb+srv://fullstack:${password}@mymongodb.cgiti.mongodb.net/phonebook-app?retryWrites=true`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  const number = new PhonebookEntry({
    name: entryName,
    number: entryNumber,
  })

  number.save().then(result => {
    console.log(
      `Added ${result.name} (Number: ${result.number}) to the phonebook.`
    )
    mongoose.connection.close()
  })
}
