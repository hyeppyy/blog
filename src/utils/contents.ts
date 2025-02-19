import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

const extractTableOfContents = async (html: string): Promise<TocItem[]> => {
  if (!html) return [];

  const result: TocItem[] = [];
  let currentLevel1: TocItem | null = null;
  let currentLevel2: TocItem | null = null;

  const extractHeadings = () => (tree: any) => {
    visit(tree, 'element', (node) => {
      if (/^h[1-3]$/.test(node.tagName)) {
        const level = parseInt(node.tagName.charAt(1));
        const id = node.properties?.id?.toString() || '';
        let text = '';
        visit(node, 'text', (textNode) => {
          text += textNode.value;
        });

        const item: TocItem = { id, text, level };
        if (level === 1) {
          currentLevel1 = item;
          result.push(item);
        } else if (level === 2 && currentLevel1) {
          currentLevel2 = item;
          if (!currentLevel1.children) currentLevel1.children = [];
          currentLevel1.children.push(item);
        } else if (level === 3 && currentLevel2) {
          if (!currentLevel2.children) currentLevel2.children = [];
          currentLevel2.children.push(item);
        }
      }
    });
  };

  await unified()
    .use(rehypeParse, { fragment: true })
    .use(extractHeadings)
    .use(rehypeStringify)
    .process(html);

  return result;
};

export default extractTableOfContents;
