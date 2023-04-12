import _ from 'lodash'

const getIndent = (depth = 1, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)

const markers = {
    added: '+ ',
    deleted: '- ',
    unmodified: '  ',
    empty: '  '
}

const stringify = (node, depth) => {
    if (!_.isObject(node)) {
        return String(node)
    }
    const lines = Object
        .entries(node)
        .map(([key, value]) => `${getIndent(depth + 1)}${markers.empty}${key}: ${stringify(value, depth + 1)}`)

    return `{\n${lines.join('\n')}\n${getIndent(depth)}  }`
}

const performStylish = (diffTree) => {
    const iter = (node, depth) => {
        const lines = node.flatMap(({key, status, value, children, oldValue, newValue}) =>{
            switch (status) {
            case 'nested':
                return `${getIndent(depth)}${markers.empty}${key}: {\n${iter(children, depth + 1)}\n${getIndent(depth)}  }`
            case 'modified':
                return [`${getIndent(depth)}${markers.deleted}${key}: ${stringify(oldValue, depth)}`,
                    `${getIndent(depth)}${markers.added}${key}: ${stringify(newValue, depth)}`]
            case 'added':
            case 'deleted':
            case 'unmodified':
                return `${getIndent(depth)}${markers[status]}${key}: ${stringify(value, depth)}`
            default:
                throw new Error(`Invalid status '${status}' of property '${key}'`)
            }
        })
        return lines.join('\n')
    }
    return `{\n${iter(diffTree, 1)}\n}`
}

export default performStylish
