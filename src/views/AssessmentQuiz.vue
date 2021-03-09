<template>
  <div class="w-1/3 mx-auto">
    <h1 class="text-2xl my-4">Assessment Quiz</h1>
    <div class="p-6 shadow" v-show="!finished">
      <p class="font-semibold text-lg py-2 text-sm">{{ questions[index].q }}</p>
      <label
        :for="key"
        class="block border-2 border-gray-100 rounded-lg px-4 p-2 my-3"
        :class="{ 'hover:border-gray-400 cursor-pointer' : answerWasNotSelected },
        { 'cursor-not-allowed' : answerWasSelected },
        { 'border-red-400 hover:border-red-400' : selectedAnswer != '' && key == selectedAnswer },
        { 'border-green-400 hover:border-green-400' : selectedAnswer != '' && key == questions[index].correctAnswer }"
        v-for="(answer, key) in questions[index].answers"
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

        <button v-show="lastQuestion" class="focus:outline-none rounded-full py-2 px-4 bg-purple-700 text-purple-50 font-medium" @click="showResults">Finish</button>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  data: () => ({
    index: 0,
    selectedAnswer: '',
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
      // show next button
      // record answer
    },

    nextQuestion() {
      if (this.index < this.questions.length - 1) {
        this.index += 1
        this.selectedAnswer = ''

      }
    },

    showResults() {
      this.finished = true
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
    }
  }
}
</script>
