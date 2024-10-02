import { createRouter, createWebHistory } from 'vue-router';
import AuthForm from '@/components/AuthForm.vue';
import ChatInterface from '@/components/ChatInterface.vue';
const routes = [
    {
        path: '/',
        name: 'AuthForm',
        component: AuthForm,
        meta: { requiresAuth: false }
    },
    {
        path: '/chat',
        name: 'ChatInterface',
        component: ChatInterface,
        meta: { requiresAuth: true }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    }
    else if (to.path === '/' && isAuthenticated) {
        next('/chat');
    }
    else {
        next();
    }
});
export default router;
//# sourceMappingURL=index.js.map