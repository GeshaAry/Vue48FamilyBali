<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <div style="display:flex; justify-content:center; align-items:center; flex-flow:column; min-height:100vh; padding: 50px 0;">
                       <p class="text-oops" style="font-weight:700; font-size:250px; color:white;">Oops!</p>
                       <p class="text-sorry" style="font-size:50px; color:white;">Sorry, this page isn't available</p>
                       <div class="button-visit-home" @click="landingPage">Visit Home</div>
                </div>
            </div>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
              
            };
        },
        methods: {

            landingPage() {
                this.$router.push({
                    name: 'LandingPage',
                });
            },
        },
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .thumbnail {
        width: 100%;
        min-height: 100vh;
        background-image: url("../assets/wallpaperlogin.png");
        background-repeat: no-repeat;
        background-size: cover;
        box-sizing:border-box;
    }
    
    .button-visit-home{
        width: 10%;
        height: 50px;
        background-color: orange;
        color:white;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        cursor: pointer;
    }

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
       .text-oops{
            font-size: 100px !important;
       }

       .text-sorry{
            font-size: 30px !important;
       }

       .button-visit-home{
            width: 50%;
       }
    }
</style>