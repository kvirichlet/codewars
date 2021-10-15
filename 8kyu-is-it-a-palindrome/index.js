function isPalindrome (originalText) {
  const processedText = originalText.trim().toLowerCase();
  for (let i = 0; i < Math.floor(processedText.length / 2); i++) {
    if (processedText[i] !== processedText[processedText.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

module.exports = isPalindrome;
