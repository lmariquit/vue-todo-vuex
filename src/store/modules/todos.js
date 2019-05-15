import axios from 'axios'

const state = {
  todos: []
}

const getters = {
  allTodos: state => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    )
    commit('setTodos', data)
  },
  async addTodo({ commit }, title) {
    const { data } = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title,
        completed: false
      }
    )
    commit('newTodo', data)
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    commit('removeTodo', id)
  },
  async filterTodos({ commit }, event) {
    // Get selected number
    const limit = parseInt(
      event.target.options[event.target.options.selectedIndex].innerText
    )
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    )
    commit('setTodos', data)
  },
  async updateTodo({ commit }, updatedTodo) {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo
    )
    commit('updateTodo', data)
  }
}

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
