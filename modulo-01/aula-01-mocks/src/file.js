const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File {

    static async csvToJSON(filePath) {
        const content = await readFile(filePath, "utf8")

        const validation = this.isValid(content)

        if(!validation.valid) throw new Error(validation.error)

        const result = this.parseCSVtoJSON(content)

        return result
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...lines] = csvString.split(/\r?\n/)

        const isHeaderValid = options.fields.join(',') === header

        if(!isHeaderValid){
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
        
        if(
            !lines.length ||
            lines.length > options.maxLines
        ){
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return {
            valid: true
        }
    }

    static parseCSVtoJSON(csvString){
        const lines = csvString.split(/\r?\n/)
        const header = lines.shift().split(',')

        const formattedObjects = lines.map(line => {
            const lineValue = line.split(',')

            const formattedObject = {}

            for(const index in lineValue){
                formattedObject[header[index]] = lineValue[index].trim()
            }

            return formattedObject
        })

        return formattedObjects
    }
}

module.exports = File