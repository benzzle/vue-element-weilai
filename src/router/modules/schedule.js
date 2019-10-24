const TimetableList = () => import('@/views/schedule/timetable/list')
const TimetableDetail = () => import('@/views/common/course_detail')
export default [
  {
    path: '/schedule/timetable',
    name: 'TimetableList',
    component: TimetableList,
    meta: { title: '课表' },
    children: [
      {
        path: '/schedule/timetable/detail',
        name: 'TimetableDetail',
        component: TimetableDetail,
        meta: { title: '课程详情' },
        hidden: true
      }
    ]
  }
]