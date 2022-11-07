import axios from "axios";
import * as React from "react";

import { ApiUri } from "../_config";
const authContext = React.createContext();

function useAuth() {
  let cToken = localStorage.getItem("token");
  let hasToken = false;

  if (cToken) {
    hasToken = true;
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${cToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  const [authed, setAuthed] = React.useState(hasToken); //false

  return {
    authed,
    async login(data) {
      return new Promise((reslove, reject) => {
        axios.post(ApiUri("login"), data).then((e) => {
          if (e.data.response.results.warn !== true) {
            const token = e.data.response.results.token;
            localStorage.setItem("token", token);
            localStorage.setItem(
              "userdata",
              JSON.stringify(e.data.response.results)
            );
            axios.interceptors.request.use(
              (config) => {
                config.headers.authorization = `Bearer ${token}`;
                return config;
              },
              (error) => {
                return Promise.reject(error);
              }
            );
            setAuthed(true);
            reslove();
          } else {
            setAuthed(false);
            reject();
          }
        });
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userdata");
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
