import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'home',
    component: () => import('../views/LoginView.vue'),
    meta: { rotaAutenticada: false, rotaAdmin: false  }
  },
  { path: '/servicos',
    name: 'servicos',
    component: () => import('../views/ServicosView.vue'),
    meta: { rotaAutenticada: true, rotaAdmin: false  }
  },
  { path: '/servicos/solicitar',
    name: 'servicosSolicitar',
    component: () => import('../views/SolicitarServicoView.vue'),
    meta: { rotaAutenticada: true, rotaAdmin: false  }
  },
  { path: '/servicos/listar',
    name: 'servicosListar',
    component: () => import('../views/ListarServicoView.vue'),
    meta: { rotaAutenticada: true, rotaAdmin: false  }
  },
  { path: '/servicos/editar/:id',
    name: 'servicosEditar',
    component: () => import('../views/admin/EditarServicoView.vue'),
    meta: { rotaAutenticada: true, rotaAdmin: true }
  },
  { path: '/admin/adicionar',
    name: 'AdicionaAdmin',
    component: () => import('../views/admin/AdicionaAdminView.vue'),
    meta: { rotaAutenticada: true, rotaAdmin: true }
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

const enviarParaServicos = () => {
  router.push({name: 'servicosListar'}).catch(()=>{})
}

const validaRotaAdmin = (isAdmin) => {
  if(!isAdmin){
    enviarParaServicos()
  }
}

router.beforeResolve(async (to, from, next) => {
  try {
    if(to.meta.rotaAutenticada){
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogin'))
      if(usuarioLogado){
        if(to.meta.rotaAdmin){
          validaRotaAdmin(usuarioLogado.admin)
        }
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
