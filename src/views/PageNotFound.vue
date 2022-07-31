<template>
  <div class="no-page">
    <img class="no-page__image" src="@/assets/page-not-found.png">
    <h1 class="no-page__title">Запрашиваемая страница не найдена</h1>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>
.no-page__image {
    max-width: 100px;
}
</style>
