<script setup>
import { ref } from 'vue';
import { usePostsStore } from '../stores/posts';

let args = defineProps(['title', 'message', 'url'])

const posts = usePostsStore()

let show = ref(false)
let message = ref(args.message)

function editar() {
    posts.putPost(args.url, message.value)
    show.value = false
}
</script>

<template>
    <slot :open="() => show = true" name="activator" />

    <b-modal v-model="show" :title="title" size="xl" hide-header-close>
        <b-form-textarea no-resize autofocus v-model="message" />

        <template #footer>
            <b-button variant="danger" @click="show = false">
                Cancelar
            </b-button>
            <b-button variant="success" @click="editar()">
                Confirmar
            </b-button>
        </template>
    </b-modal>
</template>
