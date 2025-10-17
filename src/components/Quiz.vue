<script setup>
import { ref, computed } from 'vue';
import { questions } from '../datas/quizquestions';

const currentQuestionIndex = ref(0);
const score = ref(0);
const answerSelected = ref(false);
const selectedAnswerIndex = ref(null);
const showResults = ref(false);

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const progressText = computed(() => `Question ${currentQuestionIndex.value + 1} of ${questions.length}`);
const nextButtonText = computed(() =>
  currentQuestionIndex.value === questions.length - 1 ? 'See Results' : 'Next Question'
);
const finalScoreText = computed(() => `You scored ${score.value} out of ${questions.length}.`);

function selectAnswer(answerIndex, isCorrect) {
  if (answerSelected.value) return;

  selectedAnswerIndex.value = answerIndex;
  answerSelected.value = true;

  if (isCorrect) {
    score.value++;
  }
}

function nextQuestion() {
  if (!answerSelected.value) return;

  currentQuestionIndex.value++;

  if (currentQuestionIndex.value < questions.length) {
    resetQuestion();
  } else {
    showResultScreen();
  }
}

function resetQuestion() {
  answerSelected.value = false;
  selectedAnswerIndex.value = null;
}

function showResultScreen() {
  showResults.value = true;
}

function restartQuiz() {
  currentQuestionIndex.value = 0;
  score.value = 0;
  showResults.value = false;
  resetQuestion();
}

function getButtonClass(index, answer) {
  if (!answerSelected.value) return 'btn';

  const classes = ['btn'];

  if (index === selectedAnswerIndex.value) {
    classes.push(answer.correct ? 'correct' : 'incorrect');
  }

  if (answer.correct && answerSelected.value) {
    classes.push('correct');
  }

  return classes.join(' ');
}
</script>

<template>
  <div class="quiz-wrapper">
    <div class="app-container">
      <h1>Quiz Kérdések</h1>

      <div v-if="!showResults" id="quiz-content">
        <div id="question-area" class="question-area">
          <p id="question-text">{{ currentQuestion.question }}</p>
        </div>

        <div id="answer-buttons" class="answer-buttons">
          <button v-for="(answer, index) in currentQuestion.answers" :key="index" :class="getButtonClass(index, answer)"
            :disabled="answerSelected" @click="selectAnswer(index, answer.correct)">
            {{ answer.text }}
          </button>
        </div>

        <div class="controls-footer">
          <p id="progress-text">{{ progressText }}</p>
          <button id="next-btn" class="main-btn" :disabled="!answerSelected" @click="nextQuestion">
            {{ nextButtonText }}
          </button>
        </div>
      </div>

      <div v-else id="result-area" class="result-area">
        <h2>Quiz Teljesítve!</h2>
        <p id="final-score">{{ finalScoreText }}</p>
        <button id="restart-btn" class="main-btn" @click="restartQuiz">
          Kezdd újra
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

.quiz-wrapper {
  background: linear-gradient(135deg, #0a1f0a 0%, #0d260d 50%, #0f2f0f 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
}

.app-container {
  background: linear-gradient(145deg, #1a2e1a, #1f3a1f);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 550px;
  transition: all 0.5s ease-in-out;
  border: 1px solid rgba(144, 238, 144, 0.2);
}

h1 {
  text-align: center;
  color: #90ee90;
  margin-bottom: 30px;
  font-size: 2.2em;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(144, 238, 144, 0.3);
}

.question-area {
  background-color: rgba(26, 46, 26, 0.6);
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  backdrop-filter: blur(10px);
}

#question-text {
  font-size: 1.3em;
  color: #e0e0e0;
  line-height: 1.6;
  font-weight: 500;
}

.answer-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 30px;
}

.btn {
  background-color: rgba(31, 58, 31, 0.8);
  color: #90ee90;
  border: 2px solid rgba(144, 238, 144, 0.3);
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;
  text-align: left;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.btn:hover:not([disabled]) {
  background-color: rgba(144, 238, 144, 0.15);
  border-color: #90ee90;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(144, 238, 144, 0.3);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.btn.correct {
  background-color: #28a745;
  border-color: #1e7e34;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.6);
}

.btn.incorrect {
  background-color: #dc3545;
  border-color: #bd2130;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(220, 53, 69, 0.6);
}

.controls-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: 15px;
}

#progress-text {
  color: #a0a0a0;
  font-size: 0.9em;
  font-weight: 500;
}

.main-btn {
  background: linear-gradient(135deg, #90ee90, #32cd32);
  color: #0a1f0a;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(144, 238, 144, 0.3);
}

.main-btn:hover:not([disabled]) {
  background: linear-gradient(135deg, #98fb98, #90ee90);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(144, 238, 144, 0.5);
}

.main-btn:disabled {
  background: #444;
  color: #888;
  cursor: not-allowed;
  box-shadow: none;
}

.result-area {
  text-align: center;
  padding: 30px 10px;
}

.result-area h2 {
  color: #90ee90;
  margin-bottom: 15px;
  font-size: 2em;
  text-shadow: 0 0 20px rgba(144, 238, 144, 0.4);
}

#final-score {
  font-size: 1.8em;
  font-weight: bold;
  color: #98fb98;
  margin-bottom: 30px;
  text-shadow: 0 0 15px rgba(144, 238, 144, 0.4);
}

.hidden {
  display: none !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .app-container {
    padding: 30px 20px;
  }

  h1 {
    font-size: 1.8em;
  }

  #question-text {
    font-size: 1.1em;
  }

  .controls-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .main-btn {
    width: 100%;
  }

  #progress-text {
    text-align: center;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .quiz-wrapper {
    padding: 10px;
  }

  .app-container {
    padding: 20px 15px;
  }

  h1 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  #question-text {
    font-size: 1em;
  }

  .btn {
    font-size: 0.9em;
    padding: 12px;
  }

  .result-area h2 {
    font-size: 1.6em;
  }

  #final-score {
    font-size: 1.4em;
  }
}
</style>