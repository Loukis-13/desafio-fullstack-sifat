<script setup>
import { useAuthStore } from './stores/auth';
const auth = useAuthStore()
</script>

<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Blog</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-text>Desafio Fullstack</b-nav-text>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto" v-if="!auth.logged">
          <b-nav-item to="/entrar">Entar
            <BIconPerson />
          </b-nav-item>
          <b-nav-item to="/registrar">Registrar
            <BIconBoxArrowInRight />
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ms-auto" v-else>
          <b-nav-item to="/" v-on:click="auth.logout">Sair
            <BIconBoxArrowInLeft />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

  <b-container>
    <Suspense>
      <router-view />
    </Suspense>
  </b-container>
</template>
