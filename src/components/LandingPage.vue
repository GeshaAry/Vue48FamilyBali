<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/Rectangle.png" style="object-fit:cover; width:100%; height:auto; margin-top:-65px;"
                    alt="">
                <div class="wrap-content-thumbnail">
                    <v-row>
                        <v-col cols="12" md="8" style="display:flex; justify-content:center; align-items:center;">
                            <div class="wrap-text-thumbnail">
                                <v-col cols="12">
                                    <p style="color:white; font-size:24px; text-align:left; padding-left:100px;"
                                        data-aos="fade-right" data-aos-delay="100">Welcome
                                        to Website</p>
                                    <p style="color:white; font-weight:700; font-size:56px; text-align:left; padding-left:100px;"
                                        data-aos="fade-right" data-aos-delay="200">
                                        48 FAMILY BALI</p>
                                    <p style="color:white; font-size:24px; text-align:justify; padding-left:100px; padding-right:100px;"
                                        data-aos="fade-right" data-aos-delay="300">
                                        Komunitas yang berbasis pada salah satu provinsi di indonesia yaitu Bali,
                                        terbentuk pada tahun 2012. Tercipta untuk mewadahi orang-orang yang memiliki
                                        minat yang sama yaitu mendukung Idol Ibukota JKT48.</p>
                                    <div class="button-thumbnail" data-aos="fade-right" data-aos-delay="400">
                                        See More
                                    </div>
                                </v-col>
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <img src="../assets/Logo48.png" alt="" style="object-fit:cover; width:100%;"
                                data-aos="zoom-in" data-aos-delay="300">
                        </v-col>
                    </v-row>
                </div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12">
                            <p style="font-weight:700; font-size:32px; color:#DA1F1A; text-align:left;">Ada yang
                                Berulang Tahun Bulan Ini</p>
                        </v-col>
                        <v-col cols="12" style="display:flex; justify-content:center; align-items:center;">
                            <v-carousel hide-delimiters show-arrows-on-hover
                                style="height: fit-content !important; display:flex; align-items:center; justify-content:center;">
                                <template v-for="(item, index) in member">
                                    <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
                                        <v-row>
                                            <template v-for="(n, i) in columns">
                                                <template v-if="(+index + i) < member.length">
                                                    <v-col :key="i">
                                                        <div class="card-birthday-member">
                                                            <div class="card-member-birthday">
                                                                <img :src="$baseUrl+'/storage/'+member[+index + i].member_picture"
                                                                    style="object-fit:cover; width:100%; height:300px;"
                                                                    class="rounded-circle" alt="">
                                                            </div>
                                                            <p class="mt-4"
                                                                style="color:black; font-size:24px; font-weight:700;">
                                                                {{ member[+index + i].member_name}}</p>
                                                            <v-chip class="mt-4 chip-member">
                                                                {{ member[+index + i].member_status}}
                                                            </v-chip>
                                                        </div>
                                                    </v-col>
                                                </template>
                                            </template>
                                        </v-row>
                                    </v-carousel-item>
                                </template>
                            </v-carousel>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </section>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12" md="6" style="display:flex; align-items:center;">
                            <p style="font-weight:700; font-size:24px; color:#DA1F1A; text-align:left; cursor:pointer;"
                                @click="ArticlePage">View All Article
                                Post</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <p style="font-weight:700; font-size:80px; color:#DA1F1A; text-align:right;">ARTICLE</p>
                        </v-col>
                    </v-row>
                    <v-carousel hide-delimiters show-arrows-on-hover
                        style="height: fit-content !important; display:flex; align-items:center; justify-content:center;">
                        <template v-for="(item, index) in article">
                            <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
                                <v-row>
                                    <template v-for="(n, i) in columns">
                                        <template v-if="(+index + i) < article.length">
                                            <v-col :key="i">
                                                <div class="article-content">
                                                    <div class="thumbnail-article">
                                                        <img :src="$baseUrl+'/storage/'+article[+index + i].article_thumbnail"
                                                            style="object-fit: cover; width:100%; height:300px;" alt="">
                                                    </div>
                                                    <v-row>
                                                        <v-col cols="12" class="mt-4">
                                                            <p
                                                                style="font-weight:700; font-size:24px; color:black; text-align:left; padding-left:20px;">
                                                                {{ article[+index + i].article_title}}
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" class="mt-4">
                                                            <p style="font-size:20px; text-align:justify; color:#797979; float:left; padding-left:20px; padding-right:20px;"
                                                                v-html="article[+index + i].article_description.substring(0, 200) +'...'">
                                                            </p>
                                                        </v-col>
                                                        <div class="button-article"
                                                            style="cursor:pointer; margin-left:20px;"
                                                            @click="detailArticle(article[+index + i].article_id)">
                                                            Read More
                                                        </div>

                                                    </v-row>
                                                </div>
                                            </v-col>
                                        </template>
                                    </template>
                                </v-row>
                            </v-carousel-item>
                        </template>
                    </v-carousel>
                </v-layout>
            </v-container>
        </section>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12" md="3">
                            <p style="font-weight:700; font-size:80px; color:#DA1F1A; text-align:left;">EVENT</p>
                        </v-col>
                        <v-col cols="12" md="9" style="display:flex; align-items:center;">
                            <div style="width:100%; height:2px; background-color: #DA1F1A"></div>
                        </v-col>
                    </v-row>
                    <v-carousel hide-delimiters show-arrows-on-hover
                        style="height: fit-content !important; display:flex; align-items:center; justify-content:center;">
                        <template v-for="(item, index) in event">
                            <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
                                <v-row>
                                    <template v-for="(n, i) in columns">
                                        <template v-if="(+index + i) < event.length">
                                            <v-col :key="i">
                                                <div class="event-content">
                                                    <div class="thumbnail-event">
                                                        <img :src="$baseUrl+'/storage/'+event[+index + i].event_thumbnail"
                                                            style="object-fit: cover; width:100%; height:300px;" alt="">
                                                    </div>
                                                    <v-row>
                                                        <v-col cols="12" class="mt-4" md="6">
                                                            <p
                                                                style="font-weight:700; font-size:24px; color:black; text-align:left; padding-left:20px;">
                                                                {{ event[+index + i].event_name}}
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" class="mt-4" md="6">
                                                            <p
                                                                style="font-size:24px; color:black; text-align:right; padding-right:20px;">
                                                                {{ event[+index + i].event_date}}
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" class="mt-4">
                                                            <p style="font-size:20px; text-align:justify; color:#797979; float:left; padding-left:20px; padding-right:20px;"
                                                                v-html="event[+index + i].event_description.substring(0, 200) +'...'">
                                                            </p>
                                                        </v-col>
                                                        <div class="button-event"
                                                            style="cursor:pointer; margin-left:20px;" @click="detailEvent(event[+index + i].event_id)">
                                                            Detail
                                                        </div>
                                                        <div class="event-price">
                                                                Rp.{{ event[+index + i].event_price}}
                                                        </div>
                                                    </v-row>
                                                </div>
                                            </v-col>
                                        </template>
                                    </template>
                                </v-row>
                            </v-carousel-item>
                        </template>
                    </v-carousel>
                </v-layout>
            </v-container>
        </section>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-row>
                        <v-col cols="12" md="7" style="display:flex; align-items:center;">
                            <div style="width:100%; height:2px; background-color: #DA1F1A"></div>
                        </v-col>
                        <v-col cols="12" md="5">
                            <p style="font-weight:700; font-size:80px; color:#DA1F1A; text-align:right;">MERCHANDISE</p>
                        </v-col>
                    </v-row>
                    <v-carousel hide-delimiters show-arrows-on-hover
                        style="height: fit-content !important; display:flex; align-items:center; justify-content:center;">
                        <template v-for="(item, index) in merchandise">
                            <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
                                <v-row>
                                    <template v-for="(n, i) in columns">
                                        <template v-if="(+index + i) < merchandise.length">
                                            <v-col :key="i">
                                                <div class="merchandise-content">
                                                    <div class="thumbnail-merchandise" v-if="merchandise[+index + i].merchandise_picture != null">
                                                        <img :src="$baseUrl+'/storage/'+merchandise[+index + i].merchandise_picture"
                                                            style="object-fit: cover; width:100%; height:300px;" alt="">
                                                    </div>
                                                    <div class="thumbnail-merchandise" v-else>
                                                        <p>No Photo</p>
                                                    </div>
                                                    <v-row>
                                                        <v-col cols="12" class="mt-4" md="6">
                                                            <p
                                                                style="font-weight:700; font-size:24px; color:black; text-align:left; padding-left:20px;">
                                                                {{ merchandise[+index + i].merchandise_name}}
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" class="mt-4" md="6">
                                                            <p
                                                                style="font-size:16px; color:#797979; text-align:right; padding-right:20px;">
                                                                {{ merchandise[+index + i].merchandise_category.merchandisectg_name}}
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" class="mt-4">
                                                            <p style="font-size:20px; text-align:justify; color:#797979; float:left; padding-left:20px; padding-right:20px;"
                                                                v-html="merchandise[+index + i].merchandise_description.substring(0, 200) +'...'">
                                                            </p>
                                                        </v-col>
                                                        <div class="button-merchandise"
                                                            style="cursor:pointer; margin-left:20px;" @click="detailMerchandise(merchandise[+index + i].merchandise_id)">
                                                            Detail
                                                        </div>
                                                    </v-row>
                                                </div>
                                            </v-col>
                                        </template>
                                    </template>
                                </v-row>
                            </v-carousel-item>
                        </template>
                    </v-carousel>
                </v-layout>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                article: [],
                member: [],
                event: [],
                merchandise: [],
            };
        },
        methods: {
            ArticlePage() {
                this.$router.push({
                    name: 'ArticlePage',
                });
            },
            detailArticle(article_id) {
                this.$router.push({
                    name: 'DetailArticlePage',
                    params: {
                        id: article_id,
                    }
                });
            },
             detailEvent(event_id) {
                this.$router.push({
                    name: 'DetailEventPage',
                    params: {
                        id: event_id,
                    }
                });
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
            AOS.init();

            this.$http.get(this.$api + '/article')
                .then(response => {
                    this.article = response.data.data.data;
                }).catch(error => {
                    console.log(error)
                })

            this.$http.get(this.$api + '/birthdaymember')
                .then(response => {
                    this.member = response.data;
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })

            this.$http.get(this.$api + '/event')
                .then(response => {
                    this.event = response.data.data.data;
                }).catch(error => {
                    console.log(error)
                })
            
            this.$http.get(this.$api + '/merchandise')
                .then(response => {
                    this.merchandise = response.data.data.data;
                }).catch(error => {
                    console.log(error)
                })
        },
        computed: {
            columns() {
                if (this.$vuetify.breakpoint.xl) {
                    return 3;
                }
                if (this.$vuetify.breakpoint.lg) {
                    return 3;
                }
                if (this.$vuetify.breakpoint.md) {
                    return 2;
                }

                return 1;
            }
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
        height: auto;
        position: relative;
        text-align: center;
    }

    .wrap-content-thumbnail {
        width: 100%;
        height: 600px;
        position: absolute;
        top: 32%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .wrap-text-thumbnail {
        width: 100%;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button-thumbnail {
        width: 200px;
        height: 50px;
        background-color: white;
        border-radius: 10px;
        margin-left: 100px;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #DA1F1A;
        font-weight: 700;
    }

    .card-birthday-member {
        width: 300px;
        height: auto;
        background-color: white;
        margin: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .card-member-birthday {
        background-color: orange;
        width: 300px;
        height: 300px;
        border-radius: 100%;
        border: 2px #DA1F1A solid;
    }

    .chip-member {
        width: 200px;
        height: 50px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #DA1F1A !important;
        color: white !important;
        font-weight: 700;
        border-radius: 50px;
    }

    .article-content {
        width: 560px;
        height: 600px;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
    }

    .thumbnail-article {
        width: 100%;
        height: 300px;
        background-color: antiquewhite;
    }

    .button-article {
        width: 40%;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
        font-weight: 700;
        position: absolute;
        bottom: 0;
        margin-bottom: 30px;
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
        width: 40%;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
        font-weight: 700;
        position: absolute;
        bottom: 0;
        margin-bottom: 30px;
    }

    .event-price {
        width: 40%;
        height: 50px;
        background-color: #DA1F1A;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
        font-weight: 700;
        position: absolute;
        right: 0;
        bottom: 0;
        margin-bottom: 30px;
        margin-right: 20px;

    }

    .merchandise-content {
        width: 560px;
        height: 600px;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
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
        width: 40%;
        height: 50px;
        background-color: #DA1F1A;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
        font-weight: 700;
        position: absolute;
        bottom: 0;
        margin-bottom: 30px;
    }

    @keyframes typing-animation {
        0% {
            width: 0;
        }

        100% {
            width: 100%;
        }
    }

    .typing-text {
        overflow: hidden;
        /* Membuat teks tidak terlihat di luar kotak */
        white-space: nowrap;
        /* Mencegah teks melompat ke baris baru */
        animation: typing-animation 5s linear infinite;
        transition: width 0.5s ease-in-out;
    }

    #app {
        margin-top: 0 !important;
    }

    .v-application p {
        margin-bottom: 0px;
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