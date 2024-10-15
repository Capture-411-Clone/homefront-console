export function firstUpperCaseAllWords(str: string) {
  // split by space and capitalize first letter of each word
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function firstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function limitWords(text: string, wordLimit: number, maxCharLimit: number): string {
  const words = text.split(' ');
  const result: string[] = [];
  let currentLength = 0;

  for (let i = 0; i < words.length && result.length < wordLimit; i++) {
    const word = words[i];

    // Check if adding the next word would exceed the max character limit
    if (currentLength + word.length <= maxCharLimit) {
      result.push(word);
      currentLength += word.length + 1; // Add 1 for the space between words
    } else {
      break; // Stop adding words if character limit is reached
    }
  }

  // If truncation happened, add "..."
  const finalText = result.join(' ');
  return finalText.length < text.length ? `${finalText} ...` : finalText;
}
