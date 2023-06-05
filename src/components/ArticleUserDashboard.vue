<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">My Article</div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                            <div class="form-add">
                                <v-row>
                                    <v-col cols="12" class="mt-4">
                                        <p style="font-weight:700; font-size:32px; text-align:center; color:#DA1F1A">Add
                                            Your
                                            Article</p>
                                    </v-col>
                                    <v-col cols="12" class="mt-4"
                                        style="display:flex; justify-content:center; align-items:center; flex-flow:column;">
                                        <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Thumbnail"
                                            id="filePhotos" ref="filePhotosArticleUser" style="width:750px">
                                        </v-file-input>
                                        <p>Upload maximum size file picture: 1 MB</p>
                                        <v-text-field filled rounded v-model="form.articleuser_title"
                                            label="Article Title" required style="width:750px">
                                        </v-text-field>
                                        <editor api-key="tx8fjxrs5lqmjq2w9obzcjrdkewcyztzff962uqvi4woty7v" :init="{
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
                                    }" v-model="form.articleuser_description" />
                                    <!-- <v-textarea filled name="input-7-4" label="Article Description" style="width:750px" v-model="form.articleuser_description">
                                    </v-textarea> -->
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-4">
                                        <div class="button-reset" @click="resetForm()">
                                            Reset
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6" class="mt-4">
                                        <div class="button-post" @click="addArticle()">
                                            Post Article
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
                            <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left;">My Articles</p>
                        </v-col>
                        <v-card
                            style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white; width:100%;">
                            <v-card-title>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Articles"
                                    single-line hide-details>
                                </v-text-field>
                                <v-spacer></v-spacer>
                            </v-card-title>
                            <v-data-table :headers="headers" :items="articleuser" :search="search"
                                style="background-color:white; color:black;">
                                <template v-slot:[`item.articleuser_thumbnail`]="{item}">
                                    <v-img :src="$baseUrl+'/storage/'+item.articleuser_thumbnail" height="50px"
                                        width="50px" style="object-fit:cover; border-radius:50%; cursor:pointer"
                                        @click="showPhotos(item)" />
                                </template>
                                <template v-slot:[`item.articleuser_description`]="{item}">
                                    <p v-html="item.articleuser_description.substring(0, 200) +'...'">
                                    </p>
                                </template>

                                <template v-slot:[`item.actions`]="{ item }">
                                    <div style="display:flex; align-items:center;">
                                        <div
                                            style="background-color:green; width:80px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                                            <span style="cursor: pointer;" @click="editHandler(item)">Edit</span>
                                        </div>
                                        <div
                                            style="background-color:red; width:80px;margin-left:10px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                                            <span style="cursor: pointer;" @click="deleteHandler(item)">Delete</span>
                                        </div>
                                        <div v-if="item.articleuser_status == 'Article Accepted'"
                                            style="background-color:blue; width:80px;margin-left:10px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                                            <span style="cursor: pointer;"
                                                @click="detailArticleUser(item.articleuser_id)">See Article</span>
                                        </div>
                                    </div>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-row>
                </v-layout>
            </v-container>
        </section>

        <v-dialog max-width="800" v-model="dialogPhotos">
            <v-card>
                <v-container>
                    <v-img width="100%"
                        :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.articleuser_thumbnail : previewImageUrl"
                        id="previewImage" class="mb-5"></v-img>
                </v-container>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" persistent max-width="700">
            <v-card style="padding:20px">
                <v-card-title>
                    <span class="headline">Edit Article</span>
                </v-card-title>
                <center>
                    <v-img width="500px" style="border-radius:30px;"
                        :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.articleuser_thumbnail : previewImageUrl"
                        id="previewImage" class="mb-5"></v-img>
                </center>
                <center>
                    <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Thumbnail" id="filePhotos"
                        ref="filePhotosArticleUser">
                    </v-file-input>
                    <p>Upload maximum size file picture: 1 MB</p>
                    <v-text-field filled rounded v-model="form.articleuser_title" label="Article Title" required>
                    </v-text-field>
                    <editor api-key="tx8fjxrs5lqmjq2w9obzcjrdkewcyztzff962uqvi4woty7v" :init="{
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
                        }" v-model="form.articleuser_description" />
                    <!-- <v-textarea filled name="input-7-4" label="Article Description" v-model="form.articleuser_description">
                    </v-textarea> -->
                </center>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn color="#0165BC" text @click="update">Update</v-btn>
                </v-card-action>
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
    import Editor from '@tinymce/tinymce-vue';
    export default {
        name: "ArticleUserDashboard",
        components: {
            'editor': Editor
        },
        data() {
            return {
                articleuser: [],
                articleusers: new FormData,
                form: {
                    user_id: '',
                    articleuser_title: '',
                    articleuser_thumbnail: '',
                    articleuser_description: '',
                    articleuser_status: '',
                    articleuser_id: '',
                },
                dialogPhotos: false,
                dialog: false,
                previewImageUrl: '',
                load: false,
                snackbar: false,
                error_message: [],
                color: '',
                search: null,
                dialogConfirm: false,
                headers: [{
                        text: "Name",
                        value: "user.user_name"
                    },
                    {
                        text: "Article Thumbnail",
                        value: "articleuser_thumbnail"
                    },
                    {
                        text: "Article Title",
                        value: "articleuser_title"
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
            };
        },
        methods: {
            onPreviewImage(e) {
                this.previewImageUrl = URL.createObjectURL(e)
            },
            showPhotos(item) {
                this.form.articleuser_thumbnail = item.articleuser_thumbnail;
                this.dialogPhotos = true;
            },
            addArticle() {
                this.articleusers.append('user_id', localStorage.getItem('user_id'));
                var inputPhotos = document.getElementById('filePhotos'),
                    dataFilePhotos = inputPhotos.files[0];
                this.articleusers.append('articleuser_thumbnail', dataFilePhotos ?? '');
                this.articleusers.append('articleuser_title', this.form.articleuser_title);
                this.articleusers.append('articleuser_description', this.form.articleuser_description);
                this.articleusers.append('articleuser_status', 'On Progress');

                var url = this.$api + '/articleuser'
                this.load = true;

                this.$http.post(url, this.articleusers, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
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
                    data.append('articleuser_thumbnail', dataFilePhotos);
                }
                data.append('articleuser_title', this.form.articleuser_title);
                data.append('articleuser_description', this.form.articleuser_description);
                data.append('articleuser_status', 'On Progress');
                data.append('user_id', localStorage.getItem('user_id'));
                data.append('_method', 'PUT');

                var url = this.$api + '/articleuser/' + this.editId;
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
                var url = this.$api + '/articleuser/' + this.deleteId;
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
                    this.cancelDelete();
                    this.dialog = false;
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            deleteHandler(item) {
                this.deleteId = item.articleuser_id;
                this.dialogConfirm = true;
            },
            editHandler(item) {
                this.editId = item.articleuser_id;
                this.form.articleuser_title = item.articleuser_title;
                this.form.articleuser_thumbnail = item.articleuser_thumbnail;
                this.form.articleuser_description = item.articleuser_description;
                this.form.articleuser_status = item.articleuser_status;
                this.dialog = true;
            },
            cancel() {
                this.dialog = false;
                this.dialogConfirm = false;
                this.resetForm();
            },
            cancelDelete() {
                this.dialogConfirm = false;
            },

            resetForm() {
                this.form = {
                    articleuser_title: '',
                    articleuser_thumbnail: '',
                    articleuser_description: '',
                    articleuser_status: '',
                };
                this.$refs.filePhotosArticleUser.value = null;
            },
            detailArticleUser(articleuser_id) {
                this.$router.push({
                    name: 'DetailArticleUser',
                    params: {
                        id: articleuser_id,
                    }

                });
            },
        },
        mounted() {
            this.$http.get(this.$api + '/articleuser/' + this.$route.params.id, )
                .then(response => {
                    this.articleuser = response.data.data;
                }).catch(error => {
                    console.log(error)
                })
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

    .form-add {
        width: 70%;
        height: auto;
        background-color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        padding-bottom: 30px;
    }

    .button-reset {
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        float: right;
        color: white;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin-right: 20px;
        cursor: pointer;
    }

    .button-post {
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        float: left;
        color: white;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin-left: 20px;
        cursor: pointer;
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
    }
</style>