export const RouterMap = [
  {
    path: "/Home/main",
    name: "main",
    meta: {
      title: "首页",
      role: ["admin", "teacher", "manager"],
      icon: "team",
    },
  },
  {
    path: "/Home/personal",
    name: "Personal",
    meta: {
      title: "个人详情",
      role: ["admin", "teacher", "manager"],
      icon: "team",
    },
  },
  {
    path: "/Home/teacher",
    name: "Teacher",
    meta: { title: "教师管理", role: ["admin"], icon: "team" },
  },
  {
    path: "/Home/admissions",
    name: "Admissions",
    meta: {
      title: "招生管理",
      role: ["admin", "manager"],
      icon: "customer-service",
    },
    children: [
      {
        path: "/Home/admissions/intentional",
        name: "Intentional",
        meta: {
          title: "意向学员管理",
          role: ["admin", "manager"],
          icon: "smile",
          bread: ["招生管理", "意向学员管理"],
          keepAlive: true,
        },
      },
      {
        path: "/Home/admissions/solicitation",
        name: "Solicitation",
        meta: {
          title: "邀约查询",
          role: ["admin"],
          icon: "profile",
          bread: ["招生管理", "邀约查询"],
        },
      },
    ],
  },
  {
    path: "/Home/student",
    name: "Student",
    meta: {
      title: "学生管理",
      role: ["admin", "teacher", "manager"],
      icon: "solution",
    },
    children: [
      {
        path: "/Home/student/info",
        name: "Info",
        meta: {
          title: "学生信息",
          role: ["admin", "teacher", "manager"],
          icon: "file-text",
          bread: ["学生管理", "学生信息"],
        },
      },
      {
        path: "/Home/student/exam",
        name: "Exam",
        meta: {
          title: "考试管理",
          role: ["admin", "teacher"],
          icon: "form",
          bread: ["学生管理", "考试管理"],
        },
      },
      {
        path: "/Home/student/lesson",
        name: "Lesson",
        meta: {
          title: "课时管理",
          role: ["admin", "manager"],
          icon: "hourglass",
          bread: ["学生管理", "课时管理"],
        },
      },
    ],
  },
  {
    path: "/Home/class",
    name: "Class",
    meta: { title: "排课管理", role: ["admin"], icon: "unordered-list" },
  },
  {
    path: "/Home/administrative",
    name: "Administrative",
    meta: { title: "行政管理", role: ["admin"], icon: "car" },
  },
  {
    path: "/Home/finance",
    name: "Finance",
    meta: { title: "财务管理", role: ["admin"], icon: "account-book" },
  },
];
