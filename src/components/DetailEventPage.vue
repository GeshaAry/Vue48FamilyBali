<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Event</div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="detail-event-content">
                        <v-row>
                            <v-col cols="12" md="6" style="display:flex; justify-content:center; align-items:center;">
                                <div class="mt-4" style="background-color:black; width:90%; height:400px">
                                    <img :src="$baseUrl+'/storage/'+event.event_thumbnail"
                                        style="object-fit: cover; width:100%; height:400px;" class="pictures" alt="">
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p class="mt-4 sub-text-detail-event"
                                    style="font-weight:700; color: #DA1F1A; font-size:50px; text-align:left;">
                                    {{ event.event_name }}</p>
                                <p class="mt-2 sub-text-detail-event"
                                    style="color: #DA1F1A; text-align:left; font-size:30px;">
                                    Rp.{{ event.event_price }}</p>
                                <p class="mt-2 sub-text-detail-event"
                                    style="color: #DA1F1A; text-align:justify; font-size:15px; padding-right:20px;">
                                    Location</p>
                                <p class="mt-2 sub-text-detail-event"
                                    style=" font-weight:700; color: #DA1F1A; text-align:justify; font-size:20px; padding-right:20px;">
                                    {{ event.event_location }}</p>
                                <p class="mt-2 sub-text-detail-event"
                                    style="color: #DA1F1A; text-align:justify; font-size:15px; padding-right:20px;">
                                    Date and Time</p>
                                <p class="mt-2 sub-text-detail-event"
                                    style=" font-weight:700; color: #DA1F1A; text-align:justify; font-size:20px; padding-right:20px;">
                                    {{ event.event_date }} - {{event.event_time}}</p>
                                <p class="mt-2 sub-text-detail-event"
                                    style="color: #DA1F1A; text-align:justify; font-size:15px; padding-right:20px;">
                                    Quantity</p>
                                <v-text-field type="number" v-model="form.quantity" class="mt-2 text-field-event" style="width:400px"
                                    required> </v-text-field>
                                <div v-if="this.currentUser != null " class="button-buy" @click="detailTransaction()">
                                    Buy Now
                                </div>
                                <p v-else class="mt-2 sub-text-detail-event"
                                    style="color: #DA1F1A; text-align:justify; font-size:15px; padding-right:20px;">
                                    Please login if you want to buy</p>
                            </v-col>
                        </v-row>
                        <v-row class="wrap-content-detail-member">
                            <v-col cols="12">
                                <p class="mt-10"
                                    style="font-weight:700; color: #DA1F1A; font-size:32px; text-align:left; padding-left:30px;">
                                    Description</p>
                                <p class="mt-4"
                                    style="color: #DA1F1A; font-size:16px; text-align:justify; padding-left:30px; padding-right:30px;">
                                    {{ event.event_description }} </p>

                                <p class="mt-4"
                                    style="color: #DA1F1A; font-size:16px; text-align:justify; padding-left:30px; padding-right:30px;">
                                    Transfer <br> {{ event.event_bankname }} {{ event.event_accountnumber }} -
                                    {{event.event_nameaccount}}</p>

                            </v-col>
                        </v-row>
                    </div>
                </v-layout>
            </v-container>
        </section>

        <v-dialog v-model="dialogDetailTransaction" persistent max-width="1500px">
            <v-card style="padding-bottom:30px;">
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="wrap-datebuy">
                            <p>Date buy : {{form.dateTime}}</p>
                            <p>Name : {{form.user_name}}</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div style="width:60px; height:60px; background-color:#DA1F1A; float:right; margin-top:20px; margin-right:20px;"
                            class="rounded-circle">
                            <img src="../assets/Logo48.png" alt="" style=" object-fit:cover; width:100%; height:60px;">
                        </div>
                    </v-col>
                    <!-- section title -->
                    <v-col cols="12">
                        <p style="font-weight:700; font-size:42px; color:#DA1F1A; text-align:center;">E-TICKET EVENT</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-4">
                        <p style="font-weight:700; font-size:14px; color:#DA1F1A; text-align:center;">EVENT NAME</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-4">
                        <p style="font-weight:700; font-size:14px; color:#DA1F1A; text-align:center;">EVENT DATE</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-4">
                        <p style="font-weight:700; font-size:14px; color:#DA1F1A; text-align:center;">EVENT TIME</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-4">
                        <p style="font-weight:700; font-size:14px; color:#DA1F1A; text-align:center;">EVENT LOCATION</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-4">
                        <p style="font-weight:700; font-size:14px; color:#DA1F1A; text-align:center;">EVENT PRICE</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-4">
                        <p style="font-weight:700; font-size:14px; color:#DA1F1A; text-align:center;">QUANTITY</p>
                    </v-col>

                    <v-col cols="12" class="mt-2">
                        <div style="width:100%; height:1px; background-color:#DA1F1A"></div>
                    </v-col>

                    <!-- section data -->
                    <v-col cols="12" md="2" class="mt-2">
                        <p style="font-size:14px; color:#DA1F1A; text-align:center;">{{form.event_name}}</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-2">
                        <p style="font-size:14px; color:#DA1F1A; text-align:center;">{{form.event_date}}</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-2">
                        <p style="font-size:14px; color:#DA1F1A; text-align:center;">{{form.event_time}}</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-2">
                        <p style="font-size:14px; color:#DA1F1A; text-align:center;">{{form.event_location}}</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-2">
                        <p style="font-size:14px; color:#DA1F1A; text-align:center;">{{form.event_price}}</p>
                    </v-col>
                    <v-col cols="12" md="2" class="mt-2">
                        <p style="font-size:14px; color:#DA1F1A; text-align:center;">{{form.quantity}}</p>
                    </v-col>

                    <v-col cols="12" md="6">

                    </v-col>
                    <v-col cols="12" md="6" class="mt-4">
                        <p
                            style="font-weight:700; font-size:24px; color:#DA1F1A; text-align:right; padding-right:20px;">
                            Total Price :
                            Rp{{form.total_price.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")}}</p>
                    </v-col>

                    <v-col cols="12" md="6">
                        <div @click="cancelDetailTransaction"
                            style="width:200px; height:50px; border-radius:10px; background-color:#DA1F1A; display:flex; justify-content:center;
                            align-items:center; font-weight:700; color:white; font-size:16px; float:right; margin-right:20px; cursor:pointer;">
                            Cancel
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div style="width:200px; height:50px; border-radius:10px; background-color:#DA1F1A; display:flex; justify-content:center;
                            align-items:center; font-weight:700; color:white; font-size:16px; cursor:pointer;"
                            @click="save()">
                            Create Transaction
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12">
                            <p style="text-align:center; font-weight:700; font-size:32px; color:#DA1F1A">All Comments
                            </p>
                        </v-col>
                        <v-col v-for="(item, index) in eventcomment" :key="index" class="mt-4" cols="12" sm="12"
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
                                                    <p class="text-comment" style="color:black; text-align:left;">{{ item.event_comment }}
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
                        <v-textarea v-model="form.event_comment_update" name="input-7-1" filled label="Comment" auto-grow>
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
                                    <v-textarea v-model="form.event_comment" filled rounded name="input-7-1"  label="Comment">
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
                event: [],
                user: [],
                dialogDetailTransaction: false,
                dialog: false,
                dialogConfirm: false,
                inputType: 'Tambah',
                deleteId: '',
                editId: '',
                form: {
                    user_id: '',
                    user_name: '',
                    event_name: '',
                    event_date: '',
                    event_time: '',
                    event_location: '',
                    quantity: 1,
                    event_price: '',
                    total_price: '',
                    date: '',
                    time: '',
                    dateTime: '',
                    event_id: '',
                    status: 'New Transaction',
                    event_comment: '',
                    event_comment_update: '',
                },
                transactionevent: new FormData,
                comment: new FormData,
                load: false,
                error_message: '',
                color: '',
                eventcomment: [],
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
                this.comment.append('event_comment', this.form.event_comment);
                this.comment.append('event_id', this.$route.params.id);
                this.comment.append('user_id', localStorage.getItem('user_id'));

                var url = this.$api + '/event/' + this.$route.params.id + '/comment';
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
                    this.getEventComment();
                    location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
             update() {
                this.comment.append('event_comment', this.form.event_comment_update);
                this.comment.append('event_id', this.$route.params.id);
                this.comment.append('user_id', localStorage.getItem('user_id'));
                this.comment.append('_method', 'PUT');
                var url = this.$api + '/event/' + this.$route.params.id + '/comment/' + this.editId;
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
                    this.getEventComment();
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
                var url = this.$api + '/event/' + this.$route.params.id + '/comment/' + this.deleteId;
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
                    this.getEventComment();
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
                this.editId = item.eventcomment_id;
                this.form.event_comment_update = item.event_comment;
                this.dialog = true;
            },
            deleteItem(item) {
                this.deleteId = item.eventcomment_id;
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
                this.$http.get(this.$api + '/event/' + this.$route.params.id, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        this.event = response.data.data;
                    })
                    .catch(error => {
                        console.log(error)
                    })


            },
            getUser() {
                this.$http.get(this.$api + '/user/' + localStorage.getItem('user_id'), )
                    .then(response => {
                        this.form.user_id = response.data.data.user_id;
                        this.form.user_name = response.data.data.user_name;
                        console.log(this.user);
                    }).catch(error => {
                        console.log(error)
                    })
            },
            setDateTime() {
                this.form.date = new Date().toISOString().substr(0, 10);
                let now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();
                this.form.time = hours + ':' + minutes + ':' + seconds;
                this.form.dateTime = this.form.date + ' ' + this.form.time;
            },
            detailTransaction() {
                this.form.total_price = this.form.quantity * this.event.event_price;
                this.form.event_name = this.event.event_name;
                this.form.event_date = this.event.event_date;
                this.form.event_location = this.event.event_location;
                this.form.event_time = this.event.event_time;
                this.form.event_price = this.event.event_price;
                this.setDateTime();
                this.dialogDetailTransaction = true;
            },
            cancelDetailTransaction() {
                this.dialogDetailTransaction = false;
            },
            save() {
                this.transactionevent.append('user_id', localStorage.getItem('user_id'));
                this.transactionevent.append('event_id', this.$route.params.id);
                this.transactionevent.append('transactionevent_datebuy', this.form.dateTime);
                this.transactionevent.append('transactionevent_quantity', this.form.quantity);
                this.transactionevent.append('transactionevent_totalprice', this.form.total_price);
                this.transactionevent.append('transactionevent_status', this.form.status);

                var url = this.$api + '/transactionevent'
                this.load = true;

                this.$http.post(url, this.transactionevent, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.dialogDetailTransaction = false;
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            getEventComment() {
                this.$http.get(this.$api + '/event/' + this.$route.params.id + '/comment', {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }

                    })
                    .then(response => {

                        this.eventcomment = response.data.data

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            this.getIdDetail();
            this.getUser();
            this.currentUser = localStorage.getItem('user_id');
            this.getEventComment();
        }

    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
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

    .wrap-datebuy {
        width: 350px;
        height: 100px;
        background-color: #DA1F1A;
        border-radius: 0px 0px 20px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        color: white;
        font-weight: 700;
        font-size: 16px;
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

    .detail-event-content {
        max-width: 1450px;
        height: auto;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        padding-bottom: 20px;
    }

    .title-detail-activity {
        width: 100%;
        height: 100px;
        background-color: #DA1F1A;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .detail-member-content {
        width: 180px;
        height: auto;
        background-color: white;
        margin: 20px;
    }

    .detail-member-picture {
        background-color: orange;
        width: 180px;
        height: 180px;
        border-radius: 100%;
    }

    .chip-member {
        width: 200px;
        height: 40px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #DA1F1A !important;
        color: white !important;
        font-weight: 700;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    .text-member-notfound {
        font-weight: 700;
        color: grey;
        opacity: 0.3;
        padding: 200px;
        text-align: center;
        font-size: 40px;
    }

    .button-buy {
        width: 400px;
        height: 50px;
        background-color: #DA1F1A;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
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

        .detail-event-content {
            width: 100%;
        }

        .sub-text-detail-event {
            text-align: center !important;
        }

        .sub-description-detail-event {
            padding: 20px !important;
        }

        .text-field-event{
            margin: 0px auto !important;
        }
        .button-buy {
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