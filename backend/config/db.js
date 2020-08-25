const mongoose = require('mongoose')

const connectDB = async () => {
  mongoose.pluralize(null)
  try {
    await mongoose.connect(process.env.MONGODB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log('Conectado a MongoDB')
  } catch (err) {
    console.log('No se ha conectado a MongoDB ' + err)
    process.exit(1)
  }
}
module.exports = connectDB
