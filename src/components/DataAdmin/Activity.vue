<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Photos" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn style="background-color:#0165BC; color:white" @click="dialog = true"> Add Photos </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="activitys" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.activity_thumbnail`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.activity_thumbnail" height="50px" width="50px" 
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
                                    <span class="headline">Add Activity JKT48</span>
                                </v-card-title>
                                <v-text-field type="datetime-local" filled rounded v-model="form.activity_date"
                                    label="Activity Date" required>
                                </v-text-field>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos" id="filePhotos"
                                    ref="filePhotosActivity"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>
                                <v-text-field filled rounded v-model="form.activity_title"
                                    label="Activity Title" required>
                                </v-text-field>
                                <v-textarea filled rounded v-model="form.activty_description"
                                    label="Activity Description" required>
                                </v-textarea>
                            </v-container>
                             <v-container v-else-if="inputType == 'Ubah'">
                                <v-card-title>
                                    <span class="headline">Edit Activity JKT48</span>
                                </v-card-title>
                                <center>
                                  <v-img width="500px" style="border-radius:30px;"
                                    :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.activity_thumbnail : previewImageUrl"
                                    id="previewImage" class="mb-5"></v-img>
                                </center>
                                <v-text-field type="datetime-local" filled rounded v-model="form.activity_date"
                                    label="Activity Date" required>
                                </v-text-field>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos" id="filePhotos"
                                    ref="filePhotosActivity"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>
                                <v-text-field filled rounded v-model="form.activity_title"
                                    label="Activity Title" required>
                                </v-text-field>
                                <v-textarea filled rounded v-model="form.activty_description"
                                    label="Activity Description" required>
                                </v-textarea>
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

        <v-dialog max-width="200px" v-model="dialogPhotos">
            <v-card>
                <v-container>
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.activity_thumbnail : previewImageUrl"
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
        name: "Activity",
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
                dialogPhotos:false,
                isDisabled: false,
                previewImageUrl: '',
                headers: [{
                        text: "Id Activity",
                        align: "start",
                        sortable: true,
                        value: "activity_id"
                    },
                    {
                        text: "Activity Date",
                        value: "activity_date"
                    },
                    {
                        text: "Activity Title",
                        value: "activity_title"
                    },
                    {
                        text: "Activity Thumbnail",
                        value: "activity_thumbnail"
                    },
                    {
                        text: "Activity Description",
                        value: "activty_description"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                activity: new FormData,
                activitys: [],
                form: {
                    activity_id: '',
                    activity_date:'',
                    activity_thumbnail:'',
                    activty_description:'',
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
                var url = this.$api + '/activity';
                this.$http.get(url).then(response => {
                    this.items = response.data.data;
                })
            },
            readData() {
                var url = this.$api + '/activity';
                this.$http.get(url).then(response => {
                    this.activitys = response.data.data;
                })
            },
            save() {
                this.activity.append('activity_date', this.form.activity_date);
                var inputPhotos = document.getElementById('filePhotos'),
                    dataFilePhotos = inputPhotos.files[0];
                this.activity.append('activity_thumbnail', dataFilePhotos ?? '');
                this.activity.append('activity_title', this.form.activity_title);
                this.activity.append('activty_description', this.form.activty_description);

                var url = this.$api + '/activity'
                this.load = true;

                this.$http.post(url, this.activity, {
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
                    data.append('activity_thumbnail',dataFilePhotos);
                }
                data.append('activity_date', this.form.activity_date);
                data.append('activity_title', this.form.activity_title);
                data.append('activty_description', this.form.activty_description);

                data.append('_method', 'PUT');

                var url = this.$api + '/activity/' + this.editId;
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
                var url = this.$api + '/activity/' + this.deleteId;
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
                this.editId = item.activity_id;
                this.form.activity_date = item.activity_date;
                this.form.activity_thumbnail = item.activity_thumbnail;
                this.form.activity_title = item.activity_title;
                this.form.activty_description = item.activty_description;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.activity_id;
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
                    activity_date: '',
                    activity_title: '',
                    activty_description: ''
                };
                this.$refs.filePhotosActivity.reset();
            },
            showPhotos(item){
                this.form.activity_thumbnail = item.activity_thumbnail;
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