<template>
    <div class="dashboard">
        <v-navigation-drawer style="background-color: #DA1F1A !important;" v-model="drawer" :mini-variant.sync="mini"
            permanent app>
            <v-list-item class="px-2" v-if="admin.admin_username == 'admin'">
                <v-list-item-avatar>
                    <img src="../assets/Logo48.png" alt="">
                </v-list-item-avatar>

                <v-list-item-title style="color:white;">Admin</v-list-item-title>

                <v-btn style="color:white !important; position:absolute; right:15px;" icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider style="background-color:white;"></v-divider>

            <v-list dense v-if="admin.admin_username == 'admin'">
                <!-- Dashboard -->
                <v-list-item v-for="item in items" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- Documentation -->
                <v-list-group :value="true" style="color:white !important">
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon class="icon" style="color:white !important">mdi-image</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color:white;">Documentation</v-list-item-title>
                    </template>
                    <v-list-group sub-group>
                        <template v-slot:activator>
                            <v-list-item-title style="color:white;">Photos</v-list-item-title>
                        </template>
                        <v-list-item v-for="item in itemsgallery" :key="item.title" link tag="router-link"
                            :to="item.to">
                            <v-list-item-icon>
                                <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-group sub-group>
                        <template v-slot:activator>
                            <v-list-item-title style="color:white;">Videos</v-list-item-title>
                        </template>
                        <v-list-item v-for="item in itemsvideo" :key="item.title" link tag="router-link"
                            :to="item.to">
                            <v-list-item-icon>
                                <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list-group>

                <!-- Merchandise Group -->
                <v-list-group :value="true" style="color:white !important">
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon class="icon" style="color:white !important">mdi-tshirt-crew</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="color:white;">Section Merchandise</v-list-item-title>
                    </template>
                    <v-list-group sub-group>
                        <template v-slot:activator>
                            <v-list-item-title style="color:white;">Merchandise Category</v-list-item-title>
                        </template>
                        <v-list-item v-for="item in itemsmerchandisecategory" :key="item.title" link tag="router-link"
                            :to="item.to">
                            <v-list-item-icon>
                                <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-group sub-group>
                        <template v-slot:activator>
                            <v-list-item-title style="color:white;">Merchandise</v-list-item-title>
                        </template>
                        <v-list-item v-for="item in itemsmerchandise" :key="item.title" link tag="router-link"
                            :to="item.to">
                            <v-list-item-icon>
                                <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list-group>

                <!-- Member -->
                <v-list-item v-for="item in itemsmember" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- Activity Member -->
                <v-list-item v-for="item in itemsactivity" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- Detail Activity Member -->
                <v-list-item v-for="item in itemsdetailactivity" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- Article -->
                <v-list-item v-for="item in itemsarticle" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- Article User -->
                <v-list-item v-for="item in itemsarticleuser" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- Event -->
                <v-list-item v-for="item in itemsevent" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                 <!-- Transaction Event -->
                <v-list-item v-for="item in itemstransactionevent" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                 <!-- Transaction Merchandise -->
                <v-list-item v-for="item in itemstransactionmerchandise" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- Report -->
                <v-list-item v-for="item in itemsreport" :key="item.title" link tag="router-link" :to="item.to">
                    <v-list-item-icon>
                        <v-icon style="color:white !important">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="color:white !important">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-icon @click="logout"
                style="color:white !important; position:absolute; bottom:0; left:5px; padding:10px; ">mdi-power</v-icon>
        </v-navigation-drawer>
        <div class="grey lighten-4 fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                admin: '',
                drawer: true,
                items: [{
                        title: 'Dashboard',
                        to: "/dashboard",
                        icon: 'mdi-home'
                    },
                ],
                itemsgallery: [{
                        title: 'Add Photo',
                        to: "/gallery",
                        icon: 'mdi-image-plus'
                    },
                ],
                itemsvideo:[
                    {
                        title: 'Add Video',
                        to: "/video",
                        icon: 'mdi-video-plus'
                    },
                ],
                itemsmember:[
                    {
                        title: 'Member JKT48',
                        to: "/member",
                        icon: 'mdi-account-group'
                    },
                ],
                itemsactivity:[
                    {
                        title: 'Activity JKT48',
                        to: "/activity",
                        icon: 'mdi-calendar-range'
                    },
                ],
                itemsdetailactivity:[
                    {
                        title: 'Detail Activity JKT48',
                        to: "/detailactivity",
                        icon: 'mdi-calendar-range'
                    },
                ],
                itemsarticle:[
                    {
                        title: 'Article',
                        to: "/article",
                        icon: 'mdi-newspaper-plus'
                    },
                ],
                itemsarticleuser:[
                    {
                        title: 'Article User',
                        to: "/articleuser",
                        icon: 'mdi-shield-check'
                    },
                ],
                itemsmerchandise:[
                    {
                        title: 'Merchandise',
                        to: "/merchandise",
                        icon: 'mdi-tshirt-crew'
                    },
                ],

                itemsmerchandisecategory:[
                    {
                        title: 'Merchandise Category',
                        to: "/merchandisecategory",
                        icon: 'mdi-tshirt-crew'
                    },
                ],
                
                itemsevent:[
                    {
                        title: 'Event',
                        to: "/event",
                        icon: 'mdi-calendar-plus'
                    },
                ],

                itemstransactionevent:[{
                        title: 'Transaction Event',
                        to: "/transactioneventadmin",
                        icon: 'mdi-calendar-plus'
                }],

                itemstransactionmerchandise:[{
                        title: 'Transaction Merchandise',
                        to: "/transactionmerchandiseadmin",
                        icon: 'mdi-tshirt-crew'
                }],

                itemsreport:[{
                        title: 'Report',
                        to: "/report",
                        icon: 'mdi-file-chart-outline'
                }],

                mini: true,
            }
        },
         mounted() {
            if (localStorage.getItem('admin_id') != null) {
                this.$http.get(this.$api + '/admin/' + localStorage.getItem('admin_id'))
                    .then(response => {
                        this.admin = response.data.data;
                    }).catch(error => {
                        console.log(error)
                    })
            } else {
                this.$router.push({
                    name: 'LoginAdmin',
                });
            }

        },
         methods: {
            logout() {

                if (localStorage.getItem('admin_id') != null) {
                    localStorage.removeItem('admin_id');
                    localStorage.removeItem('admin_username');
                    this.$router.push('/loginadmin');
                }


            }
        },
    }
</script>
<style >
    .fullheight {
        min-height: 100vh !important;
    }

    .router {
        text-decoration: none;
        color: black;
    }

    .txtTitle {
        font-family: 'Manrope', sans-serif;
    }

    /* .icon{
        padding-top: 40px;
    } */
    .v-list-item__subtitle,
    .v-list-item__title {
        flex: none !important;
    }

    .v-list-group__header__append-icon {
        position: absolute !important;
        margin-left: 165px !important;
    }

    .mdi-chevron-down {
        color: white !important;
    }
    .v-application a {
        cursor: pointer;
        text-decoration: none;
    }
</style>