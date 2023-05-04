<template>
    <v-main>
         <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Video</div>
            </div>
        </section>
        <section>
            <v-container grid-list-xl>
               <v-layout row wrap justify-center class="my-5">
                        <div class="video-content" v-for="(item, index) in video.data" :key="index">
                            <div style="width:100%; height:300px;position:absolute; background-color: rgba(0, 0, 0, 0.5);"></div>
                            <div class="thumbnail-video">
                               <iframe width="100%" height="300px" :src="'https://www.youtube.com/embed/'+item.gallery_videopath" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div style="width:100%; height:80px; background-color:white; display:flex; align-items:center; justify-content:center;">
                                <div  @click="detailVideo(item.video_id)" class="button-video" style="cursor:pointer; margin-top:-5px;">
                                    Watch Video
                                </div>
                            </div>
                        </div>
                </v-layout>
                <div class="d-flex justify-content-center">
                    <pagination :data="video" @pagination-change-page="getResults"></pagination>
                </div>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                video:[],
            };
        },
        methods: {
             detailVideo(video_id) {
                this.$router.push({
                    name: 'DetailVideo',
                    params: {
                        id: video_id,
                    }
                });
            },
             getResults(page = 1) {
             this.$http.get(this.$api + '/video?limit=9&page=' + page )
                .then(response => {
                    this.video = response.data.data;
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.getResults();
        }
        
    }
</script>
<style>
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

    .video-content {
        width: 500px;
        height: auto;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        position: relative;
    }

    .thumbnail-video {
        width: 100%;
        height: 300px;
        background-color: antiquewhite;
    }

    .button-video {
        width: 100%;
        height: 75px;
        background-color: #DA1F1A;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
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