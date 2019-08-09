import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: '',
    fruits:[
        {
            name: 'Apple',
            description: 'An apple a day keeps the doctor away.',
            price:'0.008',
            image:'apple.jpg',
            units: 0
        },
        {
            name:'Orange',
            description:'Oranges are low in calories and full of nutrients, they promote clear, healthy and skin.',
            price:'0.019',
            image:'orange.jpg',
            units: 0
        },
        {
            name:'Banana',
            description:'Bananas are one of the most widely consumed fruits in the world for good reason.',
            price:'0.015',
            image:'banana.jpg',
            units: 0
        }
    ]    
  },
  mutations: {
    setFruitUnits (state, fruitUnits) {
      const fruit = state.fruits.filter((item)=>(item.name==fruitUnits.name))
      if (fruit && fruit.length > 0) {
        fruit[0].units = fruitUnits.units
      }
    },
    setContract (state, address) {
      state.contract = address
    },
    clearFruitUnits (state) {
      const newFruits = state.fruits.map(fruit => {
        fruit.units = 0
        return fruit
      })
      state.fruits = newFruits
    }
  },
  getters: {
    totalAmount: state => {
      return state.fruits.reduce((accumulator, currentValue) => (accumulator + Number(currentValue.units) * parseFloat(currentValue.price)), 0)
    },
    getFruitUnits: (state) => (name) => {
      const fruit = state.fruits.filter((item)=>(item.name==name))
      if (fruit && fruit.length > 0) {
        return fruit[0].units
      }
      return 0     
    }
  },
  actions: {

  }
})
