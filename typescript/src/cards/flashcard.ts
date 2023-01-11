
interface FlashCard {
  getQuestion: () => string
  getAnswer: () => string

  /**
   * Checks whether the provided response matches the target, ignoring minor issues in capitalization and whitespace.
      * @param response The user-provided response.
      * @return {@code true} if the definition matches the response.
      */
  checkSuccess: (response: string) => boolean

  toString: () => string

  equals: (otherCard: FlashCard) => boolean
}

/**
 * create a new flashcard with a title and a definition
 * @param title
 * @param definition
 * @returns new flash card
 */
function newFlashCard (question: string, answer: string): FlashCard {
  return {
    getQuestion: function (): string { return question },
    getAnswer: function (): string { return answer },
    checkSuccess: function (response: string): boolean {
      return answer.trim().toLowerCase() === response.trim().toLowerCase()
    },
    toString: () => {
      return 'FlashCard[' + question + ', ' + answer + ']'
    },
    equals: function (otherCard: FlashCard): boolean {
      return otherCard.getAnswer() === answer && otherCard.getQuestion() === question
    }
  }
}

export { FlashCard, newFlashCard }
