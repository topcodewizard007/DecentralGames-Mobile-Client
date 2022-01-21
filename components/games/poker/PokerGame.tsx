import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { BsBoxArrowLeft } from 'react-icons/bs';
import Image from 'next/image';
import Character from './Character';
import Setting from './Setting';
import LeaderBoard from './LeaderBoard';
import ProgressBar from './ProgressBar';
import RaiseSetting from './RaiseSetting';
import TableCard from './tableCard/TableCard';


const Progress = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  > div {
    color: #ffffffbf;
    font-size: 8px;
    line-height: normal;
    font-weight: normal;
  }
`;

const Body = styled(Box)`
  width: 100%;
  position: relative;
  margin-top: 80px;
  font-family: 'Larsseit';
`;

const Table = styled(Box)`
  background-image: url('images/Table.png');
  width: 100%;
  max-width: 374px;
  height: 568px;
  position: absolute;
  left: calc(50% - 187px);
`;

const Links = styled(Box)`
  position: absolute;
  width: 340px;
  display: flex;
  justify-content: space-between;
  left: calc(50% - 170px);
`;

const BlackEllipse = styled(Box)`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: #2a2a2a;
  border-radius: 50%;
  color: #616161;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16));
`;

type ActionButtonGroupProps = {
  turn: number;
};

const ActionButtonGroup = styled(Box)<ActionButtonGroupProps>(({ turn }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
  opacity: turn === 0 ? 1 : 0.2,
  ['& >div']: {
    borderRadius: '8px',
    width: '103px',
    height: '69px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '5px',
    color: 'white',
  },
  ['& :nth-of-type(1)']: {
    background: '#A82822',
  },
  ['& :nth-of-type(2)']: {
    width: '103px',
    height: '69px',
    borderRadius: '8px',
    marginLeft: '-108px',
    zIndex: '-1',
    marginTop: '8px',
    background: '#92120C',
  },
  ['& :nth-of-type(3)']: {
    background: '#3D86A6',
  },
  ['& :nth-of-type(4)']: {
    width: '103px',
    height: '69px',
    borderRadius: '8px',
    marginLeft: '-108px',
    zIndex: '-1',
    marginTop: '8px',
    background: '#267CA1',
  },
  ['& :nth-of-type(5)']: {
    background: '#3DA65A',
  },
  ['& :nth-of-type(6)']: {
    width: '103px',
    height: '69px',
    borderRadius: '8px',
    marginLeft: '-108px',
    zIndex: '-1',
    marginTop: '8px',
    background: '#2B8C46',
  },
}));

const TurnButton = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 11px;

  width: 84px;
  height: 31px;

  border: 1px solid #67dd6c;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;

  margin-left: calc(100% - 90px);
  zindex: 10;
  position: relative;
`;

const Dot = styled(Box)`
  margin-top: 0px;
  background: #00ff0a;
  box-shadow: 0px 0px 4px rgba(4, 235, 68, 0.5);
  border-radius: 50%;
  width: 7px;
  height: 7px;
`;

const positionx = [
  'calc(50% - 36px)',
  'calc(50% + 90px)',
  'calc(50% + 90px)',
  'calc(50% - 36px)',
  'calc(50% - 160px)',
  'calc(50% - 160px)',
];
const positiony = ['460px', '330px', '140px', '0px', '140px', '330px'];
const items = [
  ['/images/item1.svg'],
  ['/images/item1.svg'],
  ['/images/item1.svg', '/images/item1.svg', '/images/item1.svg'],
  ['/images/item1.svg', '/images/item1.svg', '/images/item1.svg'],
  ['/images/item1.svg'],
  [
    '/images/item1.svg',
    '/images/item1.svg',
    '/images/item1.svg',
    '/images/item1.svg',
    '/images/item1.svg',
  ],
];

