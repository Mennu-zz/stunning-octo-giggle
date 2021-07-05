import {load} from 'cheerio';

const extractTextFromNodes = (node: any) => {
  let text = '';
  if (node.type === 'tag' && node.children) {
    node.children.map((childNode: any) => {
      text += ' ' + extractTextFromNodes(childNode);
    });
  }
  if (node.type == 'text') {
    if ( node.data && !node.data.includes('<') && !node.data.includes('>')) {
      text += ' ' + node.data;
    }
  }
  return text;
};

const htmlTextExtractor = (htmlText: string) => {
  const htmlDoc = load(htmlText);
  return extractTextFromNodes(htmlDoc('body')[0]);
};

export default htmlTextExtractor;
