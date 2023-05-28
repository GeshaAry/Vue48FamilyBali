<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <div style="display:flex; justify-content:center; align-items:center; min-height:100vh; padding: 50px 0;">
                    <div style="width:90%; max-width:1500px; height:900px; border-radius:30px; background-color:white; display:flex; justify-content:center; align-items:center;">
                        <v-row>
                            <v-col cols="12" md="6">
                                <div class="picture-logo">
                                      <img src="../assets/Logo48.png" alt="" style="object-fit:cover; width:80%;">
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-col cols="12" class="mt-8">
                                    <p style="font-weight:700; color:black; font-size:40px; text-align:left; padding-left:20px;">Register</p>
                                </v-col>
                                <v-col cols="12" class="mt-8">
                                    <p style="font-weight:700; color:black; font-size:16px; text-align:left; padding-left:20px;">Email</p>
                                    <v-text-field v-model="form.user_email"  outlined style="height:10px !important; width:95%; margin-left:20px;  border-color: #cecece;" placeholder="Enter Your Email"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="mt-16">
                                    <p style="font-weight:700; color:black; font-size:16px; text-align:left; padding-left:20px;">Password</p>
                                    <v-text-field v-model="form.user_password" type="password" outlined style="height:10px !important; width:95%; margin-left:20px;  border-color: #cecece;" placeholder="Enter Your Password"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="mt-16">
                                    <p style="font-weight:700; color:black; font-size:16px; text-align:left; padding-left:20px;">Name</p>
                                    <v-text-field v-model="form.user_name" outlined style="height:10px !important; width:95%; margin-left:20px;  border-color: #cecece;" placeholder="Enter Your Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="mt-16">
                                    <p style="font-weight:700; color:black; font-size:16px; text-align:left; padding-left:20px;">Gender</p>
                                    <v-select v-model="form.user_gender" :items="jenisKelamin" outlined style="height:10px !important; width:95%; margin-left:20px;  border-color: #cecece;" placeholder="Enter Your Gender"></v-select>
                                </v-col>
                                <v-col cols="12" class="mt-16">
                                    <p style="font-weight:700; color:black; font-size:16px; text-align:left; padding-left:20px;">Birthdate</p>
                                    <v-text-field v-model="form.user_birthdate" type="date" outlined style="height:10px !important; width:95%; margin-left:20px;  border-color: #cecece;" placeholder="Enter Your Birthdate"></v-text-field>
                                </v-col>
                                 <v-col cols="12" class="mt-16">
                                    <p style="font-weight:700; color:black; font-size:16px; text-align:left; padding-left:20px;">Telephone</p>
                                    <v-text-field v-model="form.user_telephone" outlined style="height:10px !important; width:95%; margin-left:20px;  border-color: #cecece;" placeholder="Enter Your Telephone"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="mt-16" style="display:flex; justify-content:center;">
                                   <div style="width:95%; height:40px; border-radius:10px; background-color:#DA1F1A; cursor:pointer; color:white; font-weight:700; display:flex; align-items:center; justify-content:center;" @click="submitregister"> Sign Up </div>
                                </v-col>
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </div>
            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                name: '',
                loader: null,
                loading: false,
                jenisKelamin: [{
                        text: "Laki-laki",
                        value: "Laki-laki"
                    },
                    {
                        text: "Perempuan",
                        value: "Perempuan"
                    },
                ],
                user: new FormData,
                users: [],
                form: {
                    user_id: '',
                    user_email: '',
                    user_password: '',
                    user_name: '',
                    user_gender: '',
                    user_birthdate: '',
                    user_telephone: '',
                },
            };
        },
        methods: {
            submitregister() {
                    this.user.append('user_email', this.form.user_email);
                    this.user.append('user_password', this.form.user_password);
                    this.user.append('user_name', this.form.user_name);
                    this.user.append('user_gender', this.form.user_gender);
                    this.user.append('user_birthdate', this.form.user_birthdate);
                    this.user.append('user_telephone', this.form.user_telephone);

                    var url = this.$api + '/user'
                    this.load = true;

                    this.$http.post(url, this.user, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        }
                        
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.loading = false;
                        this.clear();
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    })
             
            },

            loginForm() {
                this.$router.push({
                    name: 'LoginPage',
                });
            },
             clear() {
                this.$refs.form.reset()
            }
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

    .picture-logo{
        width: 100%;
        height: 900px;
        background-color: white;
        border-radius: 30px 0px 0px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }
        .picture-logo{
            display:none;
        }
        .wrap-form{
            width:100% !important;
            border-radius: 20px !important;
        }
    }
</style>