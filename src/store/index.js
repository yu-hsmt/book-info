import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    books: [],
    error: null,
  },
  mutations: {
    setBooks(state, books) {
      state.books = books; //stateのbooksにbooksの中に入っている値を入れる
    },
    setError(state, error) {
      state.error = error; //stateのerrorにerrorの中に入っている値を入れる
    }
  },
  actions: {
    async fetchBooks({ commit }, query) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}` //※「query」は検索ボックスに入力した文字列
        );
        commit('setBooks', response.data.items || []); //mutationsのsetBooksに、response.data.itemsがあればそれを、なければ空の配列を入れる
      } catch (error) {
        commit('setError', 'Failed to fetch books.') //エラーの場合、mutationsのsetErrorに、「Failed to fetch books.」を入れる
      }
    },
  },
});