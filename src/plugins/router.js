import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'home',
    component: () => import('../views/LoginView.vue'),
    meta: { rotaAdmin: false, rotaAutenticada: false }
  },
  { path: '/admin/servicos',
    name: 'home',
    component: () => import('../views/admin/ServicosView.vue'),
    meta: { rotaAdmin: true, rotaAutenticada: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const validaAdmin = (to, usuarioLogado) => {
  if(to.meta.rotaAdmin){
    if(!usuarioLogado.admin){
      router.push('/')
      return false
    }
  }
}

router.beforeEach(async (to, from, next) => {
  if(to.meta.rotaAutenticada){
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    console.log(usuarioLogado)
    if(usuarioLogado){
      validaAdmin(to, usuarioLogado)
    }else{
      router.push('/')
      return false
    }
  }else{
    next()
  }
})

export default router
