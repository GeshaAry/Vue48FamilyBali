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
                                    <p style="font-size:50px; font-weight:700; color:black; float:left; padding-left:20px;">Reset Password</p>
                                    <div style="width:100%; height:400px; background-color:white; margin-top:100px; padding:20px;">
                                        <p style="float:left; color:black; font-weight:700; font-size:15px;">New Password</p>
                                        <v-text-field outlined type="password" v-model="new_password" style="height:20px !important; width:100%; margin-top:40px; border-color: #cecece;" placeholder="Enter Your New Password"></v-text-field>
                                        <p style="float:left; color:black; font-weight:700; font-size:15px; margin-top:60px;">Confirm New Password</p>
                                        <v-text-field type="password" v-model="new_confirm_password" outlined style="height:20px !important; width:100%; margin-top:40px; border-color: #cecece;" placeholder="Enter Your Confirm New Password"></v-text-field>
                                        <div  style="width:100%; height:50px; border-radius:10px; background-color:#DA1F1A; cursor:pointer; color:white; font-weight:700; display:flex; align-items:center; justify-content:center; margin-top:80px;" @click="submit"> Reset Password </div>
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
                new_password: '',
                new_confirm_password: '',
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
                this.$http.post(this.$api + '/resetpassword/' + this.$route.params.email + '/' + this.$route.params.token , {
                        new_password: this.new_password,
                        new_confirm_password: this.new_confirm_password
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.$router.push({
                            name: 'LoginPage',
                        });
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
            LoginPage(){
                this.$router.push({
                    name: 'LoginPage',
                });
            },
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
    

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }
        .thumbnail-left{
            display:none !important;
        }
        .wrap-form{
            width:100% !important;
            border-radius: 20px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
        }
    }
</style>