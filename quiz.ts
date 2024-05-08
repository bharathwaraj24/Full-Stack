import * as readlineSync from 'readline-sync';

class Question {
  private _question: string;
  private _options: string[];
  private _correctAnswer: number;

  constructor(question: string, options: string[], correctAnswer: number) {
    this._question = question;
    this._options = options;
    this._correctAnswer = correctAnswer;
  }

  get question(): string {
    return this._question;
  }

  get options(): string[] {
    return this._options;
  }

  checkAnswer(answer: number): boolean {
    return answer === this._correctAnswer;
  }
}

class Quiz {
  private _questions: Question[];
  private _currentQuestionIndex: number;
  private _score: number;

  constructor(questions: Question[]) {
    this._questions = questions;
    this._currentQuestionIndex = 0;
    this._score = 0;
  }

  get currentQuestion(): Question {
    return this._questions[this._currentQuestionIndex];
  }

  nextQuestion(): void {
    if (this._currentQuestionIndex < this._questions.length - 1) {
      this._currentQuestionIndex++;
    } else {
      console.log("End of quiz");
      console.log("Your total score:", this._score, "out of", this._questions.length);
      this._currentQuestionIndex = -1; // Reset currentQuestionIndex
    }
  }

  checkAnswer(answer: number): boolean {
    const isCorrect = this.currentQuestion.checkAnswer(answer);
    if (isCorrect) {
      console.log("Correct!");
      this._score++;
    } else {
      console.log("Incorrect!");
    }
    return isCorrect;
  }

  displayCurrentQuestion(): void {
    const question = this.currentQuestion;
    console.log(question.question);
    question.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }
}

// Example usage
const questions: Question[] = [
  new Question(
    "What is the capital of France?",
    ["Paris", "London", "Berlin", "Madrid"],
    1
  ),
  new Question(
    "What is the largest planet in our solar system?",
    ["Jupiter", "Saturn", "Mars", "Earth"],
    0
  ),
  new Question(
    "What is the chemical symbol for water?",
    ["H2O", "CO2", "O2", "H2SO4"],
    0
  )
];

const quiz = new Quiz(questions);

while (quiz.currentQuestion) {
  quiz.displayCurrentQuestion();
  const answer = parseInt(readlineSync.question("Enter your answer: ")) - 1;
  console.log("Is the answer correct?", quiz.checkAnswer(answer));
  quiz.nextQuestion();
}
