import Vue from 'vue'
import VueRouter from 'vue-router'
// import StudentIndex from '../views/student/Index.vue'
// import StudentHome from '../views/student/Home.vue'
// import StudentLecture from '../views/student/Lecture.vue'
// import StudentDirection from '../views/student/Direction.vue'
// import StudentCurriculum from '../views/student/Curriculum.vue'
// import StudentVideo from '../views/student/Video.vue'
// import StudentForum from '../views/student/Forum.vue'
// import Post from '../views/student/Post.vue'
// import EditPost from '../views/student/EditPost.vue'
// import Login from '../views/common/Login.vue'
// import Page404 from '../views/common/Page404.vue'
import { REQUEST_TOKEN } from '@/store/mutation-types'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const Page404 = () => import('@/views/common/Page404')
const StudentHome = () => import('@/views/student/Home')
const StudentIndex = () => import('@/views/student/Index')

const StudentForum = () => import('@/views/student/Forum')
const StudentVideo = () => import('@/views/student/Video')
const Company = () => import('@/views/student/Company')
const CompanyDetail = () => import('@/views/student/CompanyDetail')

const StudentLecture = () => import('@/views/student/Lecture')
const LectureDeatil = () => import('@/views/student/LectureDetail')
const Post = () => import('@/views/student/Post')
const EditPost = () => import('@/views/student/EditPost')
const Login = () => import('@/views/common/Login')

const PersonCenter = () => import('@/views/student/PersonCenter')

const routes = [
  {
    path: '/',
    component: StudentIndex,
    children: [
      {
        path: '',
        name: 'StudentHome',
        component: StudentHome
      },
      {
        path: '/lecture',
        name: 'StudentLecture',
        component: StudentLecture
      },
      {
        path: '/lecture-detail/:id(\\d+)',
        name: 'LectureDeatil',
        component: LectureDeatil
      },
      {
        path: '/company',
        name: 'Company',
        component: Company
      },
      {
        path: '/company-detail/:id(\\d+)',
        name: 'CompanyDetail',
        component: CompanyDetail
      },
      {
        path: '/video/:curriculumId(\\d+)',
        name: 'StudentVideo',
        component: StudentVideo
      },
      {
        path: '/forum',
        name: 'StudentForum',
        component: StudentForum
      },
      {
        path: '/edit-post/:id?',
        name: 'EditPost',
        component: EditPost
      },
      {
        path: '/post/:postId(\\d+)',
        name: 'Post',
        component: Post
      },
      {
        path: 'person-center',
        name: 'PersonCenter',
        component: PersonCenter
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'Page404',
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = Vue.ls.get(REQUEST_TOKEN, '')
  if (token == '') {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
