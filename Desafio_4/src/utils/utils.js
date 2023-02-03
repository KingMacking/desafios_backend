import {dirname} from 'path'
import {fileURLToPath} from 'url'

//Create dirname
export const __dirname = dirname(fileURLToPath(import.meta.url))