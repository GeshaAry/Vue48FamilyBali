<template>
    <v-main>
        <header>
            <a class="logo">
                  <img src="../assets/Logo48.png" alt="" style="object-fit:cover; width:100%; height:70px;" @click="LandingPage">
            </a>
            <div class="navigation">
                <ul class="menu">
                    <div class="close-btn"></div>
                    <li class="menu-item">
                        <a class="sub-btn" @click="EventPage">Event</a>
                    </li>
                    <li class="menu-item">
                        <a class="sub-btn">Merchandise</a>
                    </li>
                    <li class="menu-item">
                        <a class="sub-btn">Article <i class="fas fa-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li class="sub-item"><a @click="Article">Article</a></li>
                            <li class="sub-item"><a>Article User</a></li>
                        </ul>
                    </li>
                    <li class="menu-item">
                        <a class="sub-btn" @click="MemberJKT48" >Member</a>
                    </li>
                    <li class="menu-item">
                        <a class="sub-btn" @click="ActivityPage">Activity</a>
                    </li>
                    <li class="menu-item">
                        <a class="sub-btn">Documentation <i class="fas fa-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li class="sub-item"><a @click="GalleryPage">Gallery Photos</a></li>
                            <li class="sub-item"><a @click="VideoPage">Gallery Videos</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a  @click="AboutPage">About</a></li>
                    <li class="menu-item"><a v-if="user != ''"><a
                                @click="detailProfile(user.user_id)">Hello, {{user.user_name}}</a></a>
                    </li>
                    <li class="menu-item"><a v-if="user != ''" @click="logout">Logout</a></li>
                    <li class="menu-item"><a v-if="user == ''" @click="LoginPage">Sign In</a></li>
                    <li class="menu-item"><a v-if="user == ''" @click="Register">Sign Up</a></li>

                </ul>
            </div>
            <div class="menu-btn"></div>
        </header>
        <router-view></router-view>
        <section id="footer" class="py-5" style="background-color:#DA1F1A; position:relative;">
            <v-container fluid="true">
                <v-row>
                    <v-col cols="12" md="3">
                         <img src="../assets/Logo48.png" alt="" style="object-fit:cover; width:50%;">
                    </v-col>
                    <v-col cols="12" md="3">
                        <ul class="ul-detailfooter mx-4 my-4">
                            <li class="li-footer">Event</li>
                            <li class="li-footer">Merchandise</li>
                            <li class="li-footer">Article</li>
                            <li class="li-footer">Member</li>
                        </ul>
                    </v-col>
                    <v-col cols="12" md="3" >
                        <ul class="ul-detailfooter mx-4 my-4">
                            <li class="li-footer">Activity</li>
                            <li class="li-footer">Gallery</li>
                            <li class="li-footer">About</li>
                        </ul>
                    </v-col>
                    <v-col cols="12" md="3">
                        <p class="mb-4" style="font-size:20px; color:white;">Our Social Media</p>
                        <v-row style="display:flex; justify-content:center;">
                            <v-col cols="2" style="display:flex; justify-content:center;">
                                <div class="social-media">
                                 <img src="../assets/twitter.png" alt=""
                                    style="object-fit:cover; width:60%; height:auto;">
                                </div>
                            </v-col>
                              <v-col cols="2" style="display:flex; justify-content:center;">
                                <div class="social-media">
                                  <img src="../assets/instagram.png" alt=""
                                    style="object-fit:cover; width:60%; height:auto;">
                                </div>
                            </v-col>
                              <v-col cols="2" style="display:flex; justify-content:center;">
                                <div class="social-media">
                                  <img src="../assets/discord.png" alt=""
                                    style="object-fit:cover; width:60%; height:auto;">
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                         <div class="border-top py-4" style="color:white"> Made with Love by Komunitas 48 Family Bali</div>
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </v-main>
</template>

