import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'home',
    component: () => import('../views/LoginView.vue'),
    meta: { rotaAdmin: false, rotaAutenticada: false }
  },
  { path: '/servicos',
    name: 'servicos',
    component: () => import('../views/admin/ServicosView.vue'),
    meta: { rotaAdmin: true, rotaAutenticada: true }
  },
  { path: '/servicos/solicitar',
    name: 'servicosSolicitar',
    component: () => import('../views/admin/SolicitarServicoView.vue'),
    meta: { rotaAdmin: true, rotaAutenticada: true }
  },
  { path: '/servicos/listar',
    name: 'servicosListar',
    component: () => import('../views/admin/ListarServicoView.vue'),
    meta: { rotaAdmin: true, rotaAutenticada: true }
  },
  { path: '/servicos/editar/:id',
    name: 'servicosEditar',
    component: () => import('../views/admin/EditarServicoView.vue'),
    meta: { rotaAdmin: true, rotaAutenticada: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

/*const validaAdmin = (to, usuarioLogado) => {
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
})*/

export default router
