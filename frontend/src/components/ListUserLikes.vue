<script setup>
import { ref } from 'vue';

defineProps(['likes'])

let show = ref(false)

const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark']

function randomVariant() {
    return variants[Math.ceil(Math.random() * variants.length)]
}
</script>

<template>
    <slot :open="() => show = true" name="activator" />

    <b-modal v-model="show" scrollable centered hide-header hide-footer body-class="p-0">
        <b-list-group>
            <b-list-group-item v-for="user in likes" class="d-flex align-items-center">
                <b-avatar class="me-3" :text="user.slice(0, 2)" :variant="randomVariant()"></b-avatar>
                <span class="me-auto">{{ user }}</span>
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>