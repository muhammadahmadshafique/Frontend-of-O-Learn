import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css';
import TopNavbar from "../components/TopNavbar/TopNavBar"
import Footer from '../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "../context/index";
function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <ToastContainer position="top-center" />
            <TopNavbar />
            <Component {...pageProps} />
            <Footer/>
            
        </Provider>

    )
}

export default MyApp ;
