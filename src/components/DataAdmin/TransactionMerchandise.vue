<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Transaction Merchandise" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headers" :items="transactionmerchandises" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.merchandisetns_proofpayment`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.merchandisetns_proofpayment" height="50px" width="50px" 
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
                                    <span class="headline">Edit Transaction Merchandise</span>
                                </v-card-title>
                                <v-select filled rounded :items="merchandiseStatus" v-model="form.merchandisetns_status" label="Status"
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

        <v-dialog max-width="500px" v-model="dialogPhotos">
            <v-card>
                <v-container>
                   <v-img width="100%" :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.merchandisetns_proofpayment : previewImageUrl"
                    id="previewImage" class="mb-5"></v-img>
                </v-container>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<script>
    export default {
        name: "TransactionMerchandise",
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
                merchandiseStatus: [
                    {
                        text: "Transaction Failed",
                        value: "Transaction Failed"
                    },
                    {
                        text: "Transaction Success",
                        value: "Transaction Success"
                    },
                ],
                headers: [
                   {
                        text: "Name",
                        value: "user.user_name"
                    },
                    {
                        text: "Admin",
                        value: "admin.admin_username"
                    },
                    {
                        text: "Date Buy",
                        value: "merchandisetns_datebuy"
                    },
                    {
                        text: "Merchandise Name",
                        value: "merchandise_variant.merchandise.merchandise_name"
                    },
                    {
                        text: "Size",
                        value: "merchandise_variant.merchandisevar_size"
                    },
                    {
                        text: "Price",
                        value: "merchandise_variant.merchandisevar_price"
                    },
                    {
                        text: "Quantity",
                        value: "merchandisetns_quantity"
                    },
                    {
                        text: "Total Price",
                        value: "merchandisetns_totalprice"
                    },
                    {
                        text: "Proof Payment",
                        value: "merchandisetns_proofpayment"
                    },
                    {
                        text: "Status",
                        value: "merchandisetns_status"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                transactionmerchandise: new FormData,
                transactionmerchandises: [],
                form: {
                    admin_id: '',
                    merchandisetns_status:'',
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            onPreviewImage(e) {
                this.previewImageUrl = URL.createObjectURL(e)
            },
            readData() {
                var url = this.$api + '/transactionmerchandise';
                this.$http.get(url).then(response => {
                    this.transactionmerchandises = response.data.data;
                })
            },
            update() {
                var data = new FormData()

                data.append('admin_id', localStorage.getItem('admin_id'));
                data.append('merchandisetns_status', this.form.merchandisetns_status);

                var url = this.$api + '/updatestatusmerchandise/' + this.editId;
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
                this.editId = item.merchandisetns_id;
                this.form.merchandisetns_status = item.merchandisetns_status;
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
                    merchandisetns_status: ''
                };
            },
            showPhotos(item){
                this.form.merchandisetns_proofpayment = item.merchandisetns_proofpayment;
                this.dialogPhotos = true;
            }
        },
        mounted() {
            this.readData();
        },
    };
</script>