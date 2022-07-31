<template>
  <div class="wrapper">
    <header class="header">
      <router-link to="/login">
        <img class="header__logo" src="@/assets/logo.png" alt="logo" />
      </router-link>
    </header>
    <main class="main">
      <router-view/>
    </main>
    <footer class="footer">
      <div class="footer__logo"></div>
      <div class="footer__text">© Андрей Провков 2022</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  src: local("Lato"),
    url("./assets/font/Lato-Regular.ttf") format("truetype");
}

html {
  height: 100%;
}

body {
  font-family: "Lato", "Helvetica", "Arial", sans-serif;
  margin: 0;
  height: 100%;
  color: #797979;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

.main {
  max-width: 1200px;
  margin: auto;
  flex: 1 0 auto;
  padding: 10px;
}

.footer {
  color: #fff;
  flex: 0 0 auto;
}

.footer__logo {
  background-image: url('@/assets/footer.svg');
  min-height: 150px;
}

.footer__text {
  background-color: #2C3E50;
  padding: 10px;
}
</style>
