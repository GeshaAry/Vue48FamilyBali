<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Event" single-line
                    hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn style="background-color:#0165BC; color:white" @click="dialog = true"> Add Event </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="events" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.event_thumbnail`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.event_thumbnail" height="50px" width="50px"
                        style="object-fit:cover; border-radius:50%; cursor:pointer" @click="showPhotos(item)" />
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
                                    <span class="headline">Add Event</span>
                                </v-card-title>
                                <v-text-field filled rounded v-model="form.event_name" label="Event Name" required>
                                </v-text-field>
                                <v-text-field type="date" filled rounded v-model="form.event_date" label="Event Date"
                                    required>
                                </v-text-field>
                                <v-time-picker format="ampm" v-model="form.event_time"></v-time-picker>
                                <v-text-field filled rounded v-model="form.event_location" label="Event Location"
                                    required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_price" label="Event Price"
                                    required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_ammountticket" label="Event Amount Ticket"
                                    required>
                                </v-text-field>
                                <v-textarea filled rounded v-model="form.event_description"
                                    label="Event Description" required>
                                </v-textarea>
                                <v-text-field filled rounded v-model="form.event_nameaccount"
                                    label="Name Account Bank" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_accountnumber"
                                    label="Account Number" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_bankname" label="Bank Name"
                                    required>
                                </v-text-field>
                                <v-select filled rounded :items="eventStatus" v-model="form.event_verification" label="Event Status"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos"
                                    id="filePhotos" ref="filePhotosEvent"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>
                            </v-container>
                            <v-container v-else-if="inputType == 'Ubah'">
                                <v-card-title>
                                    <span class="headline">Edit Member JKT48</span>
                                </v-card-title>
                                <center>
                                    <v-img width="500px" style="border-radius:30px;"
                                        :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.event_thumbnail : previewImageUrl"
                                        id="previewImage" class="mb-5"></v-img>
                                </center>
                                 <v-text-field filled rounded v-model="form.event_name" label="Event Name" required>
                                </v-text-field>
                                <v-text-field type="date" filled rounded v-model="form.event_date" label="Event Date"
                                    required>
                                </v-text-field>
                                <v-time-picker format="ampm" v-model="form.event_time"></v-time-picker>
                                <v-text-field filled rounded v-model="form.event_location" label="Event Location"
                                    required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_price" label="Event Price"
                                    required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_ammountticket" label="Event Amount Ticket"
                                    required>
                                </v-text-field>
                                <v-textarea filled rounded v-model="form.event_description"
                                    label="Event Description" required>
                                </v-textarea>
                                <v-text-field filled rounded v-model="form.event_nameaccount"
                                    label="Name Account Bank" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_accountnumber"
                                    label="Account Number" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.event_bankname" label="Bank Name"
                                    required>
                                </v-text-field>
                                <v-select filled rounded :items="eventStatus" v-model="form.event_verification" label="Event Status"
                                    item-value="value" item-text="text">
                                </v-select>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos"
                                    id="filePhotos" ref="filePhotosEvent"></v-file-input>
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

        <v-dialog max-width="300" v-model="dialogPhotos">
            <v-card>
                <v-container>
                    <v-img width="100%"
                        :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.event_thumbnail : previewImageUrl"
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
        name: "Merchandise",
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
                isDisabled: false,
                previewImageUrl: '',
                dialogPhotos: false,
                eventStatus: [
                    {
                        text: "Coming Soon",
                        value: "Coming Soon",
                    },
                    {
                        text: "On Going",
                        value: "On Going"
                    },
                    {
                        text: "Ended",
                        value: "Ended"
                    },
                ],
                headers: [{
                        text: "Id Event",
                        align: "start",
                        sortable: true,
                        value: "event_id"
                    },
                    {
                        text: "Event Name",
                        value: "event_name"
                    },
                    {
                        text: "Date",
                        value: "event_date"
                    },
                    {
                        text: "Time",
                        value: "event_time"
                    },
                    {
                        text: "Location",
                        value: "event_location"
                    },
                    {
                        text: "Price",
                        value: "event_price"
                    },
                    {
                        text: "Stock",
                        value: "event_ammountticket"
                    },
                    {
                        text: "Description",
                        value: "event_description"
                    },
                    {
                        text: "Name Account Bank",
                        value: "event_nameaccount"
                    },
                    {
                        text: "Account Number Bank",
                        value: "event_accountnumber"
                    },
                    {
                        text: "Bank Name",
                        value: "event_bankname"
                    },
                    {
                        text: "Status",
                        value: "event_verification"
                    },
                    {
                        text: "Thumbnail",
                        value: "event_thumbnail"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                event: new FormData,
                events: [],
                form: {
                    event_name: '',
                    event_date: '',
                    event_time: '',
                    event_location: '',
                    event_price: '',
                    event_ammountticket: '',
                    event_nameaccount: '',
                    event_accountnumber: '',
                    event_bankname: '',
                    event_verification: '',
                    event_thumbnail: ''

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
                var url = this.$api + '/event';
                this.$http.get(url).then(response => {
                    this.events = response.data.data.data;
                })
            },
            save() {
                this.event.append('event_name', this.form.event_name);
                this.event.append('event_date', this.form.event_date);
                this.event.append('event_time', this.form.event_time);
                this.event.append('event_location', this.form.event_location);
                this.event.append('event_price', this.form.event_price);
                this.event.append('event_ammountticket', this.form.event_ammountticket);
                this.event.append('event_description', this.form.event_description);
                this.event.append('event_nameaccount', this.form.event_nameaccount);
                this.event.append('event_accountnumber', this.form.event_accountnumber);
                this.event.append('event_bankname', this.form.event_bankname);
                this.event.append('event_verification', this.form.event_verification);
                var inputPhotos = document.getElementById('filePhotos'),
                    dataFilePhotos = inputPhotos.files[0];
                this.event.append('event_thumbnail', dataFilePhotos ?? '');

                var url = this.$api + '/event'
                this.load = true;

                this.$http.post(url, this.event, {
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
                    data.append('event_thumbnail', dataFilePhotos);
                }
                data.append('event_name', this.form.event_name);
                data.append('event_date', this.form.event_date);
                data.append('event_time', this.form.event_time);
                data.append('event_location', this.form.event_location);
                data.append('event_price', this.form.event_price);
                data.append('event_ammountticket', this.form.event_ammountticket);
                data.append('event_description', this.form.event_description);
                data.append('event_nameaccount', this.form.event_nameaccount);
                data.append('event_accountnumber', this.form.event_accountnumber);
                data.append('event_bankname', this.form.event_bankname);
                data.append('event_verification', this.form.event_verification);
                data.append('_method', 'PUT');

                var url = this.$api + '/event/' + this.editId;
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
                var url = this.$api + '/event/' + this.deleteId;
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
                this.editId = item.event_id;
                this.form.event_name = item.event_name;
                this.form.event_date = item.event_date;
                this.form.event_time = item.event_time;
                this.form.event_location = item.event_location;
                this.form.event_price = item.event_price;
                this.form.event_ammountticket = item.event_ammountticket;
                this.form.event_description = item.event_description;
                this.form.event_nameaccount = item.event_nameaccount;
                this.form.event_accountnumber = item.event_accountnumber;
                this.form.event_bankname = item.event_bankname;
                this.form.event_verification = item.event_verification;
                this.form.event_thumbnail = item.event_thumbnail;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.event_id;
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
                    event_name: '',
                    event_date: '',
                    event_time: '',
                    event_location: '',
                    event_price: '',
                    event_ammountticket: '',
                    event_nameaccount: '',
                    event_accountnumber: '',
                    event_bankname: '',
                    event_verification: '',
                    event_thumbnail: ''
                };
                this.$refs.filePhotosEvent.reset();
            },
            showPhotos(item) {
                this.form.event_thumbnail = item.event_thumbnail;
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
        },
    };
</script>

<style scoped>
    .v-dialog {
        width: 50% !important;
    }
</style>