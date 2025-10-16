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
  <div class="app-container">
    <h1><span class="highlight-text">🧠</span> General Knowledge Quiz</h1>

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
      <h2>Quiz Complete! 🎉</h2>
      <p id="final-score">{{ finalScoreText }}</p>
      <button id="restart-btn" class="main-btn" @click="restartQuiz">
        Restart Quiz
      </button>
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /* Use a modern, clean font */
  font-family: 'Poppins', sans-serif;
}

body {
  background: linear-gradient(135deg, #b9f2ff, #20b2aa);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.app-container {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 550px;
  transition: all 0.5s ease-in-out;
}

h1 {
  text-align: center;
  color: #008080;
  margin-bottom: 30px;
  font-size: 2.2em;
  font-weight: 700;
}

.highlight-text {
  color: #ff8c00;
  margin-right: 5px;
}

.question-area {
  background-color: #f7ffff;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
}

#question-text {
  font-size: 1.3em;
  color: #333;
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
  background-color: #fff;
  color: #008080;
  border: 2px solid #b9f2ff;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;
  text-align: left;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.btn:hover:not([disabled]) {
  background-color: #e0ffff;
  border-color: #008080;
  transform: translateY(-2px);
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
  box-shadow: 0 0 10px #28a74580;
}

.btn.incorrect {
  background-color: #dc3545;
  border-color: #bd2130;
  color: white;
  font-weight: bold;
}

.controls-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

#progress-text {
  color: #6c757d;
  font-size: 0.9em;
  font-weight: 500;
}

.main-btn {
  background-color: #ff8c00;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  transition: background-color 0.3s;
}

.main-btn:hover:not([disabled]) {
  background-color: #e67e00;
}

.main-btn:disabled {
  background-color: #cccccc;
  color: #999999;
  cursor: not-allowed;
}


.result-area {
  text-align: center;
  padding: 30px 10px;
}

.result-area h2 {
  color: #008080;
  margin-bottom: 15px;
  font-size: 2em;
}

#final-score {
  font-size: 1.8em;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 30px;
}

.hidden {
  display: none !important;
}
</style>