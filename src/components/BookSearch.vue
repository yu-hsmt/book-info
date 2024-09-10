<template>
  <v-container>
    <v-text-field
      v-model="query"
      label="Search for books"
      @keyup.enter="searchBooks"
      class="mb-4"
    ></v-text-field>
    <v-btn @click="searchBooks">Search</v-btn>

    <v-alert type="error" v-if="error">{{ error }}</v-alert>
    <v-row v-if="books.length">
      <v-col
      v-for="book in books"
      :key="book.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      >
      <v-card class="mx-auto" max-width="400">
        <v-card-title>{{ book.volumeInfo.title }}</v-card-title>
        <v-card-subtitle>{{ book.volumeInfo.authors?.join(', ') }}</v-card-subtitle> <!--「?」ってなに？ -->
        <v-card-text>
          <div>{{ book.volumeInfo.publishedDate }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn :href="book.volumeInfo.previewLink" target="_blank">Preview</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const query = ref('');
const store = useStore();

const books = computed(() => store.state.books); //storeのstateの「books」の値をbooksとする
const error = computed(() => store.state.error); //storeのstateの「error」の値をerrorとする

const searchBooks = () => { //以下を「searchBooks」とする
  if(query.value.trim() !== '') { //queryが空でなければ
    store.dispatch('fetchBooks', query.value); //storeの「fetchBooks」にqueryのvalueをいれて実行
  }
}
</script>