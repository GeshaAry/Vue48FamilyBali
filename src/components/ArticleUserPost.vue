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
                                    <v-col cols="12" class="mt-8">
                                        <p style="font-weight:700; cursor:pointer; font-size:16px; color: #DA1F1A;" @click="backMyArticles(currentUser)">Back To My Articles</p>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </section>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<script>
    import Editor from '@tinymce/tinymce-vue';
    export default {
        name: "ArticleUserPost",
        components: {
            'editor': Editor,
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
                dialog: false,
                previewImageUrl: '',
                load: false,
                snackbar: false,
                error_message: [],
                color: '',
                search: null,
            };
        },
        methods: {
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
                    this.$router.push({
                        name: 'ArticleUserDashboard',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
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
            backMyArticles(currentUser) {
                this.$router.push({
                    name: 'ArticleUserDashboard',
                    params: {
                        id: currentUser,
                    }
                    
                });
            },

        },
        mounted() {
            this.currentUser = localStorage.getItem('user_id');
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