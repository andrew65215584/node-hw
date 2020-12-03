const express = require('express')
const cors = require("cors")

const { HttpCode } =require("./helpers/constants")
const routerContacts = require("./routers/contacts/index")

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/contacts', routerContacts)

// ОБработчик, если не нашёлся данный путь. 

app.use((req, res, next) => {
    res.status(HttpCode.NOT_FOUND).json({
        status: 'error', 
        code: HttpCode.NOT_FOUND,
        message: `Use api on routes ${req.baseUrl}/api/contacts `,
        data: 'Not Found'
    })
})

// ОБработчик, если пришла ошибка .
app.use((err, req, res, next) => {
    err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
   
    res.status(err.status).json({
        status: error.status === 500 ? "fail": 'error', 
        code: err.status,
        message: err.message,
        data: err.status === 500 ? "Internal Server Error" : err.data
    })
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server start on port ${PORT}`))