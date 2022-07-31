<template>
  <div class="header__info">
    <span class="header__fio">{{ fio }}</span>
    <a class="header__logout" @click.prevent="logout">Выход</a>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      isAuth: false,
      fio: ''
    }
  },
  mounted() {
    this.isAuth = localStorage.getItem('authData') ? true : false

    if (this.isAuth) {
      this.fio = JSON.parse(localStorage.getItem('authData')).fio
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authData')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.header__fio {
    margin-right: 15px;
}
.header__logout {
    padding: 6px 8px;
    cursor: pointer;
    background: #475168;
    color: #fff;
    text-transform: uppercase;
    border-radius: 4px;
    transition: all .3s ease;
}
.header__logout:hover {
    background: #48cfad;
}
</style>
