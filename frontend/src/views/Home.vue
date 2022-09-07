<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { usePostsStore } from '../stores/posts'
import Post from '../components/Post.vue'

const auth = useAuthStore()
const posts = usePostsStore()

const message = ref('')

function publicar() {
  posts.postPost(message.value)
  message.value = ''
}

async function passPage(page) {
  await posts.getPosts(page)
  window.scrollTo(0, 0)
}

await posts.getPosts()
</script>

<template>
  <div>
    <b-card no-body v-if="auth.logged" class="mt-4 mb-5">
      <b-form-textarea no-resize v-model="message" placeholder="No que você está pensando?" />
      <b-card-footer class="d-flex justify-content-between">
        <div class="d-flex align-items-center ">
          <b-icon-image class="me-2" />
          <b-icon-file-text class="me-2" />
          <b-icon-youtube class="me-2" />
        </div>
        <b-button variant="primary" @click="publicar()">Publicar</b-button>
      </b-card-footer>
    </b-card>

    <Post v-for="post in posts.posts.results" class="my-3" :post="post" :username="auth.username" :key="post.id" />

    <div class="d-flex justify-content-center mb-3">
      <b-button v-if="posts.posts.previous" @click="passPage(posts.posts.previous)" variant="primary">
        <b-icon-chevron-left /> Anterior
      </b-button>
      <b-button v-if="posts.posts.next" @click="passPage(posts.posts.next)" variant="primary">
        Próximo
        <b-icon-chevron-right />
      </b-button>
    </div>
  </div>
</template>
