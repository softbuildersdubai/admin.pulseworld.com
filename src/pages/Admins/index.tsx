//REACT
import { useEffect, useState } from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { useAdminActions } from '../../store/admin/adminActions';
//MATERIAL-UI
import { add } from '../../images/other';
//ALERTS
import { selectUser } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../components/Admin/AdminTable';

export default function Admins(): JSX.Element {
  const { getAdminList } = useAdminActions();

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.superAdmin) navigate('/');
  }, []);

  const [loading, setLoading] = useState(true);

  const [adminList, setAdminList] = useState([]);
  const fireApi = async () => {
    setLoading(true);
    const response = await getAdminList();
    setAdminList(response);
    setLoading(false);
  };
  useEffect(() => {
    fireApi();
  }, []);

  if (!user?.superAdmin) return <></>;

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Admins</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={() => navigate('/admins/create', { state: { edit: true } })}
        >
          <img src={add} alt="" width={24} height={24} />
          <span>Create</span>
        </div>
      </div>

      {/* TABLE */}
      <AdminTable data={adminList} loading={loading} fireApi={fireApi} />
    </div>
  );
}
