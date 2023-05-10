<template>
    <v-main>
        <section>
            <div class="thumbnail">
                <img src="../assets/wallpaperlogin.png" style="object-fit: cover; width:100%; height:500px;" alt="">
                <div class="centered">Member JKT48</div>
            </div>
        </section>
        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <div class="member-card" v-for="(item, index) in member.data" :key="index">
                        <div class="picture-member">
                             <img :src="$baseUrl+'/storage/'+item.member_picture"
                                    style="object-fit: cover; width:100%; height:400px;" class="pictures" alt="">
                        </div>
                        <v-chip class="mt-9 chip-member">
                             {{ item.member_status }}
                        </v-chip>
                        <p class="name-member"  @click="detailMember(item.member_id)">
                           {{ item.member_name }}
                        </p>
                    </div>
                </v-layout>
                <div class="d-flex justify-content-center">
                    <pagination :data="member" @pagination-change-page="getResults"></pagination>
                </div>
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
        methods: {
            getResults(page = 1) {
                this.$http.get(this.$api + '/member?limit=8&page=' + page)
                    .then(response => {
                        this.member = response.data.data;
                    }).catch(error => {
                        console.log(error)
                    })
            },
            detailMember(member_id) {
                this.$router.push({
                    name: 'DetailMemberJKT48Page',
                    params: {
                        id: member_id,
                    }
                    
                });
            },
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

    .member-card {
        width: 400px;
        height: auto;
        border: #DA1F1A 2px solid;
        border-radius: 30px;
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .picture-member {
        width: 280px;
        height: 380px;
        background-color: black;
    }

    .chip-member{
        width: 200px;
        height: 40px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #DA1F1A !important;
        color: white !important;
        font-weight: 700;
    }
    .name-member{
        font-weight: 700;
        color: #DA1F1A;
        font-size: 28px;
        margin-top: 20px;
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