import {createPool} from 'mysql2/promise'
import { configurationDatabase } from './config.js'

export const pool = createPool(configurationDatabase)
