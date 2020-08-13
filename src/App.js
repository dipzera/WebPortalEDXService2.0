import React from "react"
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { RecoveryPage } from "./pages/RecoveryPage"
import { Dashboard } from "./components/Dashboard/Dashboard"
import { ReceivedOrder } from "./components/Entry/ReceivedOrder"
import { ReceivedInvoice } from "./components/Entry/ReceivedInvoice"
import { Settings } from "./components/Settings/Settings"
import { SentOrder } from "./components/Entry/SentOrder"
import { SentInvoice } from "./components/Entry/SentInvoice"
import ErrorPage from "./pages/ErrorPage"
import history from "./util/history"
import AuthLayout from "./components/layout/AuthLayout"
import PublicLayout from "./components/layout/PublicLayout"


const pages = [
  {
    exact: true,
    path: "/",
    component: () => <Redirect to={"/dashboard"} />,
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
]

const App = () => (
  <Router history={history}>
    <BrowserRouter>
      <Switch>
        {pages.map(
          ({ exact, path, component: Component, layout: Layout }, index) => (
            <Route
              key={index}
              exact={exact}
              path={path}
              render={(props) => (
                <Layout history={props.history}>
                  <Component {...props} />
                </Layout>
              )}
            />
          )
        )}
        <Route exact path={"*"} component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  </Router>
)

export default App
