import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Components/homePage';
import Navbar from './Components/navBar';
import Browse from './Components/navbar_component/browse';
import Admin_panel from './Admin/adminPanel';
import Createjobform from './Admin/createjobform.js/index';
// import CompanyForm from './Admin/createjobform.js/companyform';
import SignUp from './Auth/Signup';
import Details from './Button/Details';
import Login from './Auth/Login';
import Privatecomponent from './Auth/Privatecomponent';
import Detailsforjob from './Components/detailsforjob';
import Applyjob from './Components/Applyjob';
import Viewapplicants from './Components/navbar_component/Viewapplicants';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// 💡 Simple component to handle Navbar conditionally
function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/signup'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/viewapplicants/:Companyname" element={<Viewapplicants />}/> */}
        <Route
  path="/viewapplicants/:Companyname"
  element={
    <Privatecomponent allowedroles={['recruiter']}>
      <Viewapplicants />
    </Privatecomponent>
  }
/>

        <Route path="/homepage" element={<Privatecomponent allowedroles={['user']}><HomePage /></Privatecomponent>} />
        <Route path="/Browse" element={<Privatecomponent allowedroles={['user']}><Browse /></Privatecomponent>} />
        <Route path="/Admin_panel" element={<Privatecomponent allowedroles={['recruiter']}><Admin_panel /></Privatecomponent>} />
        <Route path="/createjobform" element={<Privatecomponent allowedroles={['recruiter']}><Createjobform /></Privatecomponent>} />
        {/* <Route path="/companyform" element={<Privatecomponent allowedroles={['recruiter']}><CompanyForm /></Privatecomponent>} /> */}
        <Route path="/details" element={<Details />} />
        <Route path="/jobform" element={<Privatecomponent allowedroles={['user']}><Createjobform /></Privatecomponent>} />
        <Route path="/applyjob/:Companyname" element={<Privatecomponent allowedroles={['user']}><Applyjob /></Privatecomponent>} />
        <Route path="/findbyids/:id" element={<Privatecomponent allowedroles={['user']}><Detailsforjob /></Privatecomponent>} />
        <Route path='/viewapplicants/:Companyname' element={<Privatecomponent allowedroles={['recruiter']}><Viewapplicants /></Privatecomponent>} />
      
      </Routes>
    </>
  );
}

export default App;
