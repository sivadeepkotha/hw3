const wordInput = document.getElementById('wordInput');
const definitionList = document.getElementById('definitionList');

wordInput.addEventListener('input', fetchDefinitions);

async function fetchDefinitions() {
    const word = wordInput.value.trim();
    if (word === '') {
        definitionList.innerHTML = '';
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        definitionList.innerHTML = '';
        data.forEach(entry => {
            const meanings = entry.meanings;
            meanings.forEach(meaning => {
                const partOfSpeech = meaning.partOfSpeech;
                const definitions = meaning.definitions;

                const partOfSpeechItem = document.createElement('li');
                partOfSpeechItem.textContent = `(${partOfSpeech})`;
                definitionList.appendChild(partOfSpeechItem);

                definitions.forEach(definition => {
                    const definitionItem = document.createElement('li');
                    definitionItem.textContent = definition.definition;
                    definitionList.appendChild(definitionItem);
                });
            });
        });
    } catch (error) {
        console.error('Error fetching definitions:', error);
        definitionList.innerHTML = '<li>Error fetching definitions.</li>';
    }
}