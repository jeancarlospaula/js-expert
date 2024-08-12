const assert = require("assert")
const { error } = require("./src/constants");
const File = require("./src/file")

;(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)

        const result = File.csvToJSON(filePath)

        await assert.rejects(result, expected)

        console.log('OK - Deveria lançar erro quando o arquivo for vazio')
    }

    {
        const filePath = './mocks/header-invalid.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)

        const result = File.csvToJSON(filePath)

        await assert.rejects(result, expected)

        console.log('OK - Deveria lançar erro quando headers forem inválidos')
    }

    {
        const filePath = './mocks/fourItems-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)

        const result = File.csvToJSON(filePath)

        await assert.rejects(result, expected)

        console.log('OK - Deveria lançar erro quando tiver mais linhas que o permitido')
    }

    {
        const filePath = './mocks/threeItems-valid.csv'
        const expected = [
            {
                id: '1',
                name: "tião",
                profession: "programador",
                age: '21'
            },
            {
                id: '2',
                name: "ricardo",
                profession: "vendedor",
                age: '22'
            },
            {
                id: '3',
                name: "tonho",
                profession: "empresario",
                age: '23'
            }
        ]

        const result = await File.csvToJSON(filePath)

        assert.deepStrictEqual(result, expected)

        console.log('OK - Deveria converter CSV para JSON quando tudo estiver correto')
    }
})()