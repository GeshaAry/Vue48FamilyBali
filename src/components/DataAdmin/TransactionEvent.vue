<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Transaction Event" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headers" :items="transactionevents" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.transactionevent_proofpayment`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.transactionevent_proofpayment" height="50px" width="50px" 
                        style="object-fit:cover; border-radius:50%; cursor:pointer" @click="showPhotos(item)" />
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
                <v-dialog max-width="500" v-model="dialog" persistent>
                    <v-card>
                        <v-card-text>
                             <v-container>
                                <v-card-title>
                                    <span class="headline">Edit Transaction Event</span>
                                </v-card-title>
                                <center>
                                  <v-img width="500px" style="border-radius:30px;"
                                    :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.transactionevent_proofpayment : previewImageUrl"
                                    id="previewImage" class="mb-5"></v-img>
                                </center>
                                <v-select filled rounded :items="eventStatus" v-model="form.transactionevent_status" label="Status"
                                    item-value="value" item-text="text">
                                </v-select>
                            </v-container>
                        </v-card-text>
                        <v-card-action>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="update">Save</v-btn>
                        </v-card-action>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <v-dialog max-width="200px" v-model="dialogPhotos">
            <v-card>
                <v-container>
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.transactionevent_proofpayment : previewImageUrl"
                    id="previewImage" class="mb-5"></v-img>
                </v-container>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<script>
    export default {
        name: "TransactionEvent",
        data() {
            return {
                items: [],
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
                eventStatus: [
                    {
                        text: "Transaction Failed",
                        value: "Transaction Failed"
                    },
                    {
                        text: "Transaction Success",
                        value: "Transaction Success"
                    },
                ],
                headers: [{
                        text: "Transaction Event Id",
                        align: "start",
                        sortable: true,
                        value: "transactionevent_id"
                    },
                    {
                        text: "Name",
                        value: "user.user_name"
                    },
                    {
                        text: "Admin",
                        value: "admin.admin_username"
                    },
                    {
                        text: "Event Name",
                        value: "event.event_name"
                    },
                    {
                        text: "Date Buy",
                        value: "transactionevent_datebuy"
                    },
                    {
                        text: "Quantity",
                        value: "transactionevent_quantity"
                    },
                    {
                        text: "Total Price",
                        value: "transactionevent_totalprice"
                    },
                    {
                        text: "Proof Payment",
                        value: "transactionevent_proofpayment"
                    },
                    {
                        text: "Status",
                        value: "transactionevent_status"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                transactionevent: new FormData,
                transactionevents: [],
                form: {
                    admin_id: '',
                    transactionevent_status:'',
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            onPreviewImage(e) {
                this.previewImageUrl = URL.createObjectURL(e)
            },
            getAllCategory() {
                var url = this.$api + '/activity';
                this.$http.get(url).then(response => {
                    this.items = response.data.data;
                })
            },
            readData() {
                var url = this.$api + '/transactionevent';
                this.$http.get(url).then(response => {
                    this.transactionevents = response.data.data;
                })
            },
            update() {
                var data = new FormData()

                data.append('admin_id', localStorage.getItem('admin_id'));
                data.append('transactionevent_status', this.form.transactionevent_status);

                var url = this.$api + '/updatestatusevent/' + this.editId;
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
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editHandler(item) {
                this.editId = item.transactionevent_id ;
                this.form.transactionevent_proofpayment = item.transactionevent_proofpayment;
                this.form.transactionevent_status = item.transactionevent_status;
                this.dialog = true;
            },
            close() {
                this.dialog = false;
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
                    transactionevent_status: ''
                };
            },
            showPhotos(item){
                this.form.transactionevent_proofpayment = item.transactionevent_proofpayment;
                this.dialogPhotos = true;
            }
        },
        mounted() {
            this.readData();
        },
    };
</script>