import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import api from './_api'

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
  { path: '/admin/servicos/editar/:id',
    name: 'servicosEditar',
    component: () => import('../views/admin/EditarServicoView.vue'),
    meta: { rotaAutenticada: true, rotaAdmin: true }
  },
  { path: '/admin/cadastro',
    name: 'cadastroAdmin',
    component: () => import('../views/admin/CadastroAdminView.vue'),
    meta: { rotaAutenticada: true, rotaAdmin: true }
  },
  { path: '*',
    name: 'PaginaNaoEncontrada',
    component: () => import('../views/PaginaNaoEncontrada.vue'),
    meta: { rotaAutenticada: false, rotaAdmin: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const enviarParaHomeRealizaLogout = () =>{
  store.commit('realizaLogout')
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

const finalizaAlert = () => {
  store.commit('finalizaAlert')
}

const validaUsuarioLogadoBD = async (id) => {
  try {
    await api.Usuario.GetById(id)
  } catch (e) {
    enviarParaHomeRealizaLogout()
  }
}

router.beforeResolve(async (to, from, next) => {
  try {
    if(to.meta.rotaAutenticada){
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogin'))
      if(usuarioLogado && usuarioLogado != null){
        validaUsuarioLogadoBD(usuarioLogado.id)
        if(to.meta.rotaAdmin){
          validaRotaAdmin(usuarioLogado.admin)
        }
        next()
      }else{
        enviarParaHomeRealizaLogout()
      }
      next()
    }
    finalizaAlert()
    next()
  } catch(e){
    enviarParaHomeRealizaLogout()
  }
})

export default router