const PokerGame = () => {
  const [turn, setTurn] = useState(0);
  const [active, setActive] = useState<boolean[]>(new Array(6).fill(true));
  const [raiseamount, setRaiseAmount] = useState(600);
  const [raiseshow, setRaiseShow] = useState(false);
  const [raise, setRaise] = useState<number[]>([]);
  const [issetting, setIsSetting] = useState(false);
  const [isleaderboard, setIsLeaderBoard] = useState(false);
  const [iceamount, setIceAmount] = useState(22000); // eslint-disable-line
  const [xpamount, setXPAmount] = useState(22); // eslint-disable-line
  const [dgamount, setDGAmount] = useState(0.01); // eslint-disable-line
  const [roundcount, setRoundCount] = useState(0);
  const [win, setWin] = useState<boolean[]>(new Array(6).fill(false));

  const tablecard: any = useRef(null);

  const setNextTurn = () => {
    let temp = (turn + 1) % 6;
    while (active[temp] === false && temp !== turn) temp = (temp + 1) % 6;
    if (temp === 0) {
      setRoundCount(roundcount + 1);
      tablecard.current.progressDeal();
      if (roundcount + 1 === 3) {
        setTurn(-1);
        let t = [...win];
        t[temp] = true;
        setWin(t);
        return;
      }
    }
    if (temp === turn) setTurn(-1);
    else setTurn(temp);
  };

  const onFold = () => {
    if (turn >= 0) {
      let tempactive = [...active];
      tempactive[turn] = false;
      setActive(tempactive);
      setNextTurn();
    }
  };

  const onRaise = () => {
    if (raiseamount == 0) {
      alert('Input correct amount');
      return;
    }
    let temp = [...raise];
    temp[turn] = raiseamount;
    setRaise(temp);
    setNextTurn();
    setRaiseShow(false);
  };

  const onCall = () => {
    let temp = [...raise];
    temp[turn] = 300;
    setRaise(temp);
    setNextTurn();
  };

  const onReset = () => {
    setRaise([]);
    setTurn(0);
    setWin(new Array(6).fill(false));
    setActive(new Array(6).fill(true));
    tablecard.current?.newRound();
    setTimeout(function () {
      tablecard.current?.progressDeal();
    }, 100);
  };

  useEffect(() => {
    onReset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Body>
      <TableCard ref={tablecard} />
      <Table />
      <Links>
        <BlackEllipse left="40px" onClick={() => onReset()}>
          <BsBoxArrowLeft />
        </BlackEllipse>
        <BlackEllipse
          right="40px"
          onClick={() => setIsLeaderBoard(!isleaderboard)}
        >
          <MdOutlineLeaderboard />
        </BlackEllipse>
      </Links>
      {positionx.map((data, i) => {
        return (
          <Character
            key={300 + i}
            image="images/character.png"
            left={positionx[i]}
            top={positiony[i]}
            active={active[i]}
            user={i === 0}
            turn={turn == i}
            index={i}
            raise={raise[i]}
            onFold={onFold}
            items={items[i]}
            ice={iceamount}
            xp={xpamount}
            dg={dgamount}
          />
        );
      })}
      {/* <CardPanel>
        <Box display="flex">

          <Box margin="5px"><Card type="Carreau" number="A" /></Box>
          <Box margin="5px"><Card type="Pique" number="J" /></Box>
          <Box margin="5px"><Card type="Carreau" number="A" /></Box>
        </Box>
        <Box display="flex" pl="30px">
          <Box margin="5px"><Card type="Carreau" number="A" /></Box>
          <Box margin="5px"><Card type="Carreau" number="A" /></Box>
        </Box>
      </CardPanel> */}

      <Box display="flex" justifyContent="center">
        <Box pt="540px" px="20px" width="374px">
          <TurnButton>
            <Box style={{ marginTop: '2px' }} color="white" fontSize="11px" mr="5px">
              Your Turn
            </Box>
            <Dot />
          </TurnButton>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <ActionButtonGroup turn={turn === -1 ? 1 : 0}>
          <Box onClick={() => turn !== -1 && onFold()}>Fold</Box>
          <Box />
          <Box onClick={() => turn !== -1 && onCall()}>Call 300</Box>
          <Box />  
          <Box onClick={() => turn !== -1 && setRaiseShow(true)}>Raise</Box>
          <Box />
        </ActionButtonGroup>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        onClick={() => setIsSetting(!issetting)}
        mb="15px"
      >
        <Progress>
          <Box>See the river 15 times</Box>
          <ProgressBar type={0} percent={7 / 15} text="7/15" width="74px" />
        </Progress>
        <Progress>
          <Box>Win the hand X times</Box>
          <ProgressBar type={1} percent={1 / 8} text="1/8" width="74px" />
        </Progress>
        <Progress>
          <Box>Get a three of a kind X times</Box>
          <ProgressBar type={2} percent={3 / 4} text="3/4" width="74px" />
        </Progress>
      </Box>
      <RaiseSetting
        open={raiseshow}
        setOpen={setRaiseShow}
        raiseamount={raiseamount}
        setRaiseAmount={setRaiseAmount}
        onRaise={onRaise}
      />
      <Setting open={issetting} setOpen={setIsSetting} />
      <LeaderBoard open={isleaderboard} setOpen={setIsLeaderBoard} />
      {win[0] && (
        <Box position="absolute" left="calc(50% - 90px)" top="570px">
          <Image
            src="/images/200ice.svg"
            alt="200ice"
            width={176}
            height={111}
          />
        </Box>
      )}
      {win[0] && (
        <Box
          position="absolute"
          left="calc(50% - 43px)"
          top="450px"
          zIndex={19}
        >
          <Image
            src="/images/fullhouse.svg"
            alt="fullhouse"
            width={84}
            height={35}
          />
        </Box>
      )}
    </Body>
  );
};

export default PokerGame;
