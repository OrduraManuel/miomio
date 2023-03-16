<template>
    <footer>
        <div class="footer">
        <nav>
            <RouterLink :to="{ name: 'event-list' }">Lotti</RouterLink> |
            <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
        </div>
    </footer>
</template>

<style scoped>
footer{
    background: #f1f1f1;
}
</style>