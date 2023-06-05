<template>
    <v-main class="list">
        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05); background-color:white">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Merchandise" single-line
                    hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn style="background-color:#0165BC; color:white" @click="dialog = true"> Add Merchandise </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="merchandises" :search="search"
                style="background-color:white; color:black;">
                <template v-slot:[`item.merchandise_picture`]="{item}">
                    <v-img :src="$baseUrl+'/storage/'+item.merchandise_picture" height="50px" width="50px"
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
                <v-dialog max-width="800" v-model="dialog" persistent>
                    <v-card>
                        <v-card-text>
                            <v-container v-if="inputType == 'Tambah'">
                                <v-card-title>
                                    <span class="headline">Add Merchandise</span>
                                </v-card-title>
                                <v-select filled rounded v-model="selectCategory" :items="itemscategory"
                                    item-text="merchandisectg_name" item-value="merchandisectg_id "
                                    label="Choose Category Merchandise" persistent-hint return-object single-line
                                    ></v-select>
                                <v-text-field filled rounded v-model="form.merchandise_name" label="Merchandise Name"
                                    required>
                                </v-text-field>
                                <v-textarea filled rounded v-model="form.merchandise_description"
                                    label="Merchandise Description" required>
                                </v-textarea>
                                <v-text-field filled rounded v-model="form.merchandise_nameaccount"
                                    label="Name Account Bank" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.merchandise_accountnumber"
                                    label="Account Number" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.merchandise_bankname" label="Bank Name"
                                    required>
                                </v-text-field>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos"
                                    id="filePhotos" ref="filePhotosMerchandise"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>

                                <div v-for="(textField, i) in textfields" :key="i" class="text-fields-row" style="margin-top:20px;">

                                    <v-text-field filled rounded :label="textField.labelSize" v-model="textField.merchandisevar_size"></v-text-field>
                                    <v-text-field filled rounded :label="textField.labelPrice" v-model="textField.merchandisevar_price"></v-text-field>
                                    <v-text-field filled rounded :label="textField.labelStock" v-model="textField.merchandisevar_stock"></v-text-field>
                                    
                                    <v-btn @click="remove(i)" class="error">delete</v-btn>
                                </div>
                                <v-btn style="margin-top:20px !important" @click="add" class="primary">add</v-btn>
                            </v-container>
                            <v-container v-else-if="inputType == 'Ubah'">
                                <v-card-title>
                                    <span class="headline">Edit Member JKT48</span>
                                </v-card-title>
                                <center>
                                    <v-img width="500px" style="border-radius:30px;"
                                        :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.merchandise_picture : previewImageUrl"
                                        id="previewImage" class="mb-5"></v-img>
                                </center>
                                <v-select filled rounded v-model="selectCategory" :items="itemscategory"
                                    item-text="merchandisectg_name" item-value="merchandisectg_id "
                                    label="Choose Category Merchandise" persistent-hint return-object single-line
                                    ></v-select>
                                <v-text-field filled rounded v-model="form.merchandise_name" label="Merchandise Name"
                                    required>
                                </v-text-field>
                                <v-textarea filled rounded v-model="form.merchandise_description"
                                    label="Merchandise Description" required>
                                </v-textarea>
                                <v-text-field filled rounded v-model="form.merchandise_nameaccount"
                                    label="Name Account Bank" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.merchandise_accountnumber"
                                    label="Account Number" required>
                                </v-text-field>
                                <v-text-field filled rounded v-model="form.merchandise_bankname" label="Bank Name"
                                    required>
                                </v-text-field>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="Upload Photos"
                                    id="filePhotos" ref="filePhotosMerchandise"></v-file-input>
                                <span>Upload maximum size file picture: 1 MB</span>

                                <div v-for="(textField, i) in textfields" :key="i" class="text-fields-row" style="margin-top    :20px;">

                                    <v-text-field filled rounded :label="textField.labelSize" v-model="textField.merchandisevar_size"></v-text-field>
                                    <v-text-field filled rounded :label="textField.labelPrice" v-model="textField.merchandisevar_price"></v-text-field>
                                    <v-text-field filled rounded :label="textField.labelStock" v-model="textField.merchandisevar_stock"></v-text-field>
                                    
                                    <v-btn  @click="remove(i)" class="error">delete</v-btn>
                                </div>
                                <v-btn style="margin-top:20px !important" @click="add" class="primary">add</v-btn>
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
                        :src="previewImageUrl == '' ? $baseUrl+'/storage/'+form.merchandise_picture : previewImageUrl"
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
                selectCategory: '',
                itemscategory: [],
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
                textfields: [{
                    merchandisevar_size: '',
                    merchandisevar_price: '',
                    merchandisevar_stock: '',
                    labelSize: 'Merchandise Size',
                    labelPrice: 'Merchandise Price',
                    labelStock: 'Merchandise Stock',
                }],
                headers: [{
                        text: "Id Merchandise",
                        align: "start",
                        sortable: true,
                        value: "merchandise_id"
                    },
                    {
                        text: "Category Merchandise",
                        value: "merchandise_category.merchandisectg_name"
                    },
                    {
                        text: "Merchandise Name",
                        value: "merchandise_name"
                    },
                    {
                        text: "Merchandise Picture",
                        value: "merchandise_picture"
                    },
                    {
                        text: "Merchandise Description",
                        value: "merchandise_description"
                    },
                    {
                        text: "Name Account Bank",
                        value: "merchandise_nameaccount"
                    },
                    {
                        text: "Account Number Bank",
                        value: "merchandise_accountnumber"
                    },
                    {
                        text: "Bank",
                        value: "merchandise_bankname"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                merchandise: new FormData,
                merchandises: [],
                form: {
                    selectCategory: '',
                    merchandise_name: '',
                    merchandise_picture: '',
                    merchandise_description: '',
                    merchandise_nameaccount: '',
                    merchandise_accountnumber: '',
                    merchandise_bankname: '',
                    merchandisevar_size: '',
                    merchandisevar_price: '',
                    merchandisevar_stock: '',

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
            getAllCategory() {
                var url = this.$api + '/merchandisectg';
                this.$http.get(url).then(response => {
                    this.itemscategory = response.data.data;
                })
            },
            readData() {
                var url = this.$api + '/merchandise';
                this.$http.get(url).then(response => {
                    this.merchandises = response.data.data.data;
                })
            },
            save() {
                this.merchandise.append('merchandisectg_id', this.selectCategory.merchandisectg_id ?? '');
                this.merchandise.append('merchandise_name', this.form.merchandise_name);
                this.merchandise.append('merchandise_description', this.form.merchandise_description);
                this.merchandise.append('merchandise_nameaccount', this.form.merchandise_nameaccount);
                this.merchandise.append('merchandise_accountnumber', this.form.merchandise_accountnumber);
                this.merchandise.append('merchandise_bankname', this.form.merchandise_bankname);
                for(let i=0; i<this.textfields.length; i++){
                    this.merchandise.append('merchandise_variant[]', JSON.stringify(this.textfields[i]));
                }

                var inputPhotos = document.getElementById('filePhotos'),
                dataFilePhotos = inputPhotos.files[0];
                this.merchandise.append('merchandise_picture', dataFilePhotos ?? '');


                var url = this.$api + '/merchandise'
                this.load = true;
                
                console.log(this.merchandise);

                this.$http.post(url, this.merchandise, {
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
                    data.append('merchandise_picture', dataFilePhotos);
                }
                data.append('merchandisectg_id', this.selectCategory.merchandisectg_id ?? '');
                data.append('merchandise_name', this.form.merchandise_name);
                data.append('merchandise_description', this.form.merchandise_description);
                data.append('merchandise_nameaccount', this.form.merchandise_nameaccount);
                data.append('merchandise_accountnumber', this.form.merchandise_accountnumber);
                data.append('merchandise_bankname', this.form.merchandise_bankname);
                for(let i=0; i<this.textfields.length; i++){
                    data.append('merchandise_variant[]', JSON.stringify(this.textfields[i]));
                }
                data.append('_method', 'PUT');

                var url = this.$api + '/merchandise/' + this.editId;
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
                var url = this.$api + '/merchandise/' + this.deleteId;
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
                this.editId = item.merchandise_id;
                this.form.merchandise_name = item.merchandise_name;
                this.form.merchandise_picture = item.merchandise_picture;
                this.form.merchandise_description = item.merchandise_description;
                this.form.merchandise_nameaccount = item.merchandise_nameaccount;
                this.form.merchandise_accountnumber = item.merchandise_accountnumber;
                this.form.merchandise_bankname = item.merchandise_bankname;
                this.selectCategory = {
                    merchandisectg_id: item.merchandise_category.merchandisectg_id,
                    merchandisectg_name: item.merchandise_category.merchandisectg_name
                }
                this.textfields = [];
                item.merchandise_variant.forEach((x) => {
                    this.textfields.push({ 
                        merchandisevar_size: x.merchandisevar_size,
                        merchandisevar_price: x.merchandisevar_price,
                        merchandisevar_stock: x.merchandisevar_stock,
                        labelSize: 'Merchandise Size',
                        labelPrice: 'Merchandise Price',
                        labelStock: 'Merchandise Stock',
                    })
                });
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.merchandise_id;
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
                this.textfields = [{
                    merchandisevar_size: '',
                    merchandisevar_price: '',
                    merchandisevar_stock: '',
                    labelSize: 'Merchandise Size',
                    labelPrice: 'Merchandise Price',
                    labelStock: 'Merchandise Stock',
                }],
                this.resetForm();
            },
            cancelDelete() {
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    merchandise_name: '',
                    merchandise_picture: '',
                    merchandise_description: '',
                    merchandise_nameaccount: '',
                    merchandise_accountnumber: '',
                    merchandise_bankname: '',
                };
                this.selectCategory = ''
                this.$refs.filePhotosMerchandise.reset();
            },
            showPhotos(item) {
                this.form.merchandise_picture = item.merchandise_picture;
                this.dialogPhotos = true;
            },
            remove (index) {
                this.textfields.splice(index, 1)
            },
            add () {
                this.textfields.push({ 
                    merchandisevar_size: '',
                    merchandisevar_price: '',
                    merchandisevar_stock: '',
                    labelSize: 'Merchandise Size',
                    labelPrice: 'Merchandise Price',
                    labelStock: 'Merchandise Stock',
                })
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
            this.getAllCategory();
        },
    };
</script>

<style scoped>
    .v-dialog {
        width: 50% !important;
    }
</style>