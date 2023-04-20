import { config } from "dotenv";
config()

export const configurationDatabase = {
    host:'localhost',
    user:'root',
    password:process.env.DB_PASSWORD,
    database:'tasksb'
}