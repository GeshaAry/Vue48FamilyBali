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
                        <div class="activity-content" v-for="(item, index) in activity.data" :key="index">
                            <div class="picture-activity">
                                <img :src="$baseUrl+'/storage/'+item.activity_thumbnail"
                                    style="object-fit: cover; width:100%; height:400px;" class="pictures" alt="">
                                
                             <div class="content-activity" @click="detailActivity(item.activity_id)">
                                <p style="font-weight:700; font-size:25px; color:#DA1F1A; padding-top:10px;">{{ item.activity_title}}</p>
                                <p style="color:#DA1F1A;">{{ item.activity_date}}</p>
                             </div>
                            </div>
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
                activity:[],
            };
        },
        methods: {
             getResults(page = 1) {
             this.$http.get(this.$api + '/activity?limit=9&page=' + page )
                .then(response => {
                    this.activity = response.data.data;
                }).catch(error => {
                    console.log(error)
                })
            },

            detailActivity(activity_id){
                 this.$router.push({
                    name: 'DetailActivityPage',
                    params: {
                        id: activity_id,
                    }
                });
            }
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
    .activity-content {
        width: 550px;
        height: 400px;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        
    }

    .picture-activity {
        width: 100%;
        height: 400px;
        background-color: antiquewhite;
        overflow: hidden;
    }
    
    .content-activity{
        width: 550px;
        height: 100px;
        background-color: white;
        position: relative;
        margin-top: -100px;
        border-radius: 30px 30px 0px 0px;
        cursor: pointer;
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