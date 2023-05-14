<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">About Us</div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="about-content">
                        <v-row>
                            <v-col cols="12" md="4" class="mt-4">
                                <img data-aos="fade-up" src="../assets/Logo48.png" alt="" style="object-fit:cover; width:80%;">
                            </v-col>
                            <v-col cols="12" md="8">
                                <v-col cols="12" class="mt-4">
                                    <p class="text-title-about" data-aos="fade-right" style="font-weight:700; color:#DA1F1A; font-size:48px; text-align:left;">48
                                        FAMILY
                                        BALI</p>
                                </v-col>
                                <v-col cols="12">
                                    <p class="text-description-about" data-aos="fade-right" style="color:black; font-size:24px; text-align:justify; padding-right:20px; ">
                                        Saat ini skema peridolan di Indonesia terpaut sangat eksis di kalangan remaja
                                        khususnya saat JKT48 terbentuk pada tahun 2011 dan menjadi sebuah trend baru di
                                        skema peridolan indonesia
                                        . Bahkan yang menyukai idol grup ini dari berbagai kalangan dan dari semua usia
                                        dari anak kecil maupun orang dewasa. Semakin meningkatnya popularitas dari JKT48
                                        tercipta komunitas-komunitas daerah untuk mendukung idol group tersebut.
                                        Komunitas tersebut juga terdapat yang berbasis pada salah satu provinsi di
                                        indonesia yaitu Bali, terbentuk pada tahun 2012. Komunitas ini Tercipta untuk
                                        mewadahi
                                        orang-orang yang memiliki minat yang sama yaitu mendukung Idol Ibukota JKT48.
                                        Pada saat ini
                                        48 Family Bali sudah berumur 11 tahun dengan memiliki visi dan misi yang tetap
                                        sama yaitu selalu
                                        mendukung idol grup JKT48.
                                    </p>
                                </v-col>
                            </v-col>

                            <!-- Section Moment -->
                            <v-col cols="12" class="mt-12" md="6">
                                <p class="text-moment-left"
                                    style="font-weight:700; color:#DA1F1A; font-size:48px; text-align:left; padding-left:40px;">
                                    Our Moment</p>
                            </v-col>
                            <v-col cols="12" class="mt-12" md="6">
                                <a @click="GalleryPage" class="text-moment-right"
                                    style="color:#DA1F1A; font-size:24px; float:right; padding-right:40px;">Check other
                                    picture</a>
                            </v-col>
                            <v-carousel hide-delimiters show-arrows-on-hover
                                style="height: fit-content !important; display:flex; align-items:center; justify-content:center;">
                                <template v-for="(item, index) in slides">
                                    <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1"
                                        :key="index">
                                        <v-row>
                                            <template v-for="(n, i) in columns">
                                                <template v-if="(+index + i) < slides.length">
                                                    <v-col :key="i">
                                                        <div style="width:550px; height:auto; margin:20px; ">
                                                            <img :src="slides[+index + i].src"
                                                                style="object-fit: cover; width:100%; height:300px;"
                                                                alt="">
                                                        </div>
                                                    </v-col>
                                                </template>
                                            </template>
                                        </v-row>
                                    </v-carousel-item>
                                </template>
                            </v-carousel>
                  
                            <!-- Section Social Media -->
                            <v-col cols="12" class="mt-12">
                                <p style="font-weight:700; color:#DA1F1A; font-size:48px;">We're On</p>
                            </v-col>

                            <v-col cols="12" class="mt-4"
                                style="display:flex; justify-content:center; align-items:center;">
                                <div class="social-media-content" data-aos="fade-up" data-aos-delay="100">
                                     <img data-aos="fade-up" data-aos-delay="100" src="../assets/twitterred.png" alt=""
                                    style="object-fit:cover; width:50%; height:auto;">
                                </div>
                                <div class="social-media-content" data-aos="fade-up" data-aos-delay="200">
                                    <img data-aos-delay="200" data-aos="fade-up" src="../assets/linered.png" alt=""
                                    style="object-fit:cover; width:50%; height:auto;">
                                </div>
                                <div class="social-media-content" data-aos="fade-up" data-aos-delay="300">
                                    <img data-aos-delay="300" data-aos="fade-up" src="../assets/instagramred.png" alt=""
                                    style="object-fit:cover; width:50%; height:auto;">
                                </div>
                                <div class="social-media-content" data-aos="fade-up" data-aos-delay="400">
                                    <img data-aos-delay="400" data-aos="fade-up" src="../assets/discordred.png" alt=""
                                    style="object-fit:cover; width:50%; height:auto;">
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-layout>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                slides: [{
                        src: './img/Picture1.jpg',
                    },
                    {
                        src: './img/Picture2.jpg',
                    },
                    {
                        src: './img/Picture3.jpg',
                    },
                    {
                        src: './img/Picture4.jpg',
                    },
                    {
                        src: './img/Picture5.jpg',
                    },
                    {
                        src: './img/Picture6.jpg',
                    },
                ],
            };
        },
        methods: {
            GalleryPage() {
                this.$router.push({
                    name: 'GalleryPage',
                });
            },
        },
        mounted() {
            AOS.init();
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

    .about-content {
        width: 100%;
        height: auto;
        background-color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
    }

    .social-media-content {
        width: 200px;
        height: 200px;
        border: #DA1F1A 2px solid;
        margin: 20px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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

        .text-title-about{
            text-align: center !important;
        }
        
        .text-description-about{
            padding-right: 0px !important;
            padding: 20px !important;
        }

        .text-moment-left{
            padding-left: 20px !important;
            font-size: 25px !important;
        }

        .text-moment-right{
            padding-right: 0px !important;
             font-size: 12px !important;
        }

    }
</style>