<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Detail Member JKT48</div>
            </div>
        </section>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12" md="5" style="display: flex; justify-content: center;">
                            <div class="member-detail-picture">
                                <img :src="$baseUrl+'/storage/'+member.member_picture"
                                    style="object-fit:cover; width:100%; height:500px; border-radius:30px;"
                                    class="pictures" alt="">
                            </div>
                            <!-- <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:center;">Social Media</p> -->
                        </v-col>
                        <v-col cols="12" md="7">
                            <v-col cols="12" class="col-chip-member">
                                <v-chip class="mt-9 chip-member">
                                    {{ member.member_status }}
                                </v-chip>
                            </v-col>
                            <v-col cols="12" class="col-chip-member">
                                <p class="jiko-member">"{{ member.member_jiko }}"</p>
                            </v-col>
                            <v-col cols="12">
                                <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left;">Biodata</p>
                            </v-col>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <p style="font-weight:300; color:black; font-size:16px; text-align:left;">Nama</p>
                                </v-col>
                                <v-col cols="12" md="8">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                        {{ member.member_name }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                </v-col>
                                <!-- // -->
                                <v-col cols="12" md="4" style="padding-top:10px;">
                                    <p style="font-weight:300; color:black; font-size:16px; text-align:left;">Tanggal
                                        Lahir</p>
                                </v-col>
                                <v-col cols="12" md="8" style="padding-top:10px;">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                        {{ member.member_birthdate }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                </v-col>
                                <!-- // -->
                                <v-col cols="12" md="4" style="padding-top:10px;">
                                    <p style="font-weight:300; color:black; font-size:16px; text-align:left;">Golongan
                                        Darah</p>
                                </v-col>
                                <v-col cols="12" md="8" style="padding-top:10px;">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                        {{ member.member_blood }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                </v-col>
                                <!-- // -->
                                <v-col cols="12" md="4" style="padding-top:10px;">
                                    <p style="font-weight:300; color:black; font-size:16px; text-align:left;">Horoskop
                                    </p>
                                </v-col>
                                <v-col cols="12" md="8" style="padding-top:10px;">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                        {{ member.member_horoskop }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                </v-col>
                                <!-- // -->
                                <v-col cols="12" md="4" style="padding-top:10px;">
                                    <p style="font-weight:300; color:black; font-size:16px; text-align:left;">Tinggi
                                        Badan</p>
                                </v-col>
                                <v-col cols="12" md="8" style="padding-top:10px;">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                        {{ member.member_height }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                </v-col>
                                <!-- // -->
                                <v-col cols="12" md="4" style="padding-top:10px;">
                                    <p style="font-weight:300; color:black; font-size:16px; text-align:left;">Generasi
                                    </p>
                                </v-col>
                                <v-col cols="12" md="8" style="padding-top:10px;">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                        {{ member.member_gen }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                </v-col>
                                <!-- // -->
                                <v-col cols="12" md="4" style="padding-top:10px;">
                                    <p style="font-weight:300; color:black; font-size:16px; text-align:left;">Show</p>
                                </v-col>
                                <v-col cols="12" md="8" style="padding-top:10px;">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                        {{ member.member_show }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                </v-col>
                                <!-- // -->
                                <v-col cols="12" style="padding-top:10px;">
                                    <p style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left;">Social
                                        Media</p>
                                </v-col>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12" md="4" style="padding-top:10px;">
                                            <p style="font-weight:300; color:black; font-size:16px; text-align:left;">
                                                Twitter</p>
                                        </v-col>
                                        <v-col cols="12" md="8" style="padding-top:10px;">
                                            <a style="font-weight:700; color:#DA1F1A; font-size:16px; float:left; text-decoration:none;" :href="'https://twitter.com/'+member.member_twitter+'?ref_src=twsrc%5Etfw'">{{member.member_twitter}}</a>
                                        </v-col>
                                        <v-col cols="12">
                                            <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                        </v-col>
                                        <!-- // -->
                                          <v-col cols="12" md="4" style="padding-top:10px;">
                                            <p style="font-weight:300; color:black; font-size:16px; text-align:left;">
                                                Instagram</p>
                                        </v-col>
                                        <v-col cols="12" md="8" style="padding-top:10px;">
                                            <a style="font-weight:700; color:#DA1F1A; font-size:16px; float:left; text-decoration:none;" :href="' https://www.instagram.com/'+member.member_instagram+'/'">{{member.member_instagram}}</a>
                                        </v-col>
                                        <v-col cols="12">
                                            <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                        </v-col>
                                        <!-- // -->
                                          <v-col cols="12" md="4" style="padding-top:10px;">
                                            <p style="font-weight:300; color:black; font-size:16px; text-align:left;">
                                                Tiktok</p>
                                        </v-col>
                                        <v-col cols="12" md="8" style="padding-top:10px;">
                                            <a  style="font-weight:700; color:#DA1F1A; font-size:16px; float:left; text-decoration:none;" target="_blank" :href="'https://www.tiktok.com/'+member.member_tiktok+'?refer=creator_embed'">{{member.member_tiktok}}</a>
                                        </v-col>
                                        <v-col cols="12">
                                            <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                        </v-col>
                                        <!-- // -->
                                        <v-col cols="12" md="4" style="padding-top:10px;">
                                            <p style="font-weight:300; color:black; font-size:16px; text-align:left;">
                                                Showroom</p>
                                        </v-col>
                                        <v-col cols="12" md="8" style="padding-top:10px;">
                                             <p style="font-weight:700; color:#DA1F1A; font-size:16px; text-align:left;">
                                                {{ member.member_showroom }}</p>
                                        </v-col>
                                        <v-col cols="12">
                                            <div style="width:100%; height:2px; background-color: #E3E3E3;"></div>
                                        </v-col>
                                        <!-- // -->
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-col cols="12" style="padding-top:20px;">
                                <p class="text-live"
                                    style="font-weight:700; color:#DA1F1A; font-size:32px; text-align:left;">Live Tweet
                                </p>
                                <a class="twitter-timeline twitter-hide"
                                    :href="'https://twitter.com/'+member.member_twitter+'?ref_src=twsrc%5Etfw'"
                                    data-width="100%" data-height="600" data-tweet-limit="9"
                                    data-aria-polite="assertive">Tweets by {{member.member_twitter}}</a>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </section>
    </v-main>
</template>
<script>
    export default {
        data() {
            return {
                member: [],
            };
        },
      
        methods: {},
        mounted() {
            this.$http.get(this.$api + '/showmember/' + this.$route.params.id, )
                .then(response => {
                    this.member = response.data.data;
                }).catch(error => {
                    console.log(error)
                })
        },

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

    .member-detail-picture {
        border: #DA1F1A 2px solid;
        width: 400px;
        height: 504px;
        border-radius: 30px;
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

    .jiko-member {
        font-weight: 700;
        color: #DA1F1A;
        text-align: left;
        padding-top: 10px;
    }

    .chip-socialmedia {
        width: 200px;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
    }

    .v-application .mt-9 {
        margin-top: 0px !important;
    }

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }

        .centered {
            font-size: 30px;
        }

        .centered-bottom {
            font-size: 15px;
        }


        .ul-detailvideo {
            margin-left: 15px;
        }

        .rowProduk {
            margin: -12px !important;
        }

        .twitter-timeline {
            visibility: hidden !important;
        }

        .text-live {
            display: none !important;
        }

        .v-application .mt-9 {
            margin-top: 20px !important;
        }

        .col-chip-member{
            display: flex !important;
            justify-content: center !important;
        }

        .twitter-hide{
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
    }
</style>