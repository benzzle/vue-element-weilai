const CourseList = () => import('@/views/educational/course/list')
const CourseAdd = () => import('@/views/educational/course/form')
const CourseDetail = () => import('@/views/common/course_detail')
const CourseSignList = () => import('@/views/educational/course_sign/list')
const CourseSignDetail = () => import('@/views/common/course_detail')

export default [
  {
    path: '/educational/course',
    name: 'CourseList',
    component: CourseList,
    meta: { title: '课程管理' },
    children: [
      {
        path: '/educational/course/add',
        name: 'CourseAdd',
        component: CourseAdd,
        meta: { title: '课程创建' },
        hidden: true
      },
      {
        path: '/educational/course/detail',
        name: 'CourseDetail',
        component: CourseDetail,
        meta: { title: '课程详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/educational/course_sign',
    name: 'CourseSignList',
    component: CourseSignList,
    meta: { title: '课程报名' },
    children: [
      {
        path: '/educational/course_sign/detail',
        name: 'CourseSignDetail',
        component: CourseSignDetail,
        meta: { title: '课程详情' },
        hidden: true
      }
    ]
  }
]