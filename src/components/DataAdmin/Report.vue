<template>
    <v-main class="list">
        <v-container style="display:flex; position:relative;">
            <v-layout row wrap justify-center class="my-5">
                <section style="display:flex; justify-content:center; align-items:center; flex-flow:column;">  
                    <div class="box-wrap-report">
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-row>
                                    <v-col cols="12" class="mt-4">
                                        <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left; padding-left:30px;">Report Event</p>
                                    </v-col>
                                    <v-col cols="12" md="6" style="padding:30px;">
                                         <v-text-field type="date" v-model="start_date" filled rounded 
                                         label="Start Date" required style="width:520px;"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" style="padding:30px;">
                                         <v-text-field type="date" v-model="end_date" filled rounded 
                                         label="End Date" required style="width:520px;"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="2">
                                <div class="wrap-button-download">
                                    <div class="button-download" @click="downloadReportEvent()">
                                        Download Report
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="box-wrap-report">
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-row>
                                    <v-col cols="12" class="mt-4">
                                        <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left; padding-left:30px;">Report Merchandise</p>
                                    </v-col>
                                     <v-col cols="12" md="6" style="padding:30px;">
                                         <v-text-field type="date" v-model="start_date_merchandise" filled rounded 
                                         label="Start Date" required style="width:520px;"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" style="padding:30px;">
                                         <v-text-field type="date" v-model="end_date_merchandise" filled rounded 
                                         label="End Date" required style="width:520px;"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="2">
                                <div class="wrap-button-download">
                                    <div class="button-download" @click="downloadReportMerchandise()">
                                        Download Report
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </section>
            </v-layout>
        </v-container>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<script>
    export default {
        name: "Report",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: [],
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                isDisabled: false,
                start_date: '',
                end_date:'',
                start_date_merchandise: '',
                end_date_merchandise:'',
            };
        },
        methods: {
          downloadReportEvent(){
                var url = this.$api + "/reportevent?start_date=" + this.start_date + "&end_date=" + this.end_date;
                this.$http.get(url, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    let blob = new Blob([response.data], { type: 'application/pdf' });
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = 'Report Event.pdf';
                    link.click();
                })
                .catch((error) => {
                    this.snackbar.error_message = error.response.data.message;
                    this.snackbar.color = "red";
                });
            },

            downloadReportMerchandise(){
                var url = this.$api + "/reportmerchandise?start_date=" + this.start_date_merchandise + "&end_date=" + this.end_date_merchandise;
                this.$http.get(url, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    let blob = new Blob([response.data], { type: 'application/pdf' });
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = 'Report Merchandise.pdf';
                    link.click();
                })
                .catch((error) => {
                    this.snackbar.error_message = error.response.data.message;
                    this.snackbar.color = "red";
                });
            },
        },
    };
</script>

<style scoped>
    .box-wrap-report {
        width: 1500px;
        height: 300px;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
    }

    .button-download{
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        border-radius: 20px;
        cursor: pointer;
    }

    .wrap-button-download{
        width: 300px;
        height: 300px;
        background-color: white;
        margin-left: -70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 2px #DA1F1A solid;
        border-radius: 0px 20px 20px 0px;
    }
    .v-dialog {
        width: 50% !important;
    }
</style>