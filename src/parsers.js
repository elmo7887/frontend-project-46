import yaml from 'js-yaml'

const parseData = (data, dataFormat) => {
    switch (dataFormat) {
    case 'json':
        return JSON.parse(data)
    case 'yml':
    case 'yaml':
        return yaml.load(data)
    default:
        throw new Error(`Sorry, the '${dataFormat}' data format is not supported`)
    }
}

export default parseData
