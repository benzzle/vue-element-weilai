const BranchList = () => import('@/views/administration/branch/list');
const ClassroomList = () => import('@/views/administration/classroom/list');
export default [
  {
    path: '/administration/branch',
    name: 'BranchList',
    component: BranchList,
    meta: { title: '校区管理' }
  },
  {
    path: '/administration/classroom',
    name: 'ClassroomList',
    component: ClassroomList,
    meta: { title: '教室管理' }
  }
]