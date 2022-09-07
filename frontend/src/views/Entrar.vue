<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore()

const user = ref({
  username: '',
  password: '',
})

function onSubmit(event) {
  event.preventDefault()
  auth.login(user.value)
}
</script>

<template>
  <b-card class="mt-5 mx-auto" style="max-width: 40rem;">
    <div class="text-center">
      <b-card-title>Entrar</b-card-title>
      <b-card-text>
        Não tem uma conta? <router-link to="/registrar">Registrar!</router-link>
      </b-card-text>
    </div>

    <b-card-body>
      <b-form @submit="onSubmit">
        <div class="my-4">
          <b-form-group label="Usuário" label-for="username">
            <b-form-input id="username" v-model="user.username" required />
          </b-form-group>

          <b-form-group label="Senha" label-for="password">
            <b-form-input id="password" v-model="user.password" type="password" required />
          </b-form-group>
        </div>

        <div class="d-grid">
          <b-button type="submit" size="lg" variant="dark">Entrar</b-button>
        </div>
      </b-form>
    </b-card-body>
  </b-card>
</template>
