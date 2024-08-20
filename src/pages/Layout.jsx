import { useOutletContext, Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Layout() {
  const context = useOutletContext();
  const { cartItemCount, searchTerm, handleSearch } = context;

  return (
    <>
      <Header 
        cartItemCount={cartItemCount}
        searchTerm={searchTerm}
        onSearch={handleSearch}  
      />
      <Outlet context={context} />
    </>
  );
}

export default Layout;