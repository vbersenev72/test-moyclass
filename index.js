const express = require('express')
const DataRouter = require('./routers/data.router')
const LessonsRouter = require('./routers/lessons.router')


const app = express()
app.use(express.json())
app.use('/data', DataRouter)
app.use('/lessons', LessonsRouter)


const PORT = 5000


const start = () => {
    try {
        app.listen(5000, () => console.log(`server started at : ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}
start()