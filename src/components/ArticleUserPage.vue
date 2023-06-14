<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Article User</div>
            </div>
        </section>
        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="article-card" v-for="(item, index) in articleuser.data" :key="index">
                        <v-row>
                            <v-col cols="12" md="5">
                                <div class="wrap-thumbnail-article">
                                    <img :src="$baseUrl+'/storage/'+item.articleuser_thumbnail" alt=""
                                        style="object-fit:cover; width:100%; height:600px; border-radius:30px 0px 0px 30px;" class="image-article">
                                </div>
                            </v-col>
                            <v-col cols="12" md="7" class="mt-4">
                                <p style="font-weight:700; text-align:left; font-size:36px; color:#DA1F1A; padding-left:20px;">
                                    {{ item.articleuser_title }}</p>
                                <div class="chip-article">
                                    {{ item.user.user_name }}
                                </div>
                                <p class="mt-4"
                                    style="text-align:justify; font-size:16px; color:#DA1F1A; padding-left:20px; padding-right:20px;" v-html="item.articleuser_description.substring(0, 1200) +'...'">
                                </p>
                                <div class="button-detail-article" @click="detailArticleUser(item.articleuser_id)">
                                    Read More
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-layout>
                <div class="d-flex justify-content-center">
                    <pagination :data="articleuser" @pagination-change-page="getResults" style="margin:20px;"></pagination>
                </div>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                articleuser: [],
            };
        },
        methods: {
            getResults(page = 1){
                this.$http.get(this.$api + '/articleuserpage?limit=2&page=' + page)
                    .then(response => {
                        this.articleuser = response.data.data;
                    }).catch(error => {
                        console.log(error)
                    })
            },
            detailArticleUser(articleuser_id) {
                this.$router.push({
                    name: 'DetailArticleUser',
                    params: {
                        id: articleuser_id,
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

    .article-card {
        width: 100%;
        height: auto;
        border-radius: 30px;
        background-color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        margin: 20px;
    }

    .wrap-thumbnail-article {
        width: 100%;
        height: 600px;
        border-radius: 30px;
        background-color: orange;
    }

    .chip-article {
        width: 150px;
        height: 40px;
        border-radius: 50px;
        background-color: #DA1F1A;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        color: white;
    }

    .button-detail-article{
        width: 150px;
        height: 40px;
        border-radius: 50px;
        background-color: #DA1F1A;
        margin-left: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        color: white;
        position:absolute; 
        bottom:0;
        cursor: pointer;
    }

    #app {
        margin-top: 0 !important;
    }

   @media screen and (max-width:1060px) {
        .slideCol {
            padding: 0;
        }
        
        .article-card{
            width: 100%;
        }
        .image-article{
            border-radius: 30px 30px 0px 0px  !important;
        }

        .button-detail-article{
            position: relative !important;
        }
    }
</style>