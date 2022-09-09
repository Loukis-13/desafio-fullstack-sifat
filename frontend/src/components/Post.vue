<script setup>
import { capitalize } from 'vue';
import { usePostsStore } from '../stores/posts'
import PostModal from './PostModal.vue';
import Confirm from './Confirm.vue';
import ListUserLikes from './ListUserLikes.vue';

const posts = usePostsStore()

let x = defineProps(['post', 'username', 'isLogged'])

function data(d) {
    return new Date(d).toLocaleDateString('pt-br', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
    <b-card class="my-3">
        <template #header>
            <div class="d-flex justify-content-between">
                <div>
                    <b-avatar button @click="() => { }" :text="post.username.slice(0, 2)" :title="post.username" />
                    {{ capitalize(post.username) }}
                </div>
                <b-dropdown v-if="post.username == username" right text="Menu">
                    <post-modal title="Editar" :message="post.message" :url="post.url">
                        <template v-slot:activator="{ open }">
                            <b-dropdown-item @click="open"> Editar </b-dropdown-item>
                        </template>
                    </post-modal>
                    <confirm @event.once="(url) => posts.exclude(url)" :arg="post.url">
                        <template v-slot:activator="{ open }">
                            <b-dropdown-item @click="open"> Excluir </b-dropdown-item>
                        </template>
                    </confirm>
                </b-dropdown>
            </div>
        </template>

        <b-card-text>{{ post.message }}</b-card-text>

        <template #footer>
            <div class="d-flex justify-content-between">
                <b-button-group v-if="isLogged" size="sm" class="text-nowrap me-3">
                    <b-button variant="primary" @click="posts.like(post.url)">
                        <b-icon-hand-thumbs-up-fill v-if="post.likes.includes(username)" />
                        <b-icon-hand-thumbs-up v-else />
                        Like
                    </b-button>
                    <list-user-likes :likes="post.likes">
                        <template v-slot:activator="{ open }">
                            <b-button variant="outline-primary" @click="open" :disabled="post.likes.length == 0">
                                {{ post.likes.length }}
                            </b-button>
                        </template>
                    </list-user-likes>
                </b-button-group>

                <small class="text-muted text-truncate my-auto">
                    Publicado em {{ data(post.created_at) }}
                    {{ +new Date(post.created_at) != +new Date(post.updated_at) ? `, editado em ${data(post.updated_at)}` : "" }}
                </small>
            </div>
        </template>
    </b-card>
</template>
