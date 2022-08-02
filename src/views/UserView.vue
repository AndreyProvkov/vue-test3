<template>
  <div class="documents">
    <h2 class="documents__title">Список документов</h2>
    <p class="documents__download-error" v-if="isDownloadError">Ошибка загрузки файла</p>
    <p v-if="!endLoad">Загрузка...</p>
    <p v-else-if="isError">{{ showError }}</p>
    <ul v-else class="item-wrapper">
      <li 
        v-for="doc in documents"
        :key="doc.id_document"
        class="documents__item"
      >
        <a href="#" @click.prevent="downloadDocument(doc)" class="documents__link">
          <img class="documents__link-img" :src="require(`@/assets/ext-icon/${doc.file_ext}-icon.svg`)" />
        </a>
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
      isDownloadError: false,
      errors: [],
      documents: [],
      downloadRequest: {
        id_login: '',
        id_people: '',
        TK: '',
        IMEI: '',
        Name_app: 'connect',
        Name_event: 'get_pic_path', 
        id_document: '',
        doc_type: ''
      }
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
    fillRequestParams(doc = null, type = 'documents') {
      const { id_login, TK, IMEI } = JSON.parse(localStorage.getItem('authData'))
      if (type === 'documents') {
        return {
          id_login: id_login,
          id_people: id_login,
          TK: TK,
          IMEI: IMEI,
          Name_app: 'connect',
          Name_event: 'list_load'
        }
      }
      if (type === 'download') {
        return {
          id_login: id_login,
          id_people: id_login,
          TK: TK,
          IMEI: IMEI,
          Name_app: 'connect',
          Name_event: 'get_pic_path', 
          id_document: doc.id_document,
          doc_type: doc.doc_type
        }
      }
    },
    async downloadDocument (doc) {
      try {
        const obj = JSON.stringify(this.fillRequestParams(doc, 'download'))
        const res = await fetch(`https://host1.medsafe.tech:40443/api/test?json=${obj}`)
        const data = await res.json()

        const currentHref = `https://host1.medsafe.tech:40443/${data.body[0].hash}`
        window.location.href = currentHref
      } catch {
        this.isDownloadError = true
        setTimeout(() => {
          this.isDownloadError = false
        }, 1500);
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
  position: relative;
}
.documents__download-error {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
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
.documents__link {
  display: inline-block;
  height: 100%;
  margin-right: 10px;
}
.documents__link-img {
  width: 35px;
}
</style>