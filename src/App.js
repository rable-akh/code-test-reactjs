import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import './App.css';
import { AuthProvider } from './cores/useAuth';
import { ApiUri } from './_config';
import RouterConfig from './_config/route';

function App() {

    const checkTokenExpired = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.get(ApiUri("auth/ticket"));
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userdata");
                    window.location.reload();
                }
            }
        }
    };
    
    useEffect(() => {
        checkTokenExpired();
    }, []);
    return (
        <AuthProvider>
            <RouterConfig/>
        </AuthProvider>
    );
}

export default App;
