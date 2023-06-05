<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <div style="display:flex; justify-content:center; align-items:center; min-height:100vh; padding: 50px 0;">
                    <div class="card-login" style="width:90%; max-width:1500px; height:700px; display:flex; justify-content:center; align-items:center;">
                        <div class="thumbnail-left" style="width:42%; height:700px; border-radius:20px 0px 0px 20px; background-color:white; display:flex; justify-content:center; align-items:center;">
                            <img  src="../assets/Logo48.png"
                                style="object-fit: cover; width:80%; height:auto; border-radius:20px; "
                                alt="">
                        </div>
                        <div class="wrap-form"
                            style="width:58%; height:700px; border-radius:0px 20px 20px 0px; background-color:white; float:right;">
                            <v-container style="padding:20px; display:flex; margin-top:80px; justify-content:center; align-items:center; position:relative;">
                                <div style="width:70%; height:500px; background-color:white;">
                                    <p style="font-size:50px; font-weight:700; color:black; float:left; padding-left:20px;">Send Email</p>
                                    <div style="width:100%; height:400px; background-color:white; margin-top:100px; padding:20px;">
                                        <p style="float:left; color:black; font-weight:700; font-size:15px;">Email</p>
                                        <v-text-field outlined v-model="email" style="height:20px !important; width:100%; margin-top:40px; border-color: #cecece;" placeholder="Enter Your Email"></v-text-field>
                                        <div  style="width:100%; height:50px; border-radius:10px; background-color:#DA1F1A; cursor:pointer; color:white; font-weight:700; display:flex; align-items:center; justify-content:center; margin-top:80px;" @click="submit"> Send Email </div>
                                        <p @click="loginForm" style="cursor:pointer; font-weight:700; color:#DA1F1A; font-size:16px; padding-top:10px; text-align:center;">Back to Login Page</p>
                                    </div>
                                </div>
                                 <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}
                                </v-snackbar>
                            </v-container>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                load: false,
                snackbar: false,
                error_message: [],
                color: '',
                valid: false,
                success: false,
            };
        },
        methods: {
             submit(){
                this.$http.post(this.$api + '/sendforgotpassword', {
                        email: this.email,
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                        console.log(this.error_message);
                    })
            },
            registerForm() {
                this.$router.push({
                    name: 'Register',
                });
            },

            loginForm() {
                this.$router.push({
                    name: 'LoginPage',
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
    

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }
        .thumbnail-left{
            display:none;
        }
        .wrap-form{
            width:100% !important;
            border-radius: 20px !important;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>