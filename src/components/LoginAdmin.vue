<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit:cover; width:100%; height:100vh;" alt="">
                <div style="display:flex; justify-content:center; align-items:center;">
                        <div class="card-login">
                            <v-container style="padding:20px; display:flex; justify-content:center; align-items:center;">
                                <div style="width:70%; background-color:white;">
                                    <p style="font-size:50px; font-weight:700; color:black; float:center;">Login Admin </p>
                                    <div style="width:100%; height:auto; background-color:white; padding:20px;">
                                        <p style="float:left; color:black; font-weight:700; font-size:15px;" >Username</p>
                                        <v-text-field v-model="username" outlined style="height:20px !important; width:100%; margin-top:40px; border-color: #cecece;" placeholder="Enter Your Username"></v-text-field>
                                        <p style="float:left; color:black; font-weight:700; font-size:15px; margin-top:60px;">Password</p>
                                        <v-text-field v-model="password" type="password" outlined style="height:20px !important; width:100%; margin-top:40px; border-color: #cecece;" placeholder="Enter Your Password"></v-text-field>
                                        <div style="width:100%; height:50px; border-radius:10px; background-color:#DA1F1A; cursor:pointer; color:white; font-weight:700; display:flex; align-items:center; justify-content:center; margin-top:80px;" @click="submit"> Login </div>
                                    </div>
                                </div>
                                 <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}
                                </v-snackbar>
                            </v-container>
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
                password: '',
                username: '',
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
                this.$http.post(this.$api + '/loginadmin', {
                        username: this.username,
                        password: this.password
                    }).then(response => {
                        if(response.data.data.admin_id !=null){
                            localStorage.setItem('admin_id', response.data.data.admin_id);
                            localStorage.setItem('admin_username', response.data.data.admin_username);
                        }
                        else{
                            return false;
                        }
                       
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.$router.push({
                            name: 'Dashboard',
                        });
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        localStorage.removeItem('token');
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
                    name: 'Login',
                });
            },
        },
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .thumbnail {
        width: 100%;
        height: 100vh;
        background-color: antiquewhite;
    }

    .card-login{
        width:40%; 
        height:500px; 
        border-radius:20px; 
        background-color:white;
        margin-top: -725px;
    }
    

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }

        .rowProduk {
            margin: -12px !important;
        }
        .card-login{
            width: 80%;
        }
    }
</style>