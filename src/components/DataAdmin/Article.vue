<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Article" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn style="background-color:#0165BC; color:white" @click="dialog = true"> Add Article </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="articles" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.article_thumbnail`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.article_thumbnail" height="50px" width="50px" 
                        style="object-fit:cover; border-radius:50%; cursor:pointer" @click="showPhotos(item)" />
                </template>
                 <template v-slot:[`item.article_description`]="{item}">
                    <p  v-html="item.article_description.substring(0, 200) +'...'">
                    </p>
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

         <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="searcharticlepictures" append-icon="mdi-magnify" label="Search Article Pictures" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headersarticlepictures" :items="articlepictures" :search="searcharticlepictures"
                style="background-color:white; color:black;">
                <template v-slot:[`item.article_picture`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.article_picture" height="50px" width="50px" 
                        style="object-fit:cover; border-radius:50%; cursor:pointer" @click="showPhotosArticlePictures(item)" />
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <div style="display:flex; align-items:center;">
                    <div style="background-color:red; width:80px;margin-left:10px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                        <span style="cursor: pointer;"  @click="deleteHandlerArticlePictures(item)">Delete</span>
                    </div>
                    </div>
                </template>
            </v-data-table>
        </v-card>

        <v-row>
            <v-col md="12">
                <v-dialog max-width="800" v-model="dialog" persistent>
                    <v-card>
                        <v-card-text>
                            <v-container v-if="inputType == 'Tambah'">
                                <v-card-title>
                                    <span class="headline">Add Article</span>
                                </v-card-title>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Thumbnail" id="filePhotos"
                                    ref="filePhotosGallery"></v-file-input>
                                <p>Upload maximum size file picture: 1 MB</p>
                                <v-text-field filled rounded v-model="form.article_title"
                                    label="Article Title" required>
                                </v-text-field>

                                <div style="display:flex; justify-content:center; align-item:center; flex-flow:column">
                                        <input type="file" @change="onChange" ref="filePhotosArticle" class="filespicture" multiple/>
                                        <span>Upload maximum size file picture: 1 MB</span>
                                </div>

                                <editor
                                    api-key="tx8fjxrs5lqmjq2w9obzcjrdkewcyztzff962uqvi4woty7v"
                                    :init="{
                                        height: 500,
                                        menubar: false,
                                        forced_root_block : 'p',
                                        selector: 'textarea',
                                        encoding: 'xml',
                                        plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help'
                                    }"
                                     v-model="form.article_description"
                                    
                                    />
                            </v-container>
                            <v-container v-else-if="inputType == 'Ubah'">
                                <v-card-title>
                                    <span class="headline">Edit Article</span>
                                </v-card-title>
                                <center>
                                  <v-img width="500px" style="border-radius:30px;"
                                    :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.article_thumbnail : previewImageUrl"
                                    id="previewImage" class="mb-5"></v-img>
                                </center>
                                 <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Thumbnail" id="filePhotos"
                                    ref="filePhotosGallery"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>

                                <v-text-field filled rounded v-model="form.article_title"
                                    label="Article Title" required>
                                </v-text-field>

                                <div style="display:flex; justify-content:center; margin:10px; width:100%; height:400px;"  v-for="(item, index) in article_pictures" :key="index">
                                     <img :src="$baseUrl+'/storage/'+item.article_picture"
                                            style="object-fit: cover; width:100%; height:auto;" class="pictures" alt="">
                                </div>

                                <div style="display:flex; justify-content:center; align-item:center; flex-flow:column">
                                        <input type="file" @change="onChange" ref="filePhotosArticle" class="filespicture" multiple/>
                                        <span>Upload maximum size file picture: 1 MB</span>
                                </div>
                                                                
                                <editor
                                    api-key="tx8fjxrs5lqmjq2w9obzcjrdkewcyztzff962uqvi4woty7v"
                                    :init="{
                                        height: 500,
                                        menubar: false,
                                        forced_root_block : 'p',
                                        selector: 'textarea',
                                        encoding: 'xml',
                                        plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help'
                                    }"
                                     v-model="form.article_description"
                                    
                                    />
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <v-dialog max-width="400" v-model="dialogPhotos">
            <v-card>
                <v-container>
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.article_thumbnail : previewImageUrl"
                    id="previewImage" class="mb-5"></v-img>
                </v-container>
            </v-card>
        </v-dialog>

        <v-dialog max-width="400" v-model="dialogPhotosArticlePictures">
            <v-card>
                <v-container>
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.article_picture : previewImageUrl"
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

        <v-dialog v-model="dialogConfirmArticlePicture" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning !</span>
                </v-card-title>
                <v-card-text>Are you sure to delete this data?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDeletePicture">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteDataPicture">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<script>
