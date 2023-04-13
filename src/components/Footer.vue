<template>
    <footer>
        <div class="footer">
        <nav>
            <RouterLink :to="{ name: 'EventList' }">Lotti</RouterLink> |
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