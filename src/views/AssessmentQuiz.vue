<template>
  <layout>
    <h1 class="text-2xl my-4 mx-8 md:mx-0">Assessment Quiz</h1>
    <div class="p-6 shadow">
      <div v-show="!finished">
        <p class="font-semibold text-lg py-2 text-sm">{{ questions[index].q }}</p>
        <label
          :for="key"
          class="block border-2 border-gray-100 rounded-lg px-4 p-2 my-3"
          :class="{ 'hover:border-gray-400 cursor-pointer' : answerWasNotSelected },
          { 'cursor-not-allowed' : answerWasSelected },
          { 'border-red-400 hover:border-red-400' : selectedAnswer != '' && key == selectedAnswer },
          { 'border-green-400 hover:border-green-400' : selectedAnswer != '' && key == questions[index].correctAnswer }"
          v-for="(answer, key) in questions[index].answers"
          :key="key"
        >
          <input
            type="radio"
            :id="key"
            class="hidden"
            :value="key"
            @click="pickedAnswer(key)"
            :disabled="answerWasSelected"
          />{{ answer }}
        </label>
        <div class="flex justify-end mt-6">
          <button v-show="answerWasSelected" class="focus:outline-none rounded-full py-2 px-4 bg-purple-700 text-purple-50 font-medium" @click="nextQuestion">Next &gt;</button>

          <button v-show="lastQuestion && selectedAnswer" class="focus:outline-none rounded-full py-2 px-4 bg-purple-700 text-purple-50 font-medium" @click="showResults">Finish</button>
        </div>
      </div>
      <div v-show="finished">
        <div>
        <p class="text-xl font-semibold">Congratulations!</p>
        <span>
          Your Cybercrime Assessment score is {{ percentageScore }}%
        </span>
        </div>
        <div class="flex justify-end mt-6">
          <button class="focus:outline-none rounded-full py-2 px-4 bg-purple-700 text-purple-50 font-medium" @click="takeTestAgain">Take test again!</button>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from './Layout.vue'
import Questions from '../questions'
export default {
  components: {
    Layout,
  },
  data: () => ({
    index: 0,
    selectedAnswer: '',
    candidateAnswers: [],
    percentageScore: 0,
    finished: false,
    questions: Questions,
  }),
  methods: {
    pickedAnswer(value) {
      this.selectedAnswer = value
      // record answer
      if (this.selectedAnswer == this.questions[this.index].correctAnswer) {
        this.candidateAnswers.push({choice: value, correct: 1, wrong: 0});
      } else {
        this.candidateAnswers.push({choice: value, correct: 0, wrong: 1});

      }
      // add to localStorage
      this.addToLocalStorage()
    },

    nextQuestion() {
      if (this.index < this.questions.length - 1) {
        this.index += 1
        this.selectedAnswer = ''

      }
    },

    prepareResults() {
      const totalScore = this.candidateAnswers.reduce((acc, cur) => {
       return acc + cur.correct
      }, 0)
      const percentageScore = (totalScore / this.numberOfQuestions) * 100
      return percentageScore
    },

    showResults() {
      this.finished = true
      localStorage.setItem('finished', this.finished)
      this.percentageScore = Math.round(this.prepareResults())
      localStorage.setItem('percentage_score', this.percentageScore)
    },

    takeTestAgain() {
      this.index = 0
      this.selectedAnswer = ''
      this.candidateAnswers = []
      this.percentageScore = 0
      this.finished = false
      this.removeFromLocalStorage()
    },

    addToLocalStorage() {
      localStorage.setItem('index', this.index)
      localStorage.setItem('finished', `${this.finished}`)
      localStorage.setItem('candidate_answers', JSON.stringify(this.candidateAnswers))
      localStorage.setItem('percentage_score', this.percentageScore)
    },

    removeFromLocalStorage() {
      localStorage.clear()
    }



  },
  computed: {
    answerWasSelected() {
      return this.selectedAnswer != '' && !this.lastQuestion
    },

    answerWasNotSelected() {
      return this.selectedAnswer == ''
    },

    lastQuestion() {
      return this.index == this.questions.length - 1;
    },

    numberOfQuestions() {
      return this.questions.length
    }
  },

  watch: {
    index: function (value, oldValue) {
      if (value !== (oldValue + 1)) {
        this.index = 0
        this.removeFromLocalStorage()
      }
    }
  },

  mounted() {
    if (localStorage.getItem('index') != null &&
      localStorage.getItem('candidate_answers') != null) {
    this.index = parseInt(localStorage.getItem('index'), 10)
    this.finished = function() {
      if ( localStorage.getItem('finished') === 'false' ) return false
      if ( localStorage.getItem('finished') === 'true' ) return true
    }()
    this.candidateAnswers = JSON.parse(localStorage.getItem('candidate_answers'))
    this.percentageScore = parseInt(localStorage.getItem('percentage_score'), 10)
    this.selectedAnswer = (this.finished == false) ? this.candidateAnswers[this.index].choice : ''
    }
  }
}
</script>
