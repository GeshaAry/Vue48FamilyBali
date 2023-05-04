<template>
    <v-main>
         <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Gallery</div>
            </div>
        </section>
        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                        <div class="gallery-content" v-for="(item, index) in gallery.data" :key="index">
                            <div class="picture-gallery">
                                <img :src="$baseUrl+'/storage/'+item.gallery_picture"
                                    style="object-fit: cover; width:100%; height:400px;" class="pictures" alt="">
                            </div>
                        </div>
                </v-layout>
                <div class="d-flex justify-content-center">
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
                gallery:[],
            };
        },
        methods: {
             getResults(page = 1) {
             this.$http.get(this.$api + '/gallery?limit=9&page=' + page )
                .then(response => {
                    this.gallery = response.data.data;
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
    .gallery-content {
        width: 550px;
        height: 400px;
        background-color: white;
        margin: 20px;
    }

    .picture-gallery {
        width: 100%;
        height: 400px;
        background-color: antiquewhite;
        overflow: hidden;
    }

    .pictures{
        -webkit-transform: rotate(15deg) scale(1.4);
        transform: rotate(15deg) scale(1.4);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    .pictures:hover{
        -webkit-transform: rotate(0) scale(1);
	    transform: rotate(0) scale(1);
    }

    .button-news {
        width: 40%;
        height: 50px;
        background-color: #0165BC;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: white;
        margin-top: 20px;
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