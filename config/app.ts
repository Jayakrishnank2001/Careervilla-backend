import express from 'express'
import cors from 'cors'
import http from 'http'
import cookieParser from 'cookie-parser'


export const createServer=()=>{
    const app=express()
    const httpServer=http.createServer(app)
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())

    app.use(
        cors({
            origin:process.env.CORS_URL,
            credentials:true
        })
    )
    return app
}