import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
  return () => import(`../components/${path}.vue`);
}


const router = new VueRouter({
  mode: "history",
  routes:[
      {
          path: "",
          component: importComponent("DashboardLayout"),
          children:[
              //Dashboard
              {
                  path: "/dashboard",
                  name: "Dashboard",
                  meta: { title: 'Dashboard'},
                  component: importComponent("Dashboard"),
              },
              //Merchandise Category
              {
                path: "/merchandisecategory",
                name: "MerchandiseCategory",
                meta: { title: 'Merchandise Category'},
                component: importComponent("DataAdmin/MerchandiseCategory"),
              },
              //Gallery
              {
                  path: "/gallery",
                  name: "Gallery",
                  meta: { title: 'Gallery'},
                  component: importComponent("DataAdmin/Gallery"),
              },
              //Video
              {
                path: "/video",
                name: "Video",
                meta: { title: 'Video'},
                component: importComponent("DataAdmin/Video"),
              },
              //Member
              {
                path: "/member",
                name: "Member",
                meta: { title: 'Member'},
                component: importComponent("DataAdmin/Member"),
              },
              //Activity Member
              {
                path: "/activity",
                name: "Activity",
                meta: { title: 'Activity JKT48'},
                component: importComponent("DataAdmin/Activity"),
              },
              //Article
              {
                path: "/article",
                name: "Article",
                meta: { title: 'Article'},
                component: importComponent("DataAdmin/Article"),
              },
          ],        
      },
      {
          path: "",
          component: importComponent("Header"),
          children:[
              //Gallery page
              {
                path: "/gallerypage",
                name: "GalleryPage",
                meta: { title: 'Gallery'},
                component: importComponent("GalleryPage"),
              },
              //Video page
              {
                path: "/videopage",
                name: "VideoPage",
                meta: { title: 'Video'},
                component: importComponent("VideoPage"),
              },
              //Video Page
              {
                  path: "/detailvideo/:id",
                  name: "DetailVideo",
                  meta: { title: 'Detail Video'},
                  component: importComponent("DetailVideo"),
              },
          ],
      },
      //Login Admin
        {
          path: "/loginadmin",
          name: "LoginAdmin",
          meta: { title: 'Admin Login Page'},
          component: importComponent("LoginAdmin"),
        },
  ],
});

router.beforeEach((to, from, next) =>{

  //Admin
  if(
      to.name == 'Gallery' && localStorage.getItem("admin_id") != '' && localStorage.getItem('admin_username') != 'admin' ||
      to.name == 'Activity' && localStorage.getItem("admin_id") != '' && localStorage.getItem('admin_username') != 'admin' ||
      to.name == 'Member' && localStorage.getItem("admin_id") != '' && localStorage.getItem('admin_username') != 'admin' ||
      to.name == 'MerchandiseCategory' && localStorage.getItem("admin_id") != '' && localStorage.getItem('admin_username') != 'admin'||
      to.name == 'Video' && localStorage.getItem("admin_id") != '' && localStorage.getItem('admin_username') != 'admin' ||
      to.name == 'Article' && localStorage.getItem("admin_id") != '' && localStorage.getItem('admin_username') != 'admin' 
    ){
        next({
            name: "LoginAdmin"
        })
    }
  document.title = to.meta.title;
  next();
});

export default router