</script>
<script>
    import Editor from '@tinymce/tinymce-vue' 
    export default {
        name: "Article",
        components: {
            'editor': Editor
        },
        data() {
            return {
                items: [],
                files: [],
                articlepictures: [],
                article_pictures: [],
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: [],
                color: '',
                search: null,
                searcharticlepictures: null,
                dialog: false,
                dialogConfirm: false,
                dialogPhotos:false,
                dialogConfirmArticlePicture:false,
                dialogPhotosArticlePictures:false,
                isDisabled: false,
                previewImageUrl: '',
                headers: [{
                        text: "Id Article",
                        align: "start",
                        sortable: true,
                        value: "article_id"
                    },
                    {
                        text: "Admin",
                        value: "admin.admin_username"
                    },
                    {
                        text: "article_title",
                        value: "article_title"
                    },
                    {
                        text: "article_thumbnail",
                        value: "article_thumbnail"
                    },
                    {
                        text: "article_description",
                        value: "article_description"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                headersarticlepictures: [{
                        text: "Article Id",
                        value: "article_id"
                    },
                    {
                        text: "Article Pictures",
                        value: "article_picture"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                article: new FormData,
                articles: [],
                form: {
                    article_id : '',
                    admin_id:'',
                    article_title:'',
                    article_thumbnail:'',
                    article_description:'',
                    article_pictures: '',
                    article_picture: '',
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            onPreviewImage(e) {
                this.previewImageUrl = URL.createObjectURL(e)
            },
            onChange(a){ 
                
                for(let i=0; i<a.target.files.length; i++){
                    this.files.push(a.target.files[i]);
                } 
               
                console.log(a.target.files);
            },
            setForm() {
                if (this.inputType !== 'Tambah') {
                    this.update();

                } else {
                    this.save();
                }
            },
            getAllAdmin() {
                var url = this.$api + '/admin';
                this.$http.get(url).then(response => {
                    this.items = response.data.data;
                })
            },
            readData() {
                var url = this.$api + '/article';
                this.$http.get(url).then(response => {
                    this.articles = response.data.data.data;
                })
            },
            readDataArticlePictures() {
                var url = this.$api + '/articlepictures';
                this.$http.get(url).then(response => {
                    this.articlepictures = response.data.data;
                })
            },
            save() {
                this.article.append('admin_id', localStorage.getItem('admin_id'));
                var inputPhotos = document.getElementById('filePhotos'),
                    dataFilePhotos = inputPhotos.files[0];
                this.article.append('article_thumbnail', dataFilePhotos ?? '');
                this.article.append('article_title', this.form.article_title);
                this.article.append('article_description', this.form.article_description);
                 for(let i=0; i<this.files.length; i++){
                    //  if(this.files.length > 5){
                    //     alert("You can only upload a maximum of 5 files");
                    //     this.files.length = [];
                    //     return;
                    // }
                    // else{
                       
                    // }
                     this.article.append('article_pictures[]', this.files[i]);
                }
              
                
                console.log(this.article);

                var url = this.$api + '/article'
                this.load = true;
            
                this.$http.post(url, this.article, {
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
                    data.append('article_thumbnail',dataFilePhotos);
                }
                data.append('article_title', this.form.article_title);
                data.append('article_description', this.form.article_description);
                data.append('admin_id', localStorage.getItem('admin_id'));
                for(let i=0; i<this.files.length; i++){
                    //  if(this.files.length > 5){
                    //     alert("You can only upload a maximum of 5 files");
                    //     this.files.length = [];
                    //     return;
                    // }
                    // else{
                       
                    // }
                    data.append('article_pictures[]', this.files[i]);
                }
                data.append('_method', 'PUT');

                var url = this.$api + '/article/' + this.editId;
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
                var url = this.$api + '/article/' + this.deleteId;
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
            deleteDataPicture() {
                var url = this.$api + '/articlepictures/' + this.deleteId;
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
                    this.dialogConfirmArticlePicture = false;
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.article_id;
                this.form.article_title = item.article_title;
                this.form.article_description = item.article_description;
                this.form.article_thumbnail = item.article_thumbnail;
                this.article_pictures = item.article_pictures;
                console.log(item);
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.article_id;
                this.dialogConfirm = true;
            },
            deleteHandlerArticlePictures(item) {
                this.deleteId = item.articlepicture_id;
                this.dialogConfirmArticlePicture = true;
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
            cancelDeletePicture() {
                this.dialogConfirmArticlePicture = false;
            },
            resetForm() {
                this.form = {
                    admin_id: '',
                    article_title: '',
                    article_description: '',
                    article_thumbnail: '',
                };
                this.$refs.filePhotosGallery.reset();
                this.files.length = [];
            },
            showPhotos(item){
                this.form.article_thumbnail = item.article_thumbnail;
                this.dialogPhotos = true;
            },

            showPhotosArticlePictures(item){
                this.form.article_picture = item.article_picture;
                this.dialogPhotosArticlePictures = true;
            }
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
            this.getAllAdmin();
            this.readDataArticlePictures();
        },
    };
</script>
