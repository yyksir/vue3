let about = () => import(/* webpackChunkName: "about" */ '../../views/About.vue')
import Home from '../../views/Home.vue';
// 导出路由数组 
export default [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			keepAlive: true,
			keepVerify: false
		},
        beforeEnter: (to: any, from: any) => {
        // reject the navigation
        console.log(to,from)
            // return false
        },
	},
    {
		path: '/about',
		name: 'about',
		component: about,
		meta: {
			keepAlive: true,
			keepVerify: false
		},
	}
]