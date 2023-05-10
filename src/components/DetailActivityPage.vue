<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Activity JKT48</div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="detail-activity-content">
                        <v-row>
                            <v-col cols="12">
                                <div class="title-detail-activity">
                                    <p style="font-weight:700; color:white; font-size:32px;">Detail Activity JKT48</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" style="display:flex; justify-content:center; align-items:center;">
                                <div class="mt-4" style="background-color:black; width:90%; height:400px">
                                    <img :src="$baseUrl+'/storage/'+activity.activity_thumbnail"
                                        style="object-fit: cover; width:100%; height:400px;" class="pictures" alt="">
                                </div>
                            </v-col>
                            <v-col cols="12" md="8">
                                <p class="mt-4 sub-text-detail-activity"
                                    style="font-weight:700; color: #DA1F1A; font-size:32px; text-align:left;">
                                    {{ activity.activity_title }}</p>
                                <p class="mt-2 sub-text-detail-activity"
                                    style="color: #DA1F1A; text-align:left; font-size:20px;">
                                    {{ activity.activity_date }}</p>
                                <p class="mt-2 sub-description-detail-activity"
                                    style="color: #DA1F1A; text-align:justify; font-size:20px; padding-right:20px;">
                                    {{ activity.activty_description }}</p>
                            </v-col>
                        </v-row>
                        <v-row class="wrap-content-detail-member">
                            <v-col cols="12">
                                <p class="mt-10"
                                    style="font-weight:700; color: #DA1F1A; font-size:32px; text-align:left; padding-left:20px;">
                                    Perform Member</p>
                            </v-col>
                            <div v-if="member.length != 0" style="width:100%; display:flex; align-items:center; height:auto; flex-flow:wrap;">
                                <div class="detail-member-content" v-for="(item, index) in member" :key="index"  >
                                    <div class="detail-member-picture">
                                        <img :src="$baseUrl+'/storage/'+item.member_picture"
                                            style="object-fit:cover; width:100%; height:180px;" class="rounded-circle"
                                            alt="">
                                    </div>
                                    <p class="mt-4" style="color:black; font-weight:700;">
                                        {{ item.member_name}}</p>
                                    <v-chip class="mt-4 chip-member">
                                        Generasi {{ item.member_gen}}
                                    </v-chip>
                                </div>
                            </div>
                            <div v-else style="width:100%; height:auto; display:flex; align-items:center; justify-content:center;">
                                <p class="text-member-notfound">Members Not Available</p>
                            </div>
                        </v-row>
                    </div>
                </v-layout>
                <div class="d-flex justify-content-center mb-8">
                    <pagination :data="gallery" @pagination-change-page="getResults"></pagination>
                </div>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                member: [],
                activity: {},
            };
        },
        methods: {
            getIdDetail() {
                this.$http.get(this.$api + '/detailactivityjkt48/' + this.$route.params.id, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }

                    })
                    .then(response => {
                        this.activity = response.data.data
                        this.member = response.data.data.member
                        console.log("this.activity")
                        console.log(this.activity)
                    })
                    .catch(error => {
                        console.log(error)
                    })


            },
        },
        mounted() {
            this.getIdDetail();
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

    .detail-activity-content {
        width: 100%;
        height: auto;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
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

        .detail-activity-content {
            width: 100%;
        }

        .sub-text-detail-activity {
            text-align: center !important;
        }

        .sub-description-detail-activity {
            padding: 20px !important;
        }

        .wrap-content-detail-member {
            display: flex !important;
            justify-content: center !important;
        }

    }
</style>