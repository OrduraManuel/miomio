<template>
    <div class="container-fluid registerPage">
        <div class="row">
            <div class="col-4 mx-auto">
                    <form @submit.prevent="register" class="card">
                        <div class="card-header">
                            Register components
                        </div>
                        <div class="card-body">
                            <label for="nickname">
                                Nickname:
                            </label>
                            <input v-model="nickname" type="text" name="nickname" value>
                            <label for="email">
                                Email:
                            </label>
                            <input v-model="email" type="email" name="email" value>
                            <label for="password">
                                Password:
                            </label>
                            <input v-model="password" type="password" name="password" value>
                        </div>

                        <div class="card-footer">
                            <button type="submit" name="button">
                                register
                            </button>
                        </div>
                    </form>
                <router-link to="/LoginView" class="goTo">
                    Already have an account? Login.
                </router-link>
            </div>
        </div>
    </div>

  </template>
  
  <script>
  export default {

    methods: {
      register () {
        this.$store
          .dispatch('register', {
            nickname: this.nickname,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({ name: 'dashboard' })
          })
      }
    }
  }
  </script>
  
  <style scoped>
  .registerPage{
    padding: 20px 20px;
  }
  .card-body{
    display:flex;
    flex-direction: column;
    padding: 10% 20%;
  }
  .card{
    margin-bottom: 20px;
  }
  .goTo{
    margin: 20px 0 0 0;
}
  </style>
  