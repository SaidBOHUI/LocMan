const App = () => {
  return (
    <>
       {/* <userContext.Provider>  */}
        <DataProvider>
         {/* <Suspense fallback = {<Loader />}>  */}
        <GlobalStyle />
        <Router>
          <LayoutNav />
           {/* {/ <Header /> /}  */}
            <Routes>
              <Route index element={<Home />} /> 
              <Route path="user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/admin/vehicules" element={<AdminHome />} />
            </Routes>
            {/* </LayoutNav>  */}
          {/* <Footer /> */} 
        </Router>
         {/*  </Suspense>  */}
        </DataProvider>
       {/* </userContext.Provider>  */}
    </>
  );
}


export default App;