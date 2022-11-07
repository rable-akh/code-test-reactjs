import React, { useState } from "react";
import useAuth from "../cores/useAuth"
import { useNavigate } from "react-router-dom";
import { Button, Spinner} from "react-bootstrap"
import Style from "../components/Style";


// import '../css/sign.css';
function Login() {
    const { login } = useAuth();
    const nevigate = useNavigate();
    const [loadig, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!e.target.name.value&&!e.target.password.value){
            return;
        }
        var form = {
          user: e.target.name.value,
          hash: e.target.password.value,
        };
        try {
            setLoading(true);
            await login(form)
            .then((e) => {
                setLoading(false);
                nevigate("/", { replace: true });
            })
            .catch((e) => {
                setLoading(false);
            });
        } catch (error) {
            setLoading(false);
        }
      };

    return(
        <>
        <main className="form-signin w-100 m-auto text-center">
            <form method="POST" onSubmit={handleSubmit}>
                <img className="mb-4" src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                <input type="email" name="name" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
                </div>
                <Button type="submit" variant="primary">
                    {loadig && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />}
                    {loadig?'Loading...':'Sign In'}
                </Button>
                <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
            </form>
        </main>
        <Style>{`
            html,
            body {
              height: 100%;
            }
            
            body {
              display: flex;
              align-items: center;
              padding-top: 40px;
              padding-bottom: 40px;
              background-color: #f5f5f5;
            }
            
            .form-signin {
              max-width: 330px;
              padding: 15px;
            }
            
            .form-signin .form-floating:focus-within {
              z-index: 2;
            }
            
            .form-signin input[type="email"] {
              margin-bottom: -1px;
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
            }
            
            .form-signin input[type="password"] {
              margin-bottom: 10px;
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }
        `}</Style>
        </>
    )
}

export default Login;