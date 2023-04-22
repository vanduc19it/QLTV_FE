import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { chakra, useColorModeValue } from "@chakra-ui/react";
import bgShapeLight from "./assets/img/effect-onlight.png";
import bgShapeDark from "./assets/img/effect-ondark.png";
import { lazy, Suspense, useEffect, useState } from "react";
import Splasher from "./components/Splasher/Splasher.jsx";




const HomeLazy = lazy(() => import("./pages/Home/Home.jsx"));
const HomeStudent = lazy(() => import("./HomeStudent/index.jsx"));
const Login = lazy(() => import("./Login/Login.jsx"));
const LoginAdmin = lazy(() => import("./Login/LoginAdmin.jsx"));
const Register = lazy(() => import("./Login/Register.jsx"));
const Detail = lazy(() => import("./HomeStudent/Detail.jsx"));
const Profile = lazy(() => import("./HomeStudent/Profile.jsx"));
const ProductsLazy = lazy(() => import("./pages/Products/Products.jsx"));
const Employees = lazy(() => import("./pages/Employees/Employees.jsx"));
const DashboardLazy = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const Category = lazy(() => import("./pages/Category/Category.jsx"));
const Students = lazy(() => import("./pages/Students/Students.jsx"));
const Borrowing = lazy(() => import("./pages/Borrowing/BorrowBook.jsx"));
const SingleProductsLazy = lazy(() =>
  import("./pages/SingleProduct/SingleProducts.jsx")
);
const LayoutLazy = lazy(() => import("./components/Layout/Layout.jsx"));
function App() {
  const bgShape = useColorModeValue(bgShapeLight, bgShapeDark);




  const [count, setCount] = useState(1)
  const [role, setRole] = useState(0)
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"))
    setRole(role)
  }, [])

  console.log(role)

  return (
    <>

      <chakra.div
        bgImage={bgShape}
        bgRepeat="no-repeat"
        bgAttachment="fixed"
        minH="100vh"
        bgPosition="top left"
        className="App"
      >

        <Router>
          {
            role == 0 ? (
              <Routes>
                <Route path="/" exact element={<HomeStudent />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/admin/login" exact element={<LoginAdmin />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/detail/:bookID" exact element={<Detail />} />
                <Route path="profile" exact element={<Profile />} />
              </Routes>
            ) : (
              <Suspense
                fallback={<Splasher />}
              >



                <LayoutLazy>
                  <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/admin" exact element={<HomeLazy />} />
                    <Route path="/products" element={<ProductsLazy />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/dashboard" element={<DashboardLazy />} />
                    <Route path="/borrowing" element={<Borrowing />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/students" element={<Students />} />
                    <Route
                      path="/products/:productID"
                      element={<SingleProductsLazy />}
                    />
                  </Routes>
                </LayoutLazy>
              </Suspense>
            )
          }










        </Router>
      </chakra.div>
    </>

  );
}

export default App;
