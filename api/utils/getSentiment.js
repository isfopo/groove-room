const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const stopWord = require('stopword');


const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

module.exports = (content) => {

    const lexed = aposToLexForm(content);
    const cased = lexed.toLowerCase();
    const alphaOnly = cased.replace(/[^a-zA-Z\s]+/g, '');
    const tokenized = tokenizer.tokenize(alphaOnly);

    tokenized.forEach((word, index) => {
        tokenized[index] = spellCorrector.correct(word);
    })

    const filtered = stopWord.removeStopwords(tokenized);
    const analysis = analyzer.getSentiment(filtered);

    return analysis;
}