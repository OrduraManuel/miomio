<script setup>
    import { RouterLink } from 'vue-router'
</script>
<template>
    <header>
        <div class="wrapper">
        <nav>
            <RouterLink :to="{ name: 'event-list' }">Events</RouterLink> |
            <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
        </div>
    </header>
</template>

<style scoped>
header{
    background: #f1f1f1;
}
</style>