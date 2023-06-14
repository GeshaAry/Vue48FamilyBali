<template>
    <v-main>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="content-article" style="width:100%; max-width:1500px;">
                        <v-layout row wrap justify-center class="my-5">
                            <img :src="$baseUrl+'/storage/'+article.article_thumbnail" class="image-article"
                                style="width:100%; max-width:1500px; height:auto; border-radius: 20px 20px 0px 0px; margin-top:-20px;"
                                alt="">
                            <p class="title-article"
                                style="font-size:50px; color:black; font-weight:800; margin-top:20px;">
                                {{ article.article_title }}</p>
                        </v-layout>
                        <v-layout row wrap justify-center class="my-5" style="flex-flow:column;">
                            <p style="font-size:20px; color:black; margin-top:-20px"><i>Posted By
                                    {{ article.admin.admin_username }}</i></p>
                        </v-layout>
                        <v-layout row wrap justify-center class="my-5">
                            <div class="bottomborder"></div>
                        </v-layout>
                        <v-layout row wrap justify-center class="my-5">
                            <v-carousel hide-delimiters show-arrows-on-hover cycle :interval="100000"
                                style="height: fit-content !important; display:flex; align-items:center; justify-content:center;">
                                <template v-for="(item, index) in articlepictures">
                                    <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
                                        <v-row>
                                            <template v-for="(n, i) in columns">
                                                <template v-if="(+index + i) < articlepictures.length">
                                                    <v-col :key="i">
                                                        <div style="width:400px; height:auto; margin:20px; ">
                                                            <img :src="$baseUrl+'/storage/'+articlepictures[+index + i].article_picture"
                                                                style="object-fit: cover; width:100%; height:300px;"
                                                                alt="">
                                                        </div>
                                                    </v-col>
                                                </template>
                                            </template>
                                        </v-row>
                                    </v-carousel-item>
                                </template>
                            </v-carousel>
                        </v-layout>
                        <p class="text-boatschedule" v-html="article.article_description"></p>
                    </div>
                </v-layout>
            </v-container>
        </section>

         <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12">
                            <p style="text-align:center; font-weight:700; font-size:32px; color:#DA1F1A">All Comments
                            </p>
                        </v-col>
                        <v-col v-for="(item, index) in articlecomment" :key="index" class="mt-4" cols="12" sm="12"
                            style="display:flex; justify-content:center; align-items:center;">
                            <v-card style="box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08); width:80%; padding-bottom:20px;" class="box-comment">
                                <v-container>
                                    <v-card-title>
                                        <v-row>
                                            <v-col cols="12" md="1" class="mt-4"
                                                style="display:flex; justify-content:center; align-items:center; ">
                                                <div class="picture-profile-comment rounded-circle">
                                                    <img :src="$baseUrl+'/storage/'+item.user.user_picture"
                                                        style="object-fit:cover; width:100%; height:70px;"
                                                        class="rounded-circle" alt="">
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="11">
                                                <v-col cols="12" class="mt-9">
                                                    <p class="text-comment" style="font-weight:700; color:#DA1F1A; text-align:left;">
                                                        {{ item.user.user_name }}</p>
                                                </v-col>
                                                <v-col cols="12">
                                                    <p class="text-comment" style="color:#DA1F1A; font-size:12px; text-align:left;">
                                                        {{ item.created_at }}</p>
                                                </v-col>
                                                <v-col cols="12">
                                                    <p class="text-comment" style="color:black; text-align:left;">{{ item.article_comment }}
                                                    </p>
                                                </v-col>
                                                <v-col cols="12">
                                                    <div style="float:right; margin-right:10px; margin-bottom:10px;"
                                                        v-if="currentUser == item.user_id">
                                                        <v-icon dense color="green" @click="editItem(item)">
                                                            mdi-pencil
                                                        </v-icon>
                                                        <v-icon dense color="red" @click="deleteItem(item)">
                                                            mdi-delete
                                                        </v-icon>
                                                    </div>
                                                </v-col>

                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </section>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card style="box-shadow:0px 2px 6px rgba(0,0,0,0.05)">
                <v-card-title>
                    <p style="font-weight:700; font-size:32px; color:#DA1F1A">Update Comment</p>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-textarea v-model="form.article_comment_update" name="input-7-1" filled label="Comment" auto-grow>
                        </v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-row style="padding-bottom:30px;">
                        <v-col cols="12" md="6">
                            <div class="button-reset" @click="cancel">Cancel</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="button-post" @click="setForm">Update Comment</div>
                        </v-col>
                    </v-row>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning !</span>
                </v-card-title>
                <v-card-text>Are you sure to delete this comment?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                   <div class="form-comment">
                        <v-row>
                            <v-col cols="12">
                                 <p class="mt-4" style="text-align:center; font-weight:700; font-size:32px; color:#DA1F1A">Post Comments</p>
                            </v-col>
                            <v-col cols="12" class="mt-4">
                                    <v-textarea v-model="form.article_comment" filled rounded name="input-7-1"  label="Comment" class="text-post-comment" >
                                    </v-textarea>
                            </v-col>
                            <v-col cols="12" md="6" v-if="this.currentUser != null">
                                 <div class="button-reset" @click="resetForm()">Reset</div>
                            </v-col>
                            <v-col cols="12" md="6" v-if="this.currentUser != null">
                                <div class="button-post" @click="setForm">Post Comment</div>
                            </v-col>
                            <v-col cols="12" v-else>
                                <p style="color: #DA1F1A; font-size:15px;">Please login if you want to post a comment</p>
                            </v-col>
                        </v-row>
                   </div>
                </v-layout>
            </v-container>
        </section>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                article: {},
                articlepictures: [],
                user: [],
                dialog: false,
                dialogConfirm: false,
                inputType: 'Tambah',
                deleteId: '',
                editId: '',
                form: {
                    user_id: '',
                    user_name: '',
                    article_comment: '',
                    article_comment_update: '',
                },
                comment: new FormData,
                load: false,
                error_message: '',
                color: '',
                articlecomment: [],
                currentUser: '',
            };
        },
        methods: {
             setForm() {
                if (this.inputType !== 'Tambah') {
                    this.update();

                } else {
                    this.saveComment();
                }
            },
            saveComment() {
                this.comment.append('article_comment', this.form.article_comment);
                this.comment.append('article_id', this.$route.params.id);
                this.comment.append('user_id', localStorage.getItem('user_id'));

                var url = this.$api + '/article/' + this.$route.params.id + '/comment';
                this.load = true;

                this.$http.post(url, this.comment, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.close();
                    this.resetForm();
                    this.getArticleComment();
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
             update() {
                this.comment.append('article_comment', this.form.article_comment_update);
                this.comment.append('article_id', this.$route.params.id);
                this.comment.append('user_id', localStorage.getItem('user_id'));
                this.comment.append('_method', 'PUT');
                var url = this.$api + '/article/' + this.$route.params.id + '/comment/' + this.editId;
                this.load = true;
                this.$http.post(url, this.comment, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.resetForm();
                    this.getArticleComment();
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
                var url = this.$api + '/article/' + this.$route.params.id + '/comment/' + this.deleteId;
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
                    this.resetForm();
                    this.inputType = "Tambah";
                    this.getArticleComment();
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editItem(item) {
                this.inputType = 'Ubah';
                this.editId = item.articlecomment_id;
                this.form.article_comment_update = item.article_comment;
                this.dialog = true;
            },
            deleteItem(item) {
                this.deleteId = item.articlecomment_id;
                this.dialogConfirm = true;
            },
            cancel() {
                this.resetForm();
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = 'Tambah';
            },
            close() {
                this.dialog = false;
                this.inputType = 'Tambah';
                this.dialogConfirm = false;
            },
            resetForm() {
               this.form.event_comment = '';
            },
            cancelDelete() {
                this.dialogConfirm = false;
            },
            getIdDetail() {
                console.log(this.$route.params.id);
                this.$http.get(this.$api + '/article/' + this.$route.params.id, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }

                    })
                    .then(response => {
                        this.article = response.data.data
                        this.articlepictures = response.data.data.article_pictures
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
             getArticleComment() {
                this.$http.get(this.$api + '/article/' + this.$route.params.id + '/comment', {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }

                    })
                    .then(response => {

                        this.articlecomment = response.data.data

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            this.getIdDetail();
            this.getArticleComment();
            this.currentUser = localStorage.getItem('user_id');
        },
        computed: {
            columns() {
                if (this.$vuetify.breakpoint.xl) {
                    return 3;
                }
                if (this.$vuetify.breakpoint.lg) {
                    return 3;
                }
                if (this.$vuetify.breakpoint.md) {
                    return 2;
                }

                return 1;
            }
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .button-reset{
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        color: white;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        float: right;
        margin-right: 20px;
        border-radius: 10px;
        cursor: pointer;
    }

    .button-post{
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        color: white;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        margin-left: 20px;
        border-radius: 10px;
        cursor: pointer;
    }

    .form-comment{
        width: 50%;
        height: auto;
        padding-bottom: 10px;
        
    }
     .picture-profile-comment {
        width: 70px;
        height: 70px;
        background-color: #DA1F1A;
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

    .centered-bottom {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 20px;
    }

    .description-list {
        color: white;
        text-align: left;
    }

    .bottomline {
        border: 1px solid #CCCCCC;
        width: 100%;
    }

    .bottomborder {
        height: 1px;
        width: 90%;
        background-color: #e3e3e3;
    }

    .content-article {
        width: 80%;
        height: auto;
        background-color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        margin-top: 80px;
    }

    .text-boatschedule {
        text-align: justify;
        padding: 30px;
        width: 100%;
    }

     .v-application p {
        margin-bottom: 0px;
    }
    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:1060px) {
        .text-field-event{
            margin: 0px auto !important;
        }
        .box-comment{
            width: 100% !important;
        }
        .text-comment{
            padding-left: 20px !important;
        }
        .text-post-comment{
            width: 100% !important;
        }
        .form-comment{
            width: 100% !important;
        }
        .button-reset{
           float: none;
           margin: 0px auto !important;
        }
        .button-post{
           float: none;
           margin: 0px auto !important;
           margin-top: 20px !important;
        }
    }
</style>