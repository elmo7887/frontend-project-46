import _ from 'lodash'

const stringify = (value) => {
    if (_.isObject(value)) {
        return '[complex value]'
    }
    return _.isString(value) ? `'${value}'` : String(value)
}

const performPlain = (diffTree) => {
    const iter = (node, path) => {
        const lines = node.flatMap((element) => {
            const { key, status } = element

            const currentPath = [...path, key]

            switch (status) {
            case 'nested':
                return iter(element.children, currentPath)
            case 'modified':
                return `Property '${currentPath.join('.')}' was updated. From ${stringify(element.initialValue)} to ${stringify(element.amendedValue)}`
            case 'added':
                return `Property '${currentPath.join('.')}' was added with value: ${stringify(element.value)}`
            case 'deleted':
                return `Property '${currentPath.join('.')}' was removed`
            case 'unmodified':
                return []
            default:
                throw new Error(`Invalid status '${status}' of property '${key}'`)
            }
        })
        return lines.join('\n')
    }
    return iter(diffTree, [])
}

export default performPlain
