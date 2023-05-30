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
                    <div class="event-content" v-for="(item, index) in event.data" :key="index">
                        <div class="thumbnail-event">
                            <img :src="$baseUrl+'/storage/'+item.event_thumbnail"
                                style="object-fit: cover; width:100%; height:300px;" alt="">
                        </div>
                        <v-row>
                            <v-col cols="12" class="mt-4" md="6">
                                <p
                                    style="font-weight:700; font-size:24px; color:black; text-align:left; padding-left:20px;">
                                    {{ item.event_name}}
                                </p>
                            </v-col>
                            <v-col cols="12" class="mt-4" md="6">
                                <p style="font-size:24px; color:black; text-align:right; padding-right:20px;">
                                    {{ item.event_date}}
                                </p>
                            </v-col>
                            <v-col cols="12" class="mt-4">
                                <p style="font-size:20px; text-align:justify; color:#797979; float:left; padding-left:20px; padding-right:20px;"
                                    v-html="item.event_description.substring(0, 200) +'...'">
                                </p>
                            </v-col>
                            <v-col cols="12" md="6">
                                <div class="button-event" style="cursor:pointer; margin-left:20px;"
                                    @click="detailEvent(item.event_id)">
                                    Detail
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">
                                <div class="event-price">
                                    Rp.{{ item.event_price}}
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-layout>
                <div class="d-flex justify-content-center mb-8">
                    <pagination :data="event" @pagination-change-page="getResults"></pagination>
                </div>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                event: [],
            };
        },
        methods: {
            getResults(page = 1) {
                this.$http.get(this.$api + '/event?limit=9&page=' + page)
                    .then(response => {
                        this.event = response.data.data;
                    }).catch(error => {
                        console.log(error)
                    })
            },
            detailEvent(event_id) {
                this.$router.push({
                    name: 'DetailEventPage',
                    params: {
                        id: event_id,
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

    .event-content {
        width: 560px;
        height: 600px;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
    }

    .thumbnail-event {
        width: 100%;
        height: 300px;
        background-color: antiquewhite;
    }

    .button-event {
        width: 80%;
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

    .event-price {
        width: 80%;
        height: 50px;
        background-color: #DA1F1A;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
        float: right;
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
    }
</style>