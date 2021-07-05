import {processTextToWords, wordCounter} from '../';
import htmlTextExtractor from '../htmlTextExtractor';

describe('lib.ts', () => {
  describe('HTML Extractor', () => {
    it('returns HTML text', () => {
      const urlResponse = `
            <html>
                <body>
                    Hello World
                    <img src="testing.jpg" />
                    <script>testing</script>
                </body>
            </html>
            `;
      expect(htmlTextExtractor(urlResponse).trim()).toBe('Hello World');
    });

    it('returns empty string if html body is empty', () => {
      const urlResponse = `
            <html>
                <script>testing</script>
            </html>
            `;
      expect(htmlTextExtractor(urlResponse).trim()).toBe('');
    });
  });

  describe('Word Counter', () => {
    it('returns number of word occurrences', async () => {
      const wordOcc = wordCounter(processTextToWords('Tell the audience what you\'re going to say. Say it. Then tell them what you\'ve said.'));
      expect(wordOcc).toMatchObject({
        'tell': 2,
        'the': 1,
        'audience': 1,
        'what': 2,
        'you\'re': 1,
        'going': 1,
        'to': 1,
        'say': 2,
        'it': 1,
        'then': 1,
        'them': 1,
        'you\'ve': 1,
        'said': 1,
      });
    });
  });
});
