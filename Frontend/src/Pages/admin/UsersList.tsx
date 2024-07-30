
import { Helmet } from 'react-helmet-async';
import TopBar from '../../Components/admin/TopBar';
import UserTable from '../../Components/admin/UserTable';


const UsersList = () => {
  return (
    <>
      <Helmet>
        <title>Candidate Management - CareerUp Admin</title>
      </Helmet>
        <TopBar />
        <UserTable />
    </>
  )
}

export default UsersList