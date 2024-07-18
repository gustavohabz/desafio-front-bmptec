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

const enviaParaHome = () =>{
  router.push({name: 'home'}).catch(()=>{})
}

const validaAdmin = (to, usuarioLogado) => {
  if(to.meta.rotaAdmin){
    if(!usuarioLogado.admin){
      enviaParaHome()
      return false
    }
  }
}

router.beforeResolve(async (to, from, next) => {
  try {
    if(to.meta.rotaAutenticada){
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogin'))
      if(usuarioLogado){
        validaAdmin(to, usuarioLogado)
        next()
      }else{
        enviaParaHome()
        return false
      }
      next()
    }
    next()
  } catch(e){
    enviaParaHome()
  }
})

export default router
