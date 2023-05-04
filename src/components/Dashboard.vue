<template>
  <v-main>
    <v-container style="display:flex; position:relative;">
      <div class="wrap-count-data" v-if="admin.admin_username == 'admin'">
       <p style="font-size:50px; font-weight:700; color:black;">Halo Admin</p>
      </div>
    </v-container>
  </v-main>

</template>
<script>
  export default {
    data() {
      return {
        admin: '',
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        dialogConfirm: false
      };
    },
    methods:{
     
    },
    mounted() {
       if (localStorage.getItem('admin_id') != null) {
            this.$http.get(this.$api + '/admin/' + localStorage.getItem('admin_id'))
                .then(response => {
                    this.admin = response.data.data;
                }).catch(error => {
                    console.log(error)
                })
        }
    }
  }
</script>
<style>
  .wrap-count-data{
    width:100%;
    max-width: 1200px;
    height:auto;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .v-application p {
    margin-bottom: 0 !important;
  }
</style>