<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Add Package" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn style="background-color:#0165BC; color:white" @click="dialog = true"> Add Detail Activity </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="detailactivitys" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.actions`]="{ item }">
                    <div style="display:flex; align-items:center;">
                    <div style="background-color:red; width:80px;margin-left:10px; border-radius:10px; display:flex; align-items:center; justify-content:center; height:30px; color:white">
                        <span style="cursor: pointer;"  @click="deleteHandler(item)">Delete</span>
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
                                    <span class="headline">Add Detail Activity</span>
                                </v-card-title>
                                <v-select filled rounded v-model="selectActivity" :items="itemsactivity"
                                    item-text="activity_title" item-value="activity_id" label="Choose Activity" persistent-hint
                                    return-object single-line></v-select>
                                <!-- <v-autocomplete filled rounded v-model="selectMember" :items="itemsmember"
                                    item-value="member_id" label="Choose Member" persistent-hint
                                    return-object multiple>
                                    <template slot="selection" slot-scope="data">
                                        {{ data.item.member_name }} - {{ data.item.member_status}}
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        {{ data.item.member_name }} - {{ data.item.member_status}}
                                    </template>
                                </v-autocomplete> -->
                                <v-autocomplete  filled rounded v-model="selectMember" :items="itemsmember" label="Choose Member" multiple chips deletable-chips>
                                    
                                </v-autocomplete>
                            </v-container>
                            <v-container v-else-if="inputType == 'Ubah'">  
                                <v-card-title>
                                    <span class="headline">Edit Detail Activity</span>
                                </v-card-title>
                                <v-select filled rounded v-model="selectActivity" :items="itemsactivity"
                                    item-text="activity_title" item-value="activity_id" label="Choose Activity" persistent-hint
                                    return-object single-line></v-select>
                                <v-select filled rounded v-model="selectMember" :items="itemsmember"
                                    item-value="member_id" label="Choose Member" persistent-hint
                                    return-object multiple>
                                    <template slot="selection" slot-scope="data">
                                        {{ data.item.member_name }} - {{ data.item.member_status}}
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        {{ data.item.member_name }} - {{ data.item.member_status}}
                                    </template>
                                </v-select>
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
        name: "DetailActivity",
        data() {
            return {
                selectActivity:[],
                selectMember:[],
                member_id:[],
                items: [],
                itemsactivity: [],
                itemsmember: [],
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
                headers: [{
                        text: "Detail Activity",
                        align: "start",
                        sortable: true,
                        value: "detailactivity_id"
                    },
                    {
                        text: "Activity Title",
                        value: "activity.activity_title"
                    },
                    {
                        text: "Member Name",
                        value: "member.member_name"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                detailactivity: new FormData,
                detailactivitys: [],
                form: {
                    detailactivity_id: '',
                    selectActivity: '',
                    selectMember:'',
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            setForm() {
                if (this.inputType !== 'Tambah') {
                    this.update();

                } else {
                    this.save();


                }
            },
            getAllActivity() {
                var url = this.$api + '/allactivity';
                this.$http.get(url).then(response => {
                    this.itemsactivity = response.data.data;
                })
            },
             getAllMember() {
                var url = this.$api + '/allmember';
                this.$http.get(url).then(response => {
                    // this.itemsmember = response.data.data;
                        let data = JSON.parse(JSON.stringify(response.data.data));
                        data.forEach((item)=>{
                        let dashboard = item;
                        dashboard.text = item.member_name + '-' + item.member_status
                        dashboard.value = item.member_id
                        this.itemsmember.push(dashboard);
                    });
                })
            },
             readData() {
                var url = this.$api + '/detailactivity';
                this.$http.get(url).then(response => {
                    this.detailactivitys = response.data.data;
                })
            },
            save() {
                this.detailactivity.append('activity_id', this.selectActivity.activity_id ?? '');
                for(let i=0; i<this.selectMember.length; i++){
                    this.detailactivity.append('member_id[]', this.selectMember[i] ?? '');
                }

                var url = this.$api + '/detailactivity'
                this.load = true;

                this.$http.post(url, this.detailactivity, {
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
                var data = new FormData()
                data.append('member_id', this.selectMember.member_id ?? '');
                data.append('_method', 'PUT');

                var url = this.$api + '/detailactivity/' + this.editId;
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
                var url = this.$api + '/detailactivity/' + this.deleteId;
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
                this.editId = item.detailactivity_id;
                this.selectActivity = {
                    activity_id: item.detailactivitys.activity_id,
                    activity_title: item.detailactivitys.activity_title
                }
                this.selectMember = {
                    member_id: item.memberjkt48s.member_id,
                    member_name: item.memberjkt48s.member_name
                }
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.detailactivity_id;
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
                this.selectActivity = '';
                this.selectMember = '';
            }
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
            this.getAllActivity();
            this.getAllMember();
        },
    };
</script>