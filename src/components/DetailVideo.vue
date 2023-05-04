<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Detail Video</div>
            </div>
        </section>

        <section style="display:flex; justify-content:center; align-items:center;">
            <v-container grid-list-xl>
                <ul class="ul-detailvideo">
                    <li class="telephone-contact" @click="videoPage">Go to video page</li>
                </ul>
                <v-layout row wrap justify-center class="my-5">
                    <iframe style="width:90%; max-width:2000px; height:800px;"
                        :src="'https://www.youtube.com/embed/'+video.gallery_videopath" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </v-layout>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    export default {
        data() {
            return {
                video: [],
            };
        },
        methods: {
            videoPage() {
                this.$router.push({
                    name: 'VideoPage',
                });
            },

            detailVideo(video_id) {
                this.$router.push({
                    name: 'DetailVideo',
                    params: {
                        id: video_id,
                    }
                });
                location.reload();
            },
        },
        mounted() {
            this.$http.get(this.$api + '/video/' + this.$route.params.id, )
                .then(response => {
                    this.video = response.data.data;
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

    .ul-detailvideo {
        list-style: none;
        padding: 0;
        text-align: left;
        font-size: 20px;
        margin-left: -25px;
        padding: 10px;
        color: #0165BC;
        font-weight: 700;
        cursor: pointer;
    }

    li {
        padding-left: 1.3em;
    }

    .telephone-contact:before {
        content: "\f177";
        /* FontAwesome Unicode */
        font-family: FontAwesome;
        display: inline-block;
        margin-left: -1.3em;
        /* same as padding-left set on li */
        width: 1.3em;
        /* same as padding-left set on li */
        color: #0165BC;
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
    }
</style>