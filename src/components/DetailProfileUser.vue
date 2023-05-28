<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Detail Profile</div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                            <div style="width:80%; height:50px; background-color:#DA1F1A; display:flex; justify-content:center; align-items:center; color:white; 
                                font-weight:700; font-size:24px">My Page</div>
                        </v-col>
                         <v-col cols="12" class="mt-4">
                            <div class="button-article" style="width:15%; border-radius:30px;  height:50px; background-color:#DA1F1A; display:flex; justify-content:center; align-items:center; color:white; 
                                font-weight:700; font-size:12; float:right; margin-right:200px;">My Article</div>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-8">
                            <div class="pictureuser" v-if="user.user_picture != null">
                                <img :src="$baseUrl+'/storage/'+user.user_picture"
                                    style="object-fit:cover; width:100%; height:200px;" class="rounded-circle" alt="">
                                <p @click="dialogPicture = true"
                                    style="text-align:right; padding-right:45px; padding-top:10px; font-weight:700; color:#DA1F1A; text-decoration: underline; cursor:pointer;">
                                    Change Picture</p>
                            </div>
                            <div class="pictureuser" style="display:flex; justify-content:center; align-items:center"
                                v-if="user.user_picture == null">
                                <p @click="dialogPicture = true"
                                    style="text-align:right; padding-right:45px; padding-top:10px; font-weight:700; color:#DA1F1A; text-decoration: underline; cursor:pointer;">
                                    Change Picture</p>
                            </div>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-8">
                            <div class="picturemember" v-if="user.member_id != null">
                                <img :src="$baseUrl+'/storage/'+user.member.member_picture"
                                    style="object-fit:cover; width:100%; height:200px;" class="rounded-circle" alt="">
                            </div>
                            <div class="picturemember" style="display:flex; justify-content:center; align-items:center"
                                v-if="user.member_id == null">
                                <p style="font-weight:700; color:white; font-size:24px;">No Photo</p>
                            </div>
                        </v-col>
                        <v-col cols="12" class="mt-16"
                            style="display:flex; justify-content:center; align-items:center;">
                            <div class="profileuser">
                                <v-row>
                                    <v-col cols="12" md="5">
                                        <p
                                            style="font-weight:300; color:black; font-size:16px; text-align:left; padding-left:100px;">
                                            Nama
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <p
                                            style="font-weight:700; color:#DA1F1A; font-size:16px;  text-align:left; padding-left:100px; ">
                                            {{ user.user_name }}</p>
                                    </v-col>
                                    <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                                        <div style="width:80%; height:2px; background-color: #E3E3E3;"></div>
                                    </v-col>
                                    <v-col cols="12" md="5" class="mt-4">
                                        <p
                                            style="font-weight:300; color:black; font-size:16px; text-align:left; padding-left:100px;">
                                            Member
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-4">
                                        <p v-if="user.member_id != null"
                                            style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left; padding-left:100px; ">
                                            {{ user.member.member_name }}</p>
                                        <p v-else
                                            style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left; padding-left:100px; ">
                                            Pilih member yang disukai</p>
                                    </v-col>
                                    <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                                        <div style="width:80%; height:2px; background-color: #E3E3E3;"></div>
                                    </v-col>
                                    <v-col cols="12" md="5" class="mt-4">
                                        <p
                                            style="font-weight:300; color:black; font-size:16px; text-align:left; padding-left:100px;">
                                            Tanggal Lahir
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-4">
                                        <p
                                            style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left; padding-left:100px; ">
                                            {{ user.user_birthdate }}</p>
                                    </v-col>
                                    <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                                        <div style="width:80%; height:2px; background-color: #E3E3E3;"></div>
                                    </v-col>
                                    <v-col cols="12" md="5" class="mt-4">
                                        <p
                                            style="font-weight:300; color:black; font-size:16px; text-align:left; padding-left:100px;">
                                            Nomor Telephone
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-4">
                                        <p
                                            style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left; padding-left:100px; ">
                                            {{ user.user_telephone }}</p>
                                    </v-col>
                                    <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                                        <div style="width:80%; height:2px; background-color: #E3E3E3;"></div>
                                    </v-col>
                                    <v-col cols="12" md="5" class="mt-4">
                                        <p
                                            style="font-weight:300; color:black; font-size:16px; text-align:left; padding-left:100px;">
                                            Jenis Kelamin
                                        </p>
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-4">
                                        <p
                                            style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left; padding-left:100px; ">
                                            {{ user.user_gender }}</p>
                                    </v-col>
                                    <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                                        <div style="width:80%; height:2px; background-color: #E3E3E3;"></div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="mt-4">
                                        <div class="button-change-password" @click="dialogChangePassword = true">
                                            Ganti Password
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="mt-4">
                                        <div class="button-update-profile" @click="editHandlerProfile(user)">
                                            Update Profile
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="mt-4">
                                        <div class="button-update-member" @click="editHandler(user)">
                                            Change Member
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </section>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12">
                            <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left;">Riwayat
                                Pembelian E-Ticket</p>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </section>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12">
                            <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left;">Riwayat
                                Pembelian Merchandise</p>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </section>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>

        <v-dialog v-model="dialogPicture" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Profile Picture</span>
                </v-card-title>
                <center>
                    <v-img width="400px" style="border-radius:30px;"
                        :src="previewImageUrl == '' ? $baseUrl+'/storage/'+user.user_picture : previewImageUrl"
                        id="previewImage" class="mb-5"></v-img>
                    <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos" id="filePhotos"
                        ref="filePhotosUser" style="width:400px;"></v-file-input>
                    <span>Upload maximum size file picture: 1 MB</span>
                </center>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn color="#0165BC" text @click="updateProfilePictureUser">Update</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        

        <v-dialog v-model="dialogMember" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Member JKT48</span>
                </v-card-title>
                <center>
                    <v-select filled rounded v-model="selectMember" :items="itemsmember"
                        item-text="member_name" item-value="member_id" label="Choose Member"
                        persistent-hint return-object single-line style="width:400px;"></v-select>
                </center>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDialogMember">Cancel</v-btn>
                    <v-btn color="#0165BC" text @click="updateMemberUser">Update</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

         <v-dialog v-model="dialogProfile" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Profile</span>
                </v-card-title>
                <center>
                     <v-text-field filled rounded v-model="form.user_name"
                        label="Name" style="width:400px;" required> </v-text-field>
                    <v-text-field type="date" filled rounded v-model="form.user_birthdate"
                        label="Birthdate" style="width:400px;" required> </v-text-field>
                    <v-text-field filled rounded v-model="form.user_telephone"
                        label="Telephone" style="width:400px;" required> </v-text-field>
                    <v-select filled rounded :items="jenisKelamin" v-model="form.user_gender" label="Gender"
                            item-value="value" item-text="text" style="width:400px;"></v-select>
                </center>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDialogProfile">Cancel</v-btn>
                    <v-btn color="#0165BC" text @click="updateProfile">Update</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogChangePassword" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Profile</span>
                </v-card-title>
                <center>
                     <v-text-field filled rounded v-model="password"
                        label="Old Password" style="width:400px;" type="password" required> </v-text-field>
                    <v-text-field type="password" filled rounded v-model="newPassword"
                        label="New Password" style="width:400px;" required> </v-text-field>
                    <v-text-field type="password" filled rounded v-model="confirmNewPassword"
                        label="Confirm Password" style="width:400px;" required> </v-text-field>
                </center>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDialogChangePassword">Cancel</v-btn>
                    <v-btn color="#0165BC" text @click="updatePassword">Update</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                user: [],
                dialogPicture: false,
                dialogMember: false,
                dialogProfile: false,
                dialogChangePassword: false,
                previewImageUrl: '',
                snackbar: false,
                load: false,
                error_message: '',
                color: '',
                itemsmember: [],
                selectMember: '',
                form: {
                    selectMember: '',
                    user_name: '',
                    user_birthdate: '',
                    user_gender:'',
                    user_telephone:'',
                },
                jenisKelamin: [
                    {
                        text: "Laki-laki",
                        value: "Laki-laki",
                    },
                    {
                        text: "Perempuan",
                        value: "Perempuan"
                    }
                ],
            };
        },
        methods: {
            onPreviewImage(e) {
                this.previewImageUrl = URL.createObjectURL(e)
            },

            getAllMember() {
                var url = this.$api + '/allmember';
                this.$http.get(url).then(response => {
                    this.itemsmember = response.data.data;
                    console.log("asdasd");
                    console.log(this.itemsmember);
                })
            },

            updateProfilePictureUser() {
                var data = new FormData(),

                    inputPhotos = document.getElementById('filePhotos'),
                    dataFilePhotos = inputPhotos.files[0];
                if (dataFilePhotos) {
                    data.append('user_picture', dataFilePhotos);
                }

                var url = this.$api + '/pictureuser/' + localStorage.getItem('user_id')
                this.load = true;
                this.$http.post(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.dialogPicture = false;
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            updateMemberUser() {
                var data = new FormData()

                data.append('member_id', this.selectMember.member_id ?? '');

                var url = this.$api + '/memberuser/' + this.editId;
                this.load = true;


                this.$http.post(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.dialogMember = false;
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editHandler(item) {
                this.editId = localStorage.getItem('user_id');
                this.dialogProfile = true;
            },

            updateProfile() {
                var data = new FormData()

                data.append('user_name', this.form.user_name);
                data.append('user_birthdate', this.form.user_birthdate);
                data.append('user_telephone', this.form.user_telephone);
                data.append('user_gender', this.form.user_gender);

                var url = this.$api + '/user/' + this.editId;
                this.load = true;


                this.$http.post(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.dialogProfile = false;
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editHandlerProfile(item) {
                this.editId = localStorage.getItem('user_id');
                this.form.user_name = item.user_name;
                this.form.user_birthdate = item.user_birthdate;
                this.form.user_telephone = item.user_telephone;
                this.form.user_gender = item.user_gender;
                this.dialogProfile = true;
            },

            updatePassword(){
                this.$http.post(this.$api + '/changepassword/' + localStorage.getItem('user_id') , {
                        password: this.password,
                        newPassword: this.newPassword,
                        confirmNewPassword: this.confirmNewPassword,
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.dialogChangePassword = false;
                        location.reload();
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                        console.log(this.error_message);
                    })
            },

            cancel() {
                this.dialogPicture = false;
                this.$refs.filePhotosUser.value = null;
            },

            cancelDialogMember() {
                this.dialogMember = false;
                this.selectMember = ''
            },

            cancelDialogProfile() {
                this.form = {
                    user_name: '',
                    user_birthdate: '',
                    user_telephone: '',
                    user_gender: '',
                };
                this.dialogProfile = false;
            },
            cancelDialogChangePassword(){
                this.password = '';
                this.newPassword = '',
                this.confirmNewPassword = '',
                this.dialogChangePassword = false;
            }
        },
        mounted() {
            this.$http.get(this.$api + '/user/' + this.$route.params.id, )
                .then(response => {
                    this.user = response.data.data;
                    console.log(this.user);
                }).catch(error => {
                    console.log(error)
                })
            
            this.getAllMember();
        }

    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .thumbnail {
        width: 100%;
        height: 500px;
        background-color: antiquewhite;
        position: relative;
        text-align: center;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 50px;
        font-weight: 700;
    }

    .pictureuser {
        width: 200px;
        height: 200px;
        background-color: #DA1F1A;
        float: right;
        border-radius: 100%;
        margin-right: 20px;
    }

    .picturemember {
        width: 200px;
        height: 200px;
        background-color: #DA1F1A;
        float: left;
        border-radius: 100%;
        margin-left: 20px;
    }

    .profileuser {
        max-width: 800px;
        height: auto;
        background-color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .button-change-password {
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        color: white;
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }

    .button-update-profile {
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        color: white;
        float: left;
        margin-left: 20px;
        margin-right: 20px;
        cursor: pointer;
    }

    .button-update-member {
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        color: white;
        float: left;
        cursor: pointer;
    }

    .telephone-contact::after {
        content: "\f095";
        /* FontAwesome Unicode */
        font-family: FontAwesome;
        display: inline-block;
        margin-left: -1.3em;
        /* same as padding-left set on li */
        width: 1.3em;
        /* same as padding-left set on li */
    }

    .button-article:hover{
        background-color: white !important;
        border: 2px #DA1F1A solid;
        color: #DA1F1A !important;
        transition: 0.5s !important;
        cursor: pointer;
    }

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }

        .profileuser {
            width: 100%;
        }

    }
</style>