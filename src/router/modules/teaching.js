const ParentView = () => import("@/components/ParentView"); 

const TeacherList = () => import('@/views/teaching/teacher/list');
const TeacherAdd = () => import('@/views/teaching/teacher/form');
const TeacherEdit = () => import('@/views/teaching/teacher/form');
const TeacherDetail = () => import('@/views/teaching/teacher/detail');
const StudentList = () => import('@/views/teaching/student/list');
const StudentAdd = () => import('@/views/teaching/student/form')
const StudentEdit = () => import('@/views/teaching/student/form')
const StudentDetail = () => import('@/views/teaching/student/detail')
const ClassList = () => import('@/views/teaching/class/list')
const ClassAdd = () => import('@/views/teaching/class/form')
const ClassEdit = () => import('@/views/teaching/class/form')
export default [
  {
    path: '/teaching/teacher',
    name: 'TeacherList',
    component: TeacherList,
    meta: { title: '教师管理' },
    children: [
      {
        path: '/teaching/teacher/add',
        name: 'TeacherAdd',
        component: TeacherAdd,
        meta: { title: '添加教师' },
        hidden: true
      },
      {
        path: '/teaching/teacher/edit',
        name: 'TeacherEdit',
        component: TeacherEdit,
        meta: { title: '编辑教师' },
        hidden: true
      },
      {
        path: '/teaching/teacher/detail',
        name: 'TeacherDetail',
        component: TeacherDetail,
        meta: { title: '教师个人信息' },
        hidden: true
      }
    ]
  },
  {
    path: '/teaching/student',
    name: 'StudentList',
    component: StudentList,
    meta: { title: '学生管理' },
    children: [
      {
        path: '/teaching/student/add',
        name: 'StudentAdd',
        component: StudentAdd,
        meta: { title: '添加学生' },
        hidden: true
      },
      {
        path: '/teaching/student/edit',
        name: 'StudentEdit',
        component: StudentEdit,
        meta: { title: '编辑学生' },
        hidden: true
      },
      {
        path: '/teaching/student/detail',
        name: 'StudentDetail',
        component: StudentDetail,
        meta: { title: '学生个人信息' },
        hidden: true
      }
    ]
  },
  {
    path: '/teaching/class',
    name: 'ClassList',
    component: ClassList,
    meta: { title: '班级管理' },
    children: [
      {
        path: '/teaching/class/add',
        name: 'ClassAdd',
        component: ClassAdd,
        meta: { title: '创建班级' },
        hidden: true
      },
      {
        path: '/teaching/class/edit',
        name: 'ClassEdit',
        component: ClassEdit,
        meta: { title: '编辑班级' },
        hidden: true
      }
    ]
  }
]