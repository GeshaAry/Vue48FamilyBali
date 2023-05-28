<template>
    <v-main>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="content-article" style="width:100%; max-width:1500px;">
                        <v-layout row wrap justify-center class="my-5">
                            <img :src="$baseUrl+'/storage/'+article.article_thumbnail" class="image-article"
                                style="width:100%; max-width:1500px; height:500px; border-radius: 20px 20px 0px 0px; margin-top:-20px;"
                                alt="">
                            <p class="title-article"
                                style="font-size:50px; color:black; font-weight:800; margin-top:20px;">
                                {{ article.article_title }}</p>
                        </v-layout>
                        <v-layout row wrap justify-center class="my-5" style="flex-flow:column;">
                            <p style="font-size:20px; color:black; margin-top:-20px"><i>Posted By
                                    {{ article.admin.admin_username }}</i></p>
                        </v-layout>
                        <v-layout row wrap justify-center class="my-5">
                            <div class="bottomborder"></div>
                        </v-layout>
                        <v-layout row wrap justify-center class="my-5">
                            <v-carousel hide-delimiters show-arrows-on-hover cycle :interval="100000"
                                style="height: fit-content !important; display:flex; align-items:center; justify-content:center;">
                                <template v-for="(item, index) in articlepictures">
                                    <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
                                        <v-row>
                                            <template v-for="(n, i) in columns">
                                                <template v-if="(+index + i) < articlepictures.length">
                                                    <v-col :key="i">
                                                        <div style="width:400px; height:auto; margin:20px; ">
                                                            <img :src="$baseUrl+'/storage/'+articlepictures[+index + i].article_picture"
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
                        </v-layout>
                        <p class="text-boatschedule" v-html="article.article_description"></p>
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
                article: {},
                articlepictures: [],
            };
        },
        methods: {
            getIdDetail() {
                console.log(this.$route.params.id);
                this.$http.get(this.$api + '/article/' + this.$route.params.id, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }

                    })
                    .then(response => {
                        this.article = response.data.data
                        this.articlepictures = response.data.data.article_pictures
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        },
        mounted() {
            this.getIdDetail();
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
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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

    .centered-bottom {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 20px;
    }

    .description-list {
        color: white;
        text-align: left;
    }

    .bottomline {
        border: 1px solid #CCCCCC;
        width: 100%;
    }

    .bottomborder {
        height: 1px;
        width: 90%;
        background-color: #e3e3e3;
    }

    .content-article {
        width: 80%;
        height: auto;
        background-color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        margin-top: 80px;
    }

    .text-boatschedule {
        text-align: justify;
        padding: 30px;
        width: 100%;
    }
    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }

        .text-boatschedule {
            padding: 0px 50px;
            ;
        }

        .title-article {
            font-size: 30px !important;
        }

        .image-article {
            height: 400px !important;
        }

        .rowProduk {
            margin: -12px !important;
        }
    }
</style>