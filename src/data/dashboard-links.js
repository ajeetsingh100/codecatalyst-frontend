import { ACCOUNT_TYPE } from "../utils/constraints"
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "My Dashboard",
    path: "/dashboard/my-dashboard",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
     {
    id: 6,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },

 
];
