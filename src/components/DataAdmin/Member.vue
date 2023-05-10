<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Member JKT48" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn style="background-color:#0165BC; color:white" @click="dialog = true"> Add Member JKT48 </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="memberjkt48s" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.member_picture`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.member_picture" height="50px" width="50px" 
                        style="object-fit:cover; border-radius:50%; cursor:pointer" @click="showPhotos(item)" />
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <div style="display:flex; align-items:center;">
                    <div style="background-color:green; width:80px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                        <span style="cursor: pointer;" @click="editHandler(item)">Edit</span>
                    </div>
                    <div style="background-color:red; width:80px;margin-left:10px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                        <span style="cursor: pointer;"  @click="deleteHandler(item)">Delete</span>
                    </div>
                    </div>
                </template>
            </v-data-table>
        </v-card>

        <v-row>
            <v-col md="12">
                <v-dialog max-width="500" v-model="dialog" persistent>
                    <v-card>
                        <v-card-text>
                            <v-container v-if="inputType == 'Tambah'">
                                <v-card-title>
                                    <span class="headline">Add Member JKT48</span>
                                </v-card-title>
                                <v-text-field filled rounded v-model="form.member_name"
                                    label="Member Name" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.member_jiko"
                                    label="Member Jiko" required>
                                </v-text-field>
                                <v-text-field type="number" filled rounded v-model="form.member_show"
                                    label="Member Show" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.member_gen"
                                    label="Member Generation" required>
                                </v-text-field>
                                <v-select filled rounded :items="memberStatus" v-model="form.member_status" label="Member Status"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-text-field type="date" filled rounded  v-model="form.member_birthdate"
                                    label="Member Birthdate" required>
                                </v-text-field>
                                <v-select filled rounded :items="memberBlood" v-model="form.member_blood" label="Member Blood"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-select filled rounded :items="memberHoroskop" v-model="form.member_horoskop" label="Member Horoskop"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-text-field filled rounded  v-model="form.member_height"
                                    label="Member Height" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_instagram"
                                    label="Member Instagram" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_twitter"
                                    label="Member Twitter" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_tiktok"
                                    label="Member Tiktok" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_showroom"
                                    label="Member Showroom" required>
                                </v-text-field>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos" id="filePhotos"
                                    ref="filePhotosMember"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>
                            </v-container>
                            <v-container v-else-if="inputType == 'Ubah'">
                                <v-card-title>
                                    <span class="headline">Edit Member JKT48</span>
                                </v-card-title>
                                <center>
                                  <v-img width="500px" style="border-radius:30px;"
                                    :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.member_picture : previewImageUrl"
                                    id="previewImage" class="mb-5"></v-img>
                                </center>
                                <v-text-field filled rounded v-model="form.member_name"
                                    label="Member Name" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.member_jiko"
                                    label="Member Jiko" required>
                                </v-text-field>
                                <v-text-field type="number" filled rounded v-model="form.member_show"
                                    label="Member Show" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.member_gen"
                                    label="Member Generation" required>
                                </v-text-field>
                                <v-select filled rounded :items="memberStatus" v-model="form.member_status" label="Member Status"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-text-field type="date" filled rounded  v-model="form.member_birthdate"
                                    label="Member Birthdate" required>
                                </v-text-field>
                                <v-select filled rounded :items="memberBlood" v-model="form.member_blood" label="Member Blood"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-select filled rounded :items="memberHoroskop" v-model="form.member_horoskop" label="Member Horoskop"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-text-field filled rounded  v-model="form.member_height"
                                    label="Member Height" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_instagram"
                                    label="Member Instagram" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_twitter"
                                    label="Member Twitter" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_tiktok"
                                    label="Member Tiktok" required>
                                </v-text-field>
                                <v-text-field filled rounded  v-model="form.member_showroom"
                                    label="Member Showroom" required>
                                </v-text-field>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos" id="filePhotos"
                                    ref="filePhotosMember"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>
                            </v-container>
                        </v-card-text>
                        <v-card-action>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
                        </v-card-action>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <v-dialog max-width="300" v-model="dialogPhotos">
            <v-card>
                <v-container>
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.member_picture : previewImageUrl"
                    id="previewImage" class="mb-5"></v-img>
                </v-container>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning !</span>
                </v-card-title>
                <v-card-text>Are you sure to delete this data?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<script>
    export default {
        name: "Member",
        data() {
            return {
                items: [],
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: [],
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                isDisabled: false,
                previewImageUrl: '',
                memberStatus: [
                    {
                        text: "Member JKT48",
                        value: "Member JKT48",
                    },
                    {
                        text: "Trainee",
                        value: "Trainee"
                    }
                ],
                memberBlood: [
                    {
                        text: "AB",
                        value: "AB",
                    },
                    {
                        text: "A",
                        value: "A"
                    },
                    {
                        text: "B",
                        value: "B"
                    },
                    {
                        text: "O",
                        value: "O"
                    }
                ],
                memberHoroskop: [
                    {
                        text: "Aquarius",
                        value: "Aquarius",
                    },
                    {
                        text: "Pisces",
                        value: "Pisces"
                    },
                    {
                        text: "Aries",
                        value: "Aries"
                    },
                    {
                        text: "Taurus",
                        value: "Taurus"
                    },
                    {
                        text: "Gemini",
                        value: "Gemini"
                    },
                    {
                        text: "Cancer",
                        value: "Cancer"
                    },
                    {
                        text: "Leo",
                        value: "Leo"
                    },
                    {
                        text: "Virgo",
                        value: "Virgo"
                    },
                    {
                        text: "Libra",
                        value: "Libra"
                    },
                    {
                        text: "Scorpio",
                        value: "Scorpio"
                    },
                    {
                        text: "Sagitarius",
                        value: "Sagitarius"
                    },
                    {
                        text: "Capricorn",
                        value: "Capricorn"
                    }
                ],
                headers: [{
                        text: "Id Member",
                        align: "start",
                        sortable: true,
                        value: "member_id"
                    },
                    {
                        text: "Member Name",
                        value: "member_name"
                    },
                    {
                        text: "Member Jiko",
                        value: "member_jiko"
                    },
                    {
                        text: "Member Show",
                        value: "member_show"
                    },
                    {
                        text: "Member Generation",
                        value: "member_gen"
                    },
                    {
                        text: "Member Status",
                        value: "member_status"
                    },
                    {
                        text: "Member Birthdate",
                        value: "member_birthdate"
                    },
                    {
                        text: "Member Blood",
                        value: "member_blood"
                    },
                    {
                        text: "Member Horoskop",
                        value: "member_horoskop"
                    },
                    {
                        text: "Member Height",
                        value: "member_height"
                    },
                    {
                        text: "Member Instagram",
                        value: "member_instagram"
                    },
                    {
                        text: "Member Twitter",
                        value: "member_twitter"
                    },
                    {
                        text: "Member Tiktok",
                        value: "member_tiktok"
                    },
                    {
                        text: "Member Showroom",
                        value: "member_showroom"
                    },
                    {
                        text: "Member Picture",
                        value: "member_picture"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                memberjkt48: new FormData,
                memberjkt48s: [],
                form: {
                    member_id: '',
                    member_name: '',
                    member_jiko: '',
                    member_show: '',
                    member_gen: '',
                    member_status: '',
                    member_birthdate: '',
                    member_blood: '',
                    member_horoskop: '',
                    member_height: '',
                    member_instagram: '',
                    member_twitter: '',
                    member_tiktok: '',
                    member_showroom: '',
                    member_picture: '',
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            onPreviewImage(e) {
                this.previewImageUrl = URL.createObjectURL(e)
            },
            setForm() {
                if (this.inputType !== 'Tambah') {
                    this.update();

                } else {
                    this.save();


                }
            },
            getAllCategory() {
                var url = this.$api + '/member';
                this.$http.get(url).then(response => {
                    this.items = response.data.data;
                })
            },
            readData() {
                var url = this.$api + '/member';
                this.$http.get(url).then(response => {
                    this.memberjkt48s = response.data.data.data;
                })
            },
            save() {
                this.memberjkt48.append('member_name', this.form.member_name);
                this.memberjkt48.append('member_jiko', this.form.member_jiko);
                this.memberjkt48.append('member_show', this.form.member_show);
                this.memberjkt48.append('member_gen', this.form.member_gen);
                this.memberjkt48.append('member_status', this.form.member_status);
                this.memberjkt48.append('member_birthdate', this.form.member_birthdate);
                this.memberjkt48.append('member_blood', this.form.member_blood);
                this.memberjkt48.append('member_horoskop', this.form.member_horoskop);
                this.memberjkt48.append('member_height', this.form.member_height);
                this.memberjkt48.append('member_instagram', this.form.member_instagram);
                this.memberjkt48.append('member_twitter', this.form.member_twitter);
                this.memberjkt48.append('member_tiktok', this.form.member_tiktok);
                this.memberjkt48.append('member_showroom', this.form.member_showroom);
                var inputPhotos = document.getElementById('filePhotos'),
                    dataFilePhotos = inputPhotos.files[0];
                this.memberjkt48.append('member_picture', dataFilePhotos ?? '');

                var url = this.$api + '/member'
                this.load = true;

                this.$http.post(url, this.memberjkt48, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.close();
                    this.readData();
                    this.resetForm();
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            update() {
                var data = new FormData(),

                inputPhotos = document.getElementById('filePhotos'),
                dataFilePhotos = inputPhotos.files[0];
                if (dataFilePhotos) {
                    data.append('member_picture',dataFilePhotos);
                }
                data.append('member_name', this.form.member_name);
                data.append('member_jiko', this.form.member_jiko);
                data.append('member_show', this.form.member_show);
                data.append('member_gen', this.form.member_gen);
                data.append('member_status', this.form.member_status);
                data.append('member_birthdate', this.form.member_birthdate);
                data.append('member_blood', this.form.member_blood);
                data.append('member_horoskop', this.form.member_horoskop);
                data.append('member_height', this.form.member_height);
                data.append('member_instagram', this.form.member_instagram);
                data.append('member_twitter', this.form.member_twitter);
                data.append('member_tiktok', this.form.member_tiktok);
                data.append('member_showroom', this.form.member_showroom);
                data.append('_method', 'PUT');

                var url = this.$api + '/member/' + this.editId;

                console.log(url,'wibu', this.editId);
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
                    this.close();
                    this.readData();
                    this.resetForm();
                    location.reload();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            deleteData() {
                var url = this.$api + '/member/' + this.deleteId;
                this.load = true;
                this.$http.delete(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = "Tambah";
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.member_id;
                this.form.member_name = item.member_name;
                this.form.member_jiko = item.member_jiko;
                this.form.member_show = item.member_show;
                this.form.member_gen = item.member_gen;
                this.form.member_status = item.member_status;
                this.form.member_birthdate = item.member_birthdate;
                this.form.member_blood = item.member_blood;
                this.form.member_horoskop = item.member_horoskop;
                this.form.member_height = item.member_height;
                this.form.member_instagram = item.member_instagram;
                this.form.member_twitter = item.member_twitter;
                this.form.member_tiktok = item.member_tiktok;
                this.form.member_showroom = item.member_showroom;
                this.form.member_picture = item.member_picture;
                this.dialog = true;
                console.log('xxxxxxxx', this.editId)
            },
            deleteHandler(item) {
                this.deleteId = item.member_id;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = 'Tambah';
                this.dialogConfirm = false;
                this.readData();

            },
            cancel() {
                this.readData();
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = 'Tambah';
                this.resetForm();
            },
            cancelDelete() {
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    member_name: '',
                    member_jiko: '',
                    member_show: '',
                    member_gen: '',
                    member_status: '',
                    member_birthdate: '',
                    member_blood: '',
                    member_horoskop: '',
                    member_height: '',
                    member_instagram: '',
                    member_twitter: '',
                    member_tiktok: '',
                    member_showroom: '',
                    member_name: '',
                };
                this.$refs.filePhotosMember.reset();
            },
            showPhotos(item){
                this.form.member_picture = item.member_picture;
                this.dialogPhotos = true;
            }
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
            this.getAllCategory();
        },
    };
</script>

<style scoped>
    .v-dialog{
        width: 50% !important;
    }
</style>