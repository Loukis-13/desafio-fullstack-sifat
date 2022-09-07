<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore()

const user = ref({
  username: '',
  email: '',
  password: '',
  password2: '',
})

const validation = ref({
  password2: null,
})

function onSubmit(event) {
  event.preventDefault()

  if (user.value.password != user.value.password2) {
    validation.value.password2 = false
    return
  }
  validation.value.password2 = null

  auth.register(user.value)
}
</script>
  
  <template>
  <b-card class="mt-5 mx-auto" style="max-width: 40rem;">
    <div class="text-center">
      <b-card-title>Registrar</b-card-title>
      <b-card-text>
        Já tem uma conta? <router-link to="/entrar">Entrar!</router-link>
      </b-card-text>
    </div>

    <b-card-body>
      <b-form @submit="onSubmit">
        <div class="my-4">
          <b-form-group label="Usuário" label-for="username">
            <b-form-input id="username" v-model="user.username" required />
          </b-form-group>

          <b-form-group label="E-mail" label-for="email">
            <b-form-input id="email" type="email" v-model="user.email" required />
          </b-form-group>

          <b-form-group label="Senha" label-for="password">
            <b-form-input id="password" v-model="user.password" type="password" required />
          </b-form-group>

          <b-form-group label="Confirme a senha" label-for="password2">
            <b-form-input id="password2" v-model="user.password2" :state="validation.password2" type="password" required />
            <b-form-invalid-feedback :state="!validation.password2">senhas divergem</b-form-invalid-feedback>
          </b-form-group>
        </div>

        <div class="d-grid">
          <b-button type="submit" size="lg" variant="dark">Entrar</b-button>
        </div>
      </b-form>
    </b-card-body>
  </b-card>
</template>
