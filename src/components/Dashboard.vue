<template>
  <v-main>
    <v-container style="display:flex; position:relative;">
      <div class="wrap-count-data" v-if="admin.admin_username == 'admin'">
        <v-row>
          <v-col cols="12">
            <p style="font-size:50px; float:left; font-weight:700; color:#DA1F1A;">Hello Admin</p>
          </v-col>
          <v-col cols="12">
            <v-layout row wrap justify-center class="my-5">
              <div class="count-rectangle">
                <p style="font-size:40px; font-weight:700; color:white;"> User </p>
                <p class="txtLength">{{ user.length }}</p>
              </div>
              <div class="count-rectangle">
                <p style="font-size:40px; font-weight:700; color:white;"> Transaction Event </p>
                <p class="txtLength">{{ transactionevent.length }}</p>
              </div>
              <div class="count-rectangle">
                <p style="font-size:40px; font-weight:700; color:white;"> Transaction Merchandise </p>
                <p class="txtLength">{{ transactionmerchandise.length }}</p>
              </div>
              <div class="count-rectangle">
                <p style="font-size:40px; font-weight:700; color:white;"> Event </p>
                <p class="txtLength">{{ event.data.length }}</p>
              </div>
              <div class="count-rectangle">
                <p style="font-size:40px; font-weight:700; color:white;"> Merchandise </p>
                <p class="txtLength">{{ merchandise.data.length }}</p>
              </div>
              <div class="count-rectangle">
                <p style="font-size:40px; font-weight:700; color:white;"> Article User </p>
                <p class="txtLength">{{ articleuser.data.length }}</p>
              </div>
            </v-layout>
          </v-col>
        </v-row>

      </div>
    </v-container>
  </v-main>

</template>
<script>
  export default {
    data() {
      return {
        admin: '',
        user: [],
        transactionevent: [],
        transactionmerchandise: [],
        event: [],
        merchandise: [],
        articleuser: [],
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        dialogConfirm: false
      };
    },
    methods: {

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

      //user
       this.$http.get(this.$api + '/user', {
        })
        .then(response => {
          this.user = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
      
      // transaction event
       this.$http.get(this.$api + '/transactionevent', {
        })
        .then(response => {
          this.transactionevent = response.data.data
        })
        .catch(error => {
          console.log(error)
        })

      //transaction merchandise
       this.$http.get(this.$api + '/transactionmerchandise', {
        })
        .then(response => {
          this.transactionmerchandise = response.data.data
        })
        .catch(error => {
          console.log(error)
        })

      //event
       this.$http.get(this.$api + '/event', {
        })
        .then(response => {
          this.event = response.data.data
        })
        .catch(error => {
          console.log(error)
        })

      //merchandise
       this.$http.get(this.$api + '/merchandise', {
        })
        .then(response => {
          this.merchandise = response.data.data
        })
        .catch(error => {
          console.log(error)
        })

      //article user
       this.$http.get(this.$api + '/articleuser', {
        })
        .then(response => {
          this.articleuser = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>
<style>
  
  .count-rectangle{
     width:30%; 
     height:300px; 
     background-color:#DA1F1A;
     margin: 10px;
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-flow: column-reverse;
     border-radius: 20px;
  }
  .txtLength {
    font-size: 80px;
    color: white;
  }


  .v-application p {
    margin-bottom: 0 !important;
  }
</style>