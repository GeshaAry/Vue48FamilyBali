<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Merchandise</div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="merchandise-content" v-for="(item, index) in merchandise.data" :key="index">
                        <div class="thumbnail-merchandise" v-if="item.merchandise_picture != null">
                            <img :src="$baseUrl+'/storage/'+item.merchandise_picture"
                                style="object-fit: cover; width:100%; height:300px;" alt="">
                        </div>
                        <div class="thumbnail-merchandise" v-else>
                            <p>No Photo</p>
                        </div>
                        <v-row>
                            <v-col cols="12" class="mt-4" md="6">
                                <p
                                    style="font-weight:700; font-size:24px; color:black; text-align:left; padding-left:20px;">
                                    {{ item.merchandise_name}}
                                </p>
                            </v-col>
                            <v-col cols="12" class="mt-4" md="6">
                                <p class="text-merchandise-category" style="font-size:16px; color:#797979; text-align:right; padding-right:20px;">
                                    {{ item.merchandise_category.merchandisectg_name}}
                                </p>
                            </v-col>
                            <v-col cols="12" class="mt-4">
                                <p style="font-size:20px; text-align:justify; color:#797979; float:left; padding-left:20px; padding-right:20px;"
                                    v-html="item.merchandise_description.substring(0, 200) +'...'">
                                </p>
                            </v-col>
                            <v-col cols="12" class="mt-4">
                                <div class="button-merchandise" style="cursor:pointer; margin-left:20px;"
                                    @click="detailMerchandise(item.merchandise_id)">
                                    Detail
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-layout>
                <div class="d-flex justify-content-center mb-8">
                    <pagination :data="merchandise" @pagination-change-page="getResults"></pagination>
                </div>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                merchandise: [],
            };
        },
        methods: {
            getResults(page = 1) {
                this.$http.get(this.$api + '/merchandise?limit=9&page=' + page)
                    .then(response => {
                        this.merchandise = response.data.data;
                    }).catch(error => {
                        console.log(error)
                    })
            },
            detailMerchandise(merchandise_id) {
                this.$router.push({
                    name: 'DetailMerchandisePage',
                    params: {
                        id: merchandise_id,
                    }
                });
            },

        },
        mounted() {
            this.getResults();
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

    .merchandise-content {
        width: 560px;
        height: auto;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        padding-bottom: 30px;
    }

    .thumbnail-merchandise {
        width: 100%;
        height: 300px;
        background-color: #DA1F1A;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .button-merchandise {
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
        font-weight: 700;
    }
     #app {
        margin-top: 0 !important;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }

        .text-merchandise-category{
            text-align: left !important;
            padding-left: 20px  !important;
        }
    }
</style>