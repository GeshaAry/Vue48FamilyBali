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
                                <v-text-field type="number" v-model="form.quantity" class="mt-2" style="width:400px" required> </v-text-field>
                                <div class="button-buy" @click="detailTransaction()">
                                    Buy Now 
                                </div>
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
                                    Transfer <br> {{ event.event_bankname }} {{ event.event_accountnumber }} - {{event.event_nameaccount}}</p>

                            </v-col>
                        </v-row>
                    </div>
                </v-layout>
                <div class="d-flex justify-content-center mb-8">
                    <pagination :data="gallery" @pagination-change-page="getResults"></pagination>
                </div>
            </v-container>
        </section>

        <v-dialog v-model="dialogDetailTransaction" persistent max-width="500px">
            <v-card>
                <center>
                    <p>Date buy : {{form.dateTime}}</p>
                    <p>Name : {{form.user_name}}</p>
                    <p>Event Name : {{form.event_name}}</p>
                    <p>Event Date : {{form.event_date}}</p>
                    <p>Event Time : {{form.event_time}}</p>
                    <p>Event Location : {{form.event_location}}</p>
                    <p>Event Price : {{form.event_price}}</p>
                    <p>Quantity : {{form.quantity}}</p>
                    <p>Total Price : {{form.total_price}}</p>
                </center>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDetailTransaction">Cancel</v-btn>
                    <v-btn color="#0165BC" text @click="save()">Create Transaction</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        
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
                form: {
                    user_id: '',
                    user_name:'',
                    event_name:'',
                    event_date:'',
                    event_time:'',
                    event_location:'',
                    quantity:1,
                    event_price:'',
                    total_price:'',
                    date: '',
                    time: '',
                    dateTime: '',
                    event_id:'',
                    status:'New Transaction',
                },
                transactionevent: new FormData,
                load: false,
                error_message: '',
                color: '',
            };
        },
        methods: {
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
            setDateTime(){
                this.form.date = new Date().toISOString().substr(0, 10);
                let now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();
                this.form.time = hours+':'+minutes+':'+seconds;
                this.form.dateTime = this.form.date + ' ' + this.form.time;
            },
            detailTransaction(){
                this.form.total_price = this.form.quantity * this.event.event_price;
                this.form.event_name = this.event.event_name;
                this.form.event_date = this.event.event_date;
                this.form.event_location = this.event.event_location;
                this.form.event_time = this.event.event_time;
                this.form.event_price = this.event.event_price;
                this.setDateTime();
                this.dialogDetailTransaction = true;
            },
            cancelDetailTransaction(){
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
        },
        mounted() {
            this.getIdDetail();
            this.getUser();
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

    .detail-event-content {
        width: 80%;
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

        .wrap-content-detail-member {
            display: flex !important;
            justify-content: center !important;
        }

    }
</style>