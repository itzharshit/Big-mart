import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
// import Dashboard from "./component/Admin/Dashboard.js";
// import ProductList from "./component/Admin/ProductList.js";
// import NewProduct from "./component/Admin/NewProduct";
// import UpdateProduct from "./component/Admin/UpdateProduct";
// import OrderList from "./component/Admin/OrderList";
// import ProcessOrder from "./component/Admin/ProcessOrder";
// import UsersList from "./component/Admin/UsersList";
// import UpdateUser from "./component/Admin/UpdateUser";
// import ProductReviews from "./component/Admin/ProductReviews";
// import Contact from "./component/layout/Contact/Contact";
// import About from "./component/layout/About/About";
// import NotFound from "./component/layout/Not Found/NotFound";
function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
  
  React.useEffect(()=>{ 
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });store.dispatch(loadUser()); 
  },  
  []);
  return (
    
    <Router>
   <Header />
   {/* What is Route exact? */}
{/* The exact param disables the partial matching for a route and makes sure that it only returns the route if the path is an EXACT match to the current url.07 */}

{isAuthenticated && <UserOptions user={user} />}
<Route extact path="/" component= {Home} />
<Route extact path="/product/:id" component= {ProductDetails} />
<Route extact path="/products" component= {Products} />
<Route extact path="/products/:keyword" component= {Products} />
<Route extact path="/search" component= {Search} />
<Route extact path="/login" component= {LoginSignUp} />
<ProtectedRoute exact path="/account" component={Profile} />
<ProtectedRoute exact path="/me/update" component={UpdateProfile} />

<ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />


<Route exact path="/cart" component={Cart} />

<ProtectedRoute exact path="/shipping" component={Shipping} />

<ProtectedRoute exact path="/success" component={OrderSuccess} />

<ProtectedRoute exact path="/orders" component={MyOrders} />

<ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

<ProtectedRoute exact path="/order/:id" component={OrderDetails} />

    <Footer/>
   </Router>
  );
}

export default App;
