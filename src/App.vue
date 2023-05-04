<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  #app{
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .v-application{
        margin-top: 0 !important;
  }

  .v-carousel__item{
    height: fit-content !important;
  }
  /* .v-data-table td{
    padding: 5px !important;
  } */
  
</style>
