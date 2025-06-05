import pkg from 'node-nlp';
const { NlpManager } = pkg;


const manager = new NlpManager({
    languages: ['pt'], 
    forceNER: true
});

export default manager;