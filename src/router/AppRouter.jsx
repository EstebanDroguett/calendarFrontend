import { Route, Routes, Navigate } from 'react-router-dom';                 //1
import { LoginPage } from '../auth';                                        //1
import { CalendarPage } from '../calendar';                                 //1

export const AppRouter = () => {

    const authStatus = 'authenticated';

    return (
    //------------------------------------------------------------------------1------------------------------------------------------------------------
        <Routes>                                                            
            {
                (authStatus === 'not-authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>  
    //------------------------------------------------------------------------1------------------------------------------------------------------------
    )
}
