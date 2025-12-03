import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Books from './components/Books';
import Patrons from './components/Patrons';
import Loans from './components/Loans';
import OverdueLoans from './components/Overdue';



const MainRouter = () => {
    return (
        <>
           
        <Layout/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books' element={<Books />} />
            <Route path='/patrons' element={<Patrons />} />
            <Route path='/loans' element={<Loans />} />
            <Route path='/overdue' element={<OverdueLoans />} />
        </Routes>

        
        </>
    )
}

export default MainRouter;