import _ from 'lodash'

const sortKeys = (data1, data2) => {
    const keys1 = Object.keys(data1)
    const keys2 = Object.keys(data2)
    const sortedKeys = _.sortBy(_.union(keys1, keys2))
    return sortedKeys
}

const buildTree = (data1, data2) => {
    const keys = sortKeys(data1, data2)
    const diffTree = keys.map((key) => {
        const oldValue = data1[key]
        const newValue = data2[key]
        switch (true) {
        case _.isObject(oldValue) && _.isObject(newValue):
            return { key, children: buildTree(oldValue, newValue), status: 'nested' }
        case !_.has(data1, key) && _.has(data2, key):
            return { key, value: data2[key], status: 'added' }
        case _.has(data1, key) && !_.has(data2, key):
            return { key, value: data1[key], status: 'deleted' }
        case _.has(data1, key) && _.has(data2, key):
            if (oldValue === newValue) {
                return { key, value: oldValue, status: 'unmodified' }
            }
            return {
                key, oldValue, newValue, status: 'modified'
            }
        default:
            throw new Error(`Unknown state of property '${key}'`)
        }
    })
    return diffTree
}

export default buildTree
