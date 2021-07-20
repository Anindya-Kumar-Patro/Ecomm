const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


dotenv.config({path: 'server/config/config.env'});

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server has startted on ${process.env.PORT}`);
})

process.on('unhandledRejection', err=>{
    console.log(`Error:${err.message}`)
    console.log('Shutting down server due to Unhandled promise rejection')
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException', err=>{
    console.log(`Error:${err.message}`)
    console.log('Shutting down server due to Uncaught Exception')
    server.close(()=>{
        process.exit(1)
    })
})
    