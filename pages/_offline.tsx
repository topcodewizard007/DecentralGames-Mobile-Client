import PageNotFound from '../components/content/PageNotFound';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Offline = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Decentral Games'}
        image={images.SOCIAL_SHARE}
      />

      <PageNotFound />
    </Layout>
  );
};

export default Offline;
