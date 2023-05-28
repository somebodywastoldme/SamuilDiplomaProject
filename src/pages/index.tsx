import LoginForm from '@components/LoginForm/LoginForm';
import { NextPageWithLayout } from './_app';

const IndexPage: NextPageWithLayout = () => {
  return (
    <div className="mainPageContainer">
      <LoginForm />
    </div>
  );
};
export default IndexPage;
