const AccountList = () => import('@/views/permission/account/list')
const RoleList = () => import('@/views/permission/role/list')
const RoleAdd = () => import('@/views/permission/role/form')
const RoleEdit = () => import('@/views/permission/role/form')
export default [
  {
    path: '/permission/account',
    name: 'AccountList',
    component: AccountList,
    meta: { title: '账号管理' }
  },
  {
    path: '/permission/role',
    name: 'RoleList',
    component: RoleList,
    meta: { title: '角色管理' },
    children: [
      {
        path: '/permission/role/add',
        name: 'RoleAdd',
        component: RoleAdd,
        meta: { title: '添加角色' },
        hidden: true
      },
      {
        path: '/permission/role/edit',
        name: 'RoleEdit',
        component: RoleEdit,
        meta: { title: '编辑角色' },
        hidden: true
      }
    ]
  }
]