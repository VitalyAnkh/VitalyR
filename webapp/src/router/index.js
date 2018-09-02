import Home from '../views/home/Home'


export default function () {
    let router = new VueRouter({
        mode: 'history',
        linkActiveClass: 'is-active',
        routes:[]
    });
    main(router)
    return router
}

function main(router) {
    router.addRoutes([
        { path: '/', name: 'home', component: Home },
            { path: '/a/home/page/:number', name: 'home_page', component: (resolve) => require(['../views/home/HomePage'], resolve) },
            { path: '/a/home/:homecategory', name: 'homecategory', component: (resolve) => require(['../views/home/HomeCategory'], resolve) },
            { path: '/a/home/:homecategory/:number', name: 'homecategory_page', component: (resolve) => require(['../views/home/HomeCategoryPage'], resolve) },
        { path: '/a/blog/theme/:id', name: 'blog', component: (resolve) => require(['../views/theme/Blog'], resolve) },
        { path: '/a/best/theme/:id', name: 'best', component: (resolve) => require(['../views/theme/Blog'], resolve) },
        { path: '/a/:category/theme/:id', name: 'theme', component: (resolve) => require(['../views/theme/Theme'], resolve) },
        { path: '/a/post', name: 'post', component: (resolve) => require(['../views/new/Post'], resolve) },
        { path: '/a/create', name: 'create', component: (resolve) => require(['../views/new/Create'], resolve) },
        { path: '/a/signin', name: 'signin', component: (resolve) => require(['../views/user/Signin'], resolve) },
        { path: '/a/signup', name: 'signup', component: (resolve) => require(['../views/user/SignUp'], resolve) },
        { path: '/a/user/:id', name: 'hourse', component: (resolve) => require(['../views/user/Hourse'], resolve) },
            { path: '/a/user/:id/comment', name: 'usercomment', component: (resolve) => require(['../views/user/Comment'], resolve) },
            { path: '/a/user/:id/save', name: 'usersave', component: (resolve) => require(['../views/user/Save'], resolve) },
            { path: '/a/user/:id/message', name: 'usermessage', component: (resolve) => require(['../views/user/Message'], resolve) },
        { path: '/a/more', name: 'more', component: (resolve) => require(['../views/more/More'], resolve) },
        { path: '*', name: 'notfound', component: (resolve) => require(['../views/notfound/NotFound'], resolve) },
    ])
}