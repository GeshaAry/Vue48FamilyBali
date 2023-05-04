<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Photos" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn style="background-color:#0165BC; color:white" @click="dialog = true"> Add Photos </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="galleries" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.gallery_picture`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.gallery_picture" height="50px" width="50px" 
                        style="object-fit:cover; border-radius:50%; cursor:pointer" @click="showPhotos(item)" />
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <div style="display:flex; align-items:center;">
                        <div style="background-color:red; width:80px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
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
                                    <span class="headline">Add Photos</span>
                                </v-card-title>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos" id="filePhotos"
                                    ref="filePhotosGallery"></v-file-input>
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

        <v-dialog v-model="dialogPhotos">
            <v-card>
                <v-container>
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.gallery_picture : previewImageUrl"
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
        name: "Gallery",
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
                        text: "Id Gallery",
                        align: "start",
                        sortable: true,
                        value: "gallery_id"
                    },
                    {
                        text: "Photos",
                        value: "gallery_picture"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                gallery: new FormData,
                galleries: [],
                form: {
                    gallery_id: '',
                    gallery_picture:'',
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
                var url = this.$api + '/gallery';
                this.$http.get(url).then(response => {
                    this.items = response.data.data;
                })
            },
            readData() {
                var url = this.$api + '/gallery';
                this.$http.get(url).then(response => {
                    this.galleries = response.data.data.data;
                })
            },
            save() {
                var inputPhotos = document.getElementById('filePhotos'),
                    dataFilePhotos = inputPhotos.files[0];
                this.gallery.append('gallery_picture', dataFilePhotos);
                var url = this.$api + '/gallery'
                this.load = true;

                this.$http.post(url, this.gallery, {
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
                    data.append('gallery_picture',dataFilePhotos);
                }
                data.append('_method', 'PUT');

                var url = this.$api + '/gallery/' + this.editId;
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
                var url = this.$api + '/gallery/' + this.deleteId;
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
                this.editId = item.gallery_id;
                this.form.gallery_picture = item.gallery_picture;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.gallery_id;
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
                    gallery_picture: ''
                };
                this.$refs.filePhotosGallery.reset();
            },
            showPhotos(item){
                this.form.gallery_picture = item.gallery_picture;
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