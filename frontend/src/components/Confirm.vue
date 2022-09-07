<script setup>
import { ref } from 'vue';

let show = ref(false)

const emit = defineEmits(['event'])
const props = defineProps(['arg'])

function confirm() {
    show.value = false
    emit('event', props.arg)
}
</script>

<template>
    <slot :open="() => show = true" name="activator" />

    <b-modal v-model="show" title="Confirmar" hide-header-close>
        <b-card-text>Certeza?</b-card-text>

        <template #footer>
            <b-button variant="danger" @click="show = false"> Cancelar </b-button>
            <b-button variant="success" @click="confirm()"> Confirmar </b-button>
        </template>
    </b-modal>
</template>
