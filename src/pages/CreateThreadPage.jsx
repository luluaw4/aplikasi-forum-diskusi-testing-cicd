import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((states) => states.authUser);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  function onSubmit({ title, body, category }) {
    dispatch(asyncAddThread({ title, body, category, navigate }));
  }

  return (
    <>
      <Helmet>
        <title>RuangDiskusi | Buat Thread</title>
      </Helmet>
      <ThreadInput onSubmit={onSubmit} />
    </>
  );
}

export default CreateThreadPage;
