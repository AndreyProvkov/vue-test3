<template>
    <div class="login">
        <h2 class="login__title">Вход в личный кабинет</h2>
        <form @submit.prevent="submit" class="login__form">
            <input v-model.trim="request.login" class="login__input" type="text" placeholder="Логин" />
            <input v-model.trim="request.password" class="login__input" type="password" placeholder="Пароль" />
            <div v-if="errors.length" class="login__error">{{ currentError }}</div>
            <button class="login__btn" type="submit">Войти</button>
        </form>
    </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default {
    name: 'LoginForm',
    data () {
        return {
            valid: true,
            auth: false,
            errors: [],
            request: {
                login: '',
                password: '',
                IMEI: '',
                Name_app: 'connect'
            },
            response: {
                fio: '',
                TK: '',
                IMEI: '',
                id_login: 0
            }
        }
    },
    created () {
        this.getFingerprint()
    },
    watch: {
        response: {
            handler (val) {
                localStorage.setItem('authData', JSON.stringify(val))
            },
            deep: true
        }
    },
    methods: {
        async submit () {
            let responseData

            this.errors = []

            this.validate()

            if (this.valid) {
                responseData = await this.authentication()

                this.auth = this.checkResponseData(responseData)
            }
            if (this.auth) {
                this.setResponseData(responseData)
                if (this.$route.query.redirect) {
                    this.$router.push({
                        path: `${this.$route.query.redirect}`
                    })
                } else {
                    this.$router.push({
                        path: `/user/${this.response.id_login}`
                    })   
                }
                
            }
        },
        validate () {
            const regex = /\s+/gi

            if (regex.test(this.request.login) || (regex.test(this.request.password))) {
                this.valid = false
                this.errors.push('Логин / Пароль должны быть без пробелов')
            } else {
                this.valid = true
            }
        },
        checkResponseData (data) {
            if (!data) {
                this.errors.push('Ошибка запроса')
                return false
            }
            if (!data.id_login) {
                if (!this.errors.includes(data.err_text)) {
                    this.errors.push(data.err_text)
                }
                return false
            }
            return true
        },
        async getFingerprint () {
            const fpPromise = FingerprintJS.load()

            const fp = await fpPromise
            const result = await fp.get()

            this.request.IMEI = result.visitorId
        },
        async authentication () {
            const objToJson = JSON.stringify(this.request)
            try {
                const res = await fetch(`https://host1.medsafe.tech:40443/api/client_login?json=${objToJson}`)
                const data = await res.json()
                return data[0]
            } catch (e) {
                this.auth = false
            }
        },
        setResponseData (obj) {
            let { fio, id_login, TK} = obj

            this.response.fio = fio
            this.response.id_login = id_login
            this.response.TK = TK
            this.response.IMEI = this.request.IMEI
        }
    },
    computed: {
        currentError () {
            return this.errors[0]
        }
    }
}
</script>

<style>
.login {
    max-width: 350px;
    margin: auto;
}
.login__title {
    font-size: 30px;
    line-height: 1.1;
    font-weight: bold;
    margin: 0 0 10px 0;
}

.login__input {
    border: 1px solid #e2e2e4;
    box-shadow: none;
    display: block;
    height: 24px;
    width: calc(100% - 24px);
    font-size: 14px;
    padding: 6px 12px;
    margin-bottom: 10px;
    outline: none;
    color: #797979;
}
.login__input::placeholder {
    color: #c2c2c2;
}
.login__error {
    color: red;
    margin: 5px 0;
}
.login__btn {
    background: #475168;
    color: #fff;
    text-transform: uppercase;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    padding: 20px 40px;
    margin-top: 10px;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
}
.login__btn:hover {
    background: #48cfad;
}
.login__btn:disabled {
    cursor: default;
    background-color: gray;
}
</style>