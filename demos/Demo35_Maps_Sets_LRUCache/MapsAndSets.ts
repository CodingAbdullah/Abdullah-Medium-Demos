let characterMap = new Map<String, Number>();
let characterSet = new Set();
let word = 'aabacab';

// Setting character map..
for (let i = 0; i < word.length; i++){
    // Setting map for strings to be used for string occurrances
    characterMap.set(word.charAt(i), !characterMap.get(word.charAt(i)) ? 1 : Number(characterMap.get(word.charAt(i))) + 1 );
}

// Setting character set..
for (let j = 0; j < word.length; j++){
    characterSet.add(word.charAt(j));
}

console.log(characterMap);
console.log(characterSet);