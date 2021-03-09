<template>
  <div class="w-1/3 mx-auto">
    <h1 class="text-2xl my-4">Assessment Quiz</h1>
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


  </div>

</template>
<script>
export default {
  data: () => ({
    index: 0,
    selectedAnswer: '',
    candidateAnswers: [],
    percentageScore: 0,
    finished: false,
    questions: [
      {
        q: 'What is my name?',
        answers: { a: 'Oladele', b: 'Awilo', c: 'Cyril', d: 'Akanni'},
        correctAnswer: 'c'
      },
      {
        q: 'What is my age?',
        answers: { a: 23, b: 47, c: 32, d: 34},
        correctAnswer: 'd'
      },
    ]
  }),
  methods: {
    pickedAnswer(value) {
      this.selectedAnswer = value
      // record answer
      if (this.selectedAnswer == this.questions[this.index].correctAnswer) {
        this.candidateAnswers.push({correct: 1, wrong: 0});
      } else {
        this.candidateAnswers.push({correct: 0, wrong: 1});

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
      this.precentageScore = this.prepareResults()
      localStorage.setItem('percentage_score', this.precentageScore)
    },

    takeTestAgain() {
      this.index = 0
      this.selectedAnswer = ''
      this.candidateAnswers = []
      this.precentageScore = 0
      this.finished = false
      this.removeFromLocalStorage()
    },

    addToLocalStorage() {
      localStorage.setItem('index', this.index)
      localStorage.setItem('finished', `${this.finished}`)
      localStorage.setItem('candidate_answers', JSON.stringify(this.candidateAnswers))
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

  mounted() {
    if (localStorage.getItem('index') != null &&
      localStorage.getItem('candidate_answers') != null) {
    this.index = localStorage.getItem('index')
    this.finished = () => {
      if (localStorage.getItem('index') === 'false') return false
      if (localStorage.getItem('index') === 'true') return true
    }

    this.candidateAnswers = JSON.parse(localStorage.getItem('candidate_answers'))
    this.percentageScore = parseInt(localStorage.getItem('percentage_score'), 10)
    }
  }
}
</script>
