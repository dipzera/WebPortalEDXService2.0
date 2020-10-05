import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RecoveryPage } from "./pages/RecoveryPage";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ReceivedOrder } from "./components/Entry/ReceivedOrder";
import { ReceivedInvoice } from "./components/Entry/ReceivedInvoice";
import { Settings } from "./components/Settings/Settings";
import { SentOrder } from "./components/Entry/SentOrder";
import { SentInvoice } from "./components/Entry/SentInvoice";
import ErrorPage from "./pages/ErrorPage";
import history from "./util/history";
import AuthLayout from "./layout/AuthLayout";
import PublicLayout from "./layout/PublicLayout";
import Product from "./components/Product/Product";
import ValidatePage from "./pages/ValidatePage";

const entry =
  ("/received-invoice" || "/sent-invoice" || "/received-order" || "/sent-order");

const pages = [
  {
    exact: true,
    path: "/",
    component: () => <Redirect to={"/dashboard"} />,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: `/:entry/product`,
    component: Product,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/login",
    component: LoginPage,
    layout: PublicLayout, // can have more than one layout
  },
  {
    exact: true,
    path: "/register",
    component: RegisterPage,
    layout: PublicLayout, // can have more than one layout
  },
  {
    exact: true,
    path: "/recovery",
    component: RecoveryPage,
    layout: PublicLayout,
  },
  {
    exact: true,
    path: "/dashboard",
    component: Dashboard,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/received-invoice",
    component: ReceivedInvoice,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/sent-invoice",
    component: SentInvoice,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/received-order",
    component: ReceivedOrder,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/sent-order",
    component: SentOrder,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/settings",
    component: Settings,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: '/validate/:token',
    component: ValidatePage,
    layout: PublicLayout
  }
];

const App = () => {
  return (
    <Router history={history}>
      <BrowserRouter>
        <Switch>
          {pages.map(
            ({ exact, path, component: Component, layout: Layout }, index) => (
              <Route
                key={index}
                exact={exact}
                path={path}
                render={(props) => {
                  return (
                    <Layout
                      history={props.history}
                      location={props.location}
                      match={props.match}
                    >
                      <Component
                        history={props.history}
                        location={props.location}
                        match={props.match}
                        {...props}
                      />
                    </Layout>
                  );
                }}
              />
            )
          )}
          <Route exact path={"*"} component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </Router>
  );
};
export default App;
