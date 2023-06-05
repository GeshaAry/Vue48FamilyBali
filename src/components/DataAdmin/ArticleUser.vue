<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Article" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headers" :items="articleusers" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.articleuser_thumbnail`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.articleuser_thumbnail" height="50px" width="50px" 
                        style="object-fit:cover; border-radius:50%; cursor:pointer" @click="showPhotos(item)" />
                </template>
                 <template v-slot:[`item.articleuser_description`]="{item}">
                    <p  v-html="item.articleuser_description.substring(0, 200) +'...'">
                    </p>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <div style="display:flex; align-items:center;">
                    <div style="background-color:green; width:80px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                        <span style="cursor: pointer;" @click="editHandler(item)">Edit</span>
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
                            </v-container>
                            <v-container v-else-if="inputType == 'Ubah'">
                                <v-card-title>
                                    <span class="headline">Edit Status Article User</span>
                                </v-card-title>
                                <center>
                                  <v-img width="500px" style="border-radius:30px;"
                                    :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.articleuser_thumbnail : previewImageUrl"
                                    id="previewImage" class="mb-5" readonly></v-img>
                                </center>

                                <v-text-field filled rounded v-model="form.articleuser_title"
                                    label="Article Title" readonly>
                                </v-text-field>
                                
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
                                     v-model="form.articleuser_description"
                                    />
                                    
                                    <v-select filled rounded :items="articleStatus" v-model="form.articleuser_status" label="Status"
                                        item-value="value" item-text="text" class="mt-4">
                                    </v-select>
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
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.articleuser_thumbnail : previewImageUrl"
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
</script>
<script>
    import Editor from '@tinymce/tinymce-vue' 
    export default {
        name: "ArticleUser",
        components: {
            'editor': Editor
        },
        data() {
            return {
                items: [],
                files: [],
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
                articleStatus: [
                    {
                        text: "Article Accepted",
                        value: "Article Accepted"
                    },
                    {
                        text: "Article Rejected",
                        value: "Article Rejected"
                    },
                ],
                headers: [{
                        text: "Id Article",
                        align: "start",
                        sortable: true,
                        value: "articleuser_id"
                    },
                    {
                        text: "User",
                        value: "user.user_name"
                    },
                    {
                        text: "Article Title",
                        value: "articleuser_title"
                    },
                    {
                        text: "Article Thumbnail",
                        value: "articleuser_thumbnail"
                    },
                    {
                        text: "Article Description",
                        value: "articleuser_description"
                    },
                      {
                        text: "Article Status",
                        value: "articleuser_status"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                articleuser: new FormData,
                articleusers: [],
                form: {
                    articleuser_id : '',
                    user_id:'',
                    articleuser_title:'',
                    articleuser_thumbnail:'',
                    articleuser_description:'',
                    articleuser_status: '',
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
            readData() {
                var url = this.$api + '/articleuser';
                this.$http.get(url).then(response => {
                    this.articleusers = response.data.data.data;
                })
            },
            update() {
                var data = new FormData()

                data.append('articleuser_status', this.form.articleuser_status);

                var url = this.$api + '/updatestatusarticle/' + this.editId;
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
            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.articleuser_id;
                this.form.articleuser_title = item.articleuser_title;
                this.form.articleuser_description = item.articleuser_description;
                this.form.articleuser_thumbnail = item.articleuser_thumbnail;
                this.form.articleuser_status = item.articleuser_status;
                this.dialog = true;
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
                    user_id: '',
                    articleuser_title: '',
                    articleuser_description: '',
                    articleuser_status: '',
                };
                this.$refs.filePhotosGallery.reset();
            },
            showPhotos(item){
                this.form.articleuser_thumbnail = item.articleuser_thumbnail;
                this.dialogPhotos = true;
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
        },
    };
</script>
