import performStylish from './stylish.js';
import performPlain from './plain.js';

const formatDiff = (diffTree, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(diffTree);
    case 'stylish':
      return performStylish(diffTree);
    case 'plain':
      return performPlain(diffTree);
    default:
      throw new Error(`Sorry, the '${format}' format is not supported`);
  }
};

export default formatDiff;
