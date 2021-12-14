import Game from '../components/game/';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Constants from '../components/Constants';
import Images from '../components/Images';

const Gameplay = () => {
  return (
    <>
      <Header
        title={Constants.TITLE + ' | Gameplay '}
        image={Images.SOCIAL_SHARE}
      />

      <Game />
    </>
  );
};

export default Gameplay;
