import { AiOutlineHome,AiOutlineTags,AiOutlineAppstoreAdd,AiOutlineAudit,AiOutlineQuestionCircle, AiFillBook, AiFillIdcard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { RiUser2Line } from "react-icons/ri";
import { ImUserTie} from "react-icons/im";
export const NavData = [
  {
    id: 0,
    name: "Home",
    icon: AiOutlineHome,
    page:"/"
  },
  {
    id: 1,
    name: "Dashboard",
    icon: AiOutlineAppstoreAdd,
    page:"dashboard"
  },
  {
    id:2,
    name:"Category",
    icon:MdOutlineCategory,
    page:"category"
  },
  {
    id:3,
    name:"Books",
    icon:BsBook,
    page:"products"
  },
  {
    id:4,
    name:"Students",
    icon:RiUser2Line,
    page:"students"
  },
  {
    id:5,
    name:"Borrowing",
    icon:AiFillIdcard,
    page:"borrowing"
  },
  {
    id:6,
    name:"Employees",
    icon:ImUserTie,
    page:"employees"
  },
 

];
