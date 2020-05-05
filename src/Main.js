import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import RouterWithPaths from "@components/RouterWithPaths";
import Admin from "@admin";
import User from "@user";
import Auth from "@user/containers/auth/LoginScreen";
import { connect } from "react-redux";
import authAction from "@actions/auth";

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

function NotFound() {
  return (
    <>
      <Status code={404} />
      <h2>Not found</h2>;
    </>
  );
}
String.prototype.uintTextBox = function () {
  var re = /^\d*$/;
  return re.test(this);
}
function App() {
  const routers = [
    {
      path: ["/login"],
      component: Auth,
    },
    {
      path: ["/logout"],
      component: connect(
        (state) => {
          return {
            auth: state.auth.auth || {},
          };
        },
        {
          onLogout: authAction.onLogout,
        }
      )((props) => {
        props.onLogout();
        window.location.href = "/login";
        return <div></div>;
      }),
    },
    {
      path: [
        "/example",
        "/example/:function1",
        "/example/:function1/:function2",
        "/example/:function1/:function2/:function3",
      ],
      component: Admin,
    },
    {
      path: [
        "/admin",
        "/admin/:function1",
        "/admin/:function1/:function2",
        "/admin/:function1/:function2/:function3",
      ],
      component: Admin,
    },
    {
      path: ["/:function1", "/:function1/:id", "/:function1/:function2/:id"],
      component: User,
    },
    {
      path: "/",
      component: connect((state) => {
        return {
          auth: state.auth.auth || {},
        };
      })((props) => {
        if (props.auth && props.auth.id) {
          props.history.replace("/admin");
        } else props.history.replace("/login");
        return <div></div>;
      }),
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        {routers.map((route, key) => {
          if (route.component)
            return (
              <RouterWithPaths
                exact
                key={key}
                path={route.path}
                render={(props) => {
                  return <route.component {...props} />;
                }}
              />
            );
          return null;
        })}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