<script>
    $(document).ready(function () {
        $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function () {
                    window.location.hash = hash;
                });
            }
        });

        //toggle sub-menus
        $(".sub-btn").click(function () {
            $(this).next(".sub-menu").slideToggle();
        });

        //toggle more-menus
        $(".more-btn").click(function () {
            $(this).next(".more-menu").slideToggle();
        });

        //toggle more-menus
        $(".menu-btn").click(function () {
            $('.menu').addClass('active');
        });

        //toggle more-menus
        $(".close-btn").click(function () {
            $('.menu').removeClass('active');
        });
    });


    export default {
        name: 'Header',

        data() {
            return {
                user: [],
            };
        },
        methods: {
            MemberJKT48() {
                this.$router.push({
                    name: 'MemberJKT48Page',
                });
            },
            GalleryPage() {
                this.$router.push({
                    name: 'GalleryPage',
                });
            },
            VideoPage() {
                this.$router.push({
                    name: 'VideoPage',
                });
            },
            ActivityPage() {
                this.$router.push({
                    name: 'ActivityPage',
                });
            },
            AboutPage() {
                this.$router.push({
                    name: 'AboutUs',
                });
            
            },
            Article() {
                this.$router.push({
                    name: 'ArticlePage',
                });
            },
            LandingPage() {
                this.$router.push({
                    name: 'LandingPage',
                });
            },
            EventPage() {
                this.$router.push({
                    name: 'EventPage',
                });
            },
            LoginPage() {
                this.$router.push({
                    name: 'LoginPage',
                });
            },
            Register() {
                this.$router.push({
                    name: 'Register',
                });
            },
            logout() {
                if (localStorage.getItem('user_id') != null) {
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('user_email');
                    this.$router.push({
                        name: 'LandingPage',
                    });
                    location.reload();
                }
            },
            detailProfile(user_id) {
                this.$router.push({
                    name: 'DetailProfileUser',
                    params: {
                        id: user_id,
                    }
                });
            }
        },
        mounted() {
             if (localStorage.getItem('user_id') != null) {
                this.$http.get(this.$api + '/user/' + localStorage.getItem('user_id'))
                    .then(response => {
                        this.user = response.data.data;
                    }).catch(error => {
                        console.log(error)
                    })
            }
        },
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .social-media{
        height: 50px;
        width: 50px;
        border: #ffffff 2px solid;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ul-detailfooter {
        list-style: none;
        padding: 0;
        text-align: left;
        font-size: 20px;
        color: white;
    }

    .wrap-content-ul {
        width: 50%;
        max-width: 500px;
        height: 200px;
        background-color: #DA1F1A;
        margin: 0px auto;
        margin-top: 20px;
        position: relative;
    }

    .wrap-content-payment {
        width: 20%;
        height: 200px;
        background-color: #DA1F1A;
        float: right;
        margin-top: -210px;
        display: flex;
        justify-content: center;
        position: relative;
    }

    .border-bottom-footer {
        width: 100%;
        height: 1px;
        background-color: #E3E3E3;
    }

    .text-footer {
        margin: 0px auto;
        font-size: 20px;
        color: white;
        margin-top: 30px;
    }

    /* header */

    header {
        z-index: 99;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #DA1F1A;
        box-shadow: 0 5px 25px rgb(0 0 0 / 20%);
        padding: 0 100px;
        transition: 0.6s;
    }

    header .logo {
        color: #fff;
        font-size: 1.8em;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 2px;
    }

    header .navigation {
        position: relative;
        line-height: 75px;
        transition: 0.6s;
        transition-property: line-height;
    }

    header.sticky .navigation {
        line-height: 60px;
    }

    header .navigation .menu {
        position: relative;
        display: flex;
        justify-content: center;
        list-style: none;
        user-select: none;
    }

    .menu-item>a {
        color: #fff;
        font-size: 1em;
        text-decoration: none;
        margin: 20px;
        padding: 25px 0;
    }

    .menu-item>a:hover {
        color: white;
        transition: 0.3s;
    }

    .menu-item .sub-menu {
        position: absolute;
        background: #DA1F1A;
        top: 74px;
        line-height: 40px;
        list-style: none;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 5px 25px rgb(0 0 0 / 20%);
        pointer-events: none;
        transform: translateY(20px);
        opacity: 0;
        transition: 0.3s;
        transition-property: transform, opacity;
    }

    header.sticky .menu-item .sub-menu {
        top: 60px;
    }

    .menu-item:hover .sub-menu {
        pointer-events: all;
        transform: translateY(0);
        opacity: 1;
    }

    .menu-item .sub-menu .sub-item {
        position: relative;
        padding: 7px 0;
        cursor: pointer;
        box-shadow: inset 0px -30px 5px -30px rgba(255, 255, 255, 0.2);
    }

    .menu-item .sub-menu .sub-item a {
        color: #fff;
        font-size: 1em;
        text-decoration: none;
        padding: 15px 30px;
    }

    .menu-item .sub-menu .sub-item:hover {
        background: #BE1814;
    }

    .menu-item .sub-menu .sub-item:last-child:hover {
        border-radius: 0 0 8px 8px;
    }

    .more .more-menu {
        position: absolute;
        background: #23252B;
        list-style: none;
        top: 0;
        left: 100%;
        white-space: nowrap;
        border-radius: 0 8px 8px 8px;
        overflow: hidden;
        pointer-events: none;
        transform: translateY(20px);
        opacity: 0;
        transition: 0.3s;
        transition-property: transform, opacity;
    }

    .more:hover .more-menu {
        pointer-events: all;
        transform: translateY(0);
        opacity: 1;
    }

    .more .more-menu .more-item {
        padding: 7px 0;
        box-shadow: inset 0px -30px 5px -30px rgba(255, 255, 255, 0.2);
        transition: 0.3s;
    }

    .more .more-menu .more-item:hover {
        background: #4080EF;
    }

    .menu-btn {
        display: none;
    }

    .v-application ol,
    .v-application ul {
        padding-left: 0px;
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

    .text-grajagan-footer {
        font-size: 50px;
        color: white;
        text-align: left;
        font-weight: 700;
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
        border: 1px solid #CCCCCC;
        width: 78%;
    }

    .content-boatschedule {
        width: 80%;
        height: auto;
        background-color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
    }

    .text-boatschedule {
        text-align: justify;
        padding: 150px;
        margin-top: -150px;
    }

    .packages-content {
        width: 500px;
        height: 650px;
        background-color: white;
        margin: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
    }

    .thumbnail-packages {
        width: 100%;
        height: 650px;
        background-color: antiquewhite;
    }

    .content-name {
        width: 500px;
        height: 120px;
        background-color: black;
        position: absolute;
        margin-top: -120px;
    }

    .icon-sosmed {
        display: flex;
        justify-content: center;
        margin-top: -30px;
    }

    .img-user-testimonial {
        transition: all 0.5s linear;
    }

    .img-user-testimonial:hover {
        transform: scale(1.1);
    }
    .li-footer{
        cursor: pointer;
    }

    .li-footer:hover{
        color: #469DFF;
        transition: 0.3s;
    }

    #app {
        margin-top: 0 !important;
    }

    @media screen and (max-width:768px) {
        .slideCol {
            padding: 0;
        }

        .wrap-content-ul {
            margin-top: 100px;
            margin-left: 0;
            width: 54%;
            max-width: 500px;
            height: auto;
        }

        .wrap-content-payment {
            width: 40%;
        }

        .border-bottom-footer {
            display: none;
        }

        .text-footer {
            margin-top: 300px;
        }
    }

    @media (max-width: 1060px) {
        header .navigation .menu {
            position: fixed;
            display: block;
            background: #23252b;
            min-width: 350px;
            height: 100vh;
            top: 0;
            right: -100%;
            padding: 90px 50px;
            visibility: hidden;
            overflow-y: auto;
            transition: 0.5s;
            transition-property: right, visibility;
        }

        header.sticky .navigation {
            line-height: 75px;
        }

        header .navigation .menu.active {
            right: 0;
            visibility: visible;
        }

        .menu-item {
            position: relative;
        }

        .menu-item .sub-menu {
            opacity: 1;
            position: relative;
            top: 0;
            transform: translateX(10px);
            background: rgba(1, 101, 188, 0.1);
            border-radius: 5px;
            overflow: hidden;
            display: none;
        }

        header.sticky .menu-item .sub-menu {
            top: 0;
        }

        .menu-item:hover .sub-menu {
            transform: translateX(10px);
        }

        .menu-item .sub-menu .sub-item {
            box-shadow: none;
        }

        .menu-item .sub-menu .sub-item:hover {
            background: none;
        }

        .menu-item .sub-menu .sub-item a:hover {
            color: #4080EF;
            transition: 0.3s;
        }

        .more .more-menu {
            opacity: 1;
            position: relative;
            left: 0;
            transform: translateY(0);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            display: none;
        }

        .more .more-menu .more-item {
            box-shadow: none;
        }

        .more .more-menu .more-item:hover {
            background: none;
        }

        .more .more-menu .more-item a {
            margin-left: 20px;
        }

        .close-btn {
            position: absolute;
            background: url(../assets/close.png)no-repeat;
            width: 40px;
            height: 40px;
            background-size: 25px;
            background-position: center;
            top: 0;
            left: 0;
            margin: 25px;
            cursor: pointer;
        }

        .close-btn:hover{
            background-color: #0165BC;
            border-radius: 45%;
            transition: 0.5s;
        }

        .menu-btn {
            background: url(../assets/menu.png)no-repeat;
            width: 40px;
            height: 40px;
            background-size: 30px;
            background-position: center;
            cursor: pointer;
            display: block;
        }

        header {
            padding: 15px 20px;
        }

        header.sticky {
            padding: 10px 20px;
        }
    }
</style>