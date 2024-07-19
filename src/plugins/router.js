import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'home',
    component: () => import('../views/LoginView.vue'),
    meta: { rotaAutenticada: false }
  },
  { path: '/servicos',
    name: 'servicos',
    component: () => import('../views/admin/ServicosView.vue'),
    meta: { rotaAutenticada: true }
  },
  { path: '/servicos/solicitar',
    name: 'servicosSolicitar',
    component: () => import('../views/admin/SolicitarServicoView.vue'),
    meta: { rotaAutenticada: true }
  },
  { path: '/servicos/listar',
    name: 'servicosListar',
    component: () => import('../views/admin/ListarServicoView.vue'),
    meta: { rotaAutenticada: true }
  },
  { path: '/servicos/editar/:id',
    name: 'servicosEditar',
    component: () => import('../views/admin/EditarServicoView.vue'),
    meta: { rotaAutenticada: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const enviaParaHome = () =>{
  router.push({name: 'home'}).catch(()=>{})
}

router.beforeResolve(async (to, from, next) => {
  try {
    if(to.meta.rotaAutenticada){
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogin'))
      if(usuarioLogado){
        next()
      }else{
        enviaParaHome()
      }
      next()
    }
    next()
  } catch(e){
    enviaParaHome()
  }
})

export default router
