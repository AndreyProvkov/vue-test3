<template>
  <div class="documents">
    <h2 class="documents__title">Список документов</h2>
    <p v-if="!endLoad">Загрузка...</p>
    <p v-else-if="isError">{{ showError }}</p>
    <ul v-else class="item-wrapper">
      <li 
        v-for="doc in documents"
        :key="doc.id_document"
        class="documents__item"
      >
        <span class="documents__description">{{ doc.doc_name }} от {{ doc.date_doc }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data() {
    return {
      endLoad: false,
      isError: false,
      errors: [],
      documents: []
    }
  },
  async mounted() {
    this.documents = await this.getDocumentsItem()
    this.endLoad = true
    
    if (this.documents.length === 0) {
      this.isError = true
      this.errors.push('Документы отсутствуют')
    }
  },
  methods: {
    async getDocumentsItem() {
      try {
        const obj = JSON.stringify(this.fillRequestParams())
        const res = await fetch(`https://host1.medsafe.tech:40443/api/test?json=${obj}`)
        const data = await res.json()
        return data.body
      } catch {
        this.isError = true
        this.errors.push('Ошибка загрузки')
      }
    },
    fillRequestParams() {
      const obj = JSON.parse(localStorage.getItem('authData'))
      return {
        id_login: obj.id_login,
        id_people: obj.id_login,
        TK: obj.TK,
        IMEI: obj.IMEI,
        Name_app: 'connect',
        Name_event: 'list_load'
      }
    }
  },
  computed: {
    showError() {
      return this.errors[0]
    }
  }
}
</script>

<style scoped>
.documents {
  width: 70%;
  margin: auto;
}
.item-wrapper {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
}
.documents__item {
  margin-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 15px;
}
</style>