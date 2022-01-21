import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import ProgressBar from './ProgressBar';

interface Props {
  open: boolean;
  setOpen: any;
}

const SettingBody = styled(Box)<{ open: boolean }>`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  z-index: 20;
  max-height: ${({ open }) => (open ? '600px' : '0px')};
  transition: max-height 0.5s;
`;

const SettingField = styled(Box)`
  overflow: hidden;
  background: #1f1f1f;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  padding: 0px 24px;
  width: 374px;
  :nth-of-type(1) {
    font-weight: 800;
    font-size: 24px;
    line-height: 33px;
    color: white;
  }
`;

const CloseIcon = styled(Box)<{ open: boolean }>`
  top: -55px;
  left: 15px;
  position: absolute;
  background: #1f1f1f;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.24);
  border-radius: 24px;
  width: 48px;
  height: 48px;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Live = styled(Box)`
  width: 41px;
  height: 22px;
  margin: 16px 8px -8px 0px;
  background: #F25B5B;
  color: white;
  font-weight: bold;
  font-size: 10px;
  text-align: center;
  line-height: 25px;
  border-radius: 8px;
`;

const Hours = styled(Box)`
  width: 114px;
  height: 22px;
  margin: 16px 8px -8px 0px;
  background: #000000;
  color: white;
  font-weight: bold;
  font-size: 10px;
  text-align: center;
  line-height: 25px;
  border-radius: 8px;
`;

const BottomSetting = styled(Box)`
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 11px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: rgb(255, 255, 255, 0.75);
    align-items: center;
  }
`;

interface ItemFieldProps {
  type?: number;
}

const ItemField = styled(Box)<ItemFieldProps>(({ type }) => ({
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '800',
  flexDirection: type === 0 ? 'column' : 'row',
  fontSize: type === 0 ? '8px' : '14px',
  fontStyle: type === 0 ? 'italic' : 'unset',
  lineHeight: '15px',
  color: 'white',
  width: type === 0 ? '40px' : type === 1 ? '116px' : '90px',
  height: type === 0 ? '40px' : type === 1 ? '100px' : '36px',
}));

const Progress = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  > div {
    color: #ffffffbf;
    font-size: 8px;
    line-height: normal;
    font-weight: normal;
  }
`;

const Text = styled(Box)`
  margin-top: 2px;
`;


const Setting: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <SettingBody open={open}>
      <SettingField>
        <CloseIcon onClick={() => setOpen(false)} open={open}>
          <FaChevronDown fontSize="20px" />
        </CloseIcon>
        <div style={{ display: 'flex' }}>
          <Live>LIVE</Live>
          <Hours>13 Hours Remaining</Hours>
        </div>
        <Box mt="24px">Daily ICE Challenges & Tournament Info</Box>
        <Box display="flex" justifyContent="space-between">
          <Progress justifyContent="none!important">
            <Box>See the flop 15 times</Box>
            <ProgressBar
              type={0}
              percent={7 / 15}
              text="7 of 15"
              width="179px"
            />
          </Progress>
          <Box mt="15px" display="flex">
            <ItemField type={0}>
              <Box mt="-5px">200</Box>
              <Image
                src="/images/diamond.svg"
                alt="diamond"
                width={18}
                height={15}
              />
            </ItemField>
            <ItemField ml="10px" type={0}>
              <Box mt="-5px">1</Box>
              <Image src="/images/xp.svg" alt="xp" width={17} height={11} />
            </ItemField>
          </Box>
        </Box>

        <Box style={{ marginTop: '-8px' }} display="flex" justifyContent="space-between">
          <Progress justifyContent="none!important">
            <Box>Win a hand 5 times</Box>
            <ProgressBar type={1} percent={0 / 5} text="0 of 5" width="179px" />
          </Progress>
          <Box mt="15px" display="flex">
            <ItemField type={0}>
              <Box mt="-5px">750</Box>
              <Image
                src="/images/diamond.svg"
                alt="diamond"
                width={18}
                height={15}
              />
            </ItemField>
            <ItemField ml="10px" type={0}>
              <Box mt="-5px">2</Box>
              <Image src="/images/xp.svg" alt="xp" width={17} height={11} />
            </ItemField>
          </Box>
        </Box>

        <Box style={{ marginTop: '-8px', marginBottom: '12px' }} display="flex" justifyContent="space-between">
          <Progress justifyContent="none!important">
            <Box>Get a 3 of a kind 2 times</Box>
            <ProgressBar type={2} percent={0 / 2} text="0 of 2" width="179px" />
          </Progress>
          <Box mt="15px" display="flex">
            <ItemField type={0}>
              <Box mt="-5px">1000</Box>
              <Image
                src="/images/diamond.svg"
                alt="diamond"
                width={18}
                height={15}
              />
            </ItemField>
            <ItemField ml="10px" type={0}>
              <Box mt="-5px">3</Box>
              <Image src="/images/xp.svg" alt="xp" width={17} height={11} />
            </ItemField>
          </Box>
        </Box>

        <BottomSetting mb="24px">
          <Box>
            <Box style={{ marginBottom: '-6px' }}> Expected ICE Earned</Box>
            <ItemField type={1}>
              <Box>- -&nbsp;&nbsp;</Box>
              <Box mt="5px">
                <Image
                  src="/images/diamond.svg"
                  width={18}
                  height={18}
                  alt="diamond"
                />
              </Box>
            </ItemField>
          </Box>
          <Box>
            <Box style={{ marginBottom: '-6px' }}> Net Chips</Box>
            <ItemField type={2} position="relative">
              <Text>+0</Text>
              <Box position="absolute" right="8px" top="8px">
                <Image
                  src="/images/freecoin.svg"
                  width={22}
                  height={22}
                  alt="freecoin"
                />
              </Box>
            </ItemField>
            <Box style={{ margin: '6px 0px -6px 0px' }}>ICE Multiplier</Box>
            <ItemField type={2}>
              <Text>1.45x</Text>
            </ItemField>
          </Box>
          <Box>
            <Box style={{ marginBottom: '-6px' }}> Percentile</Box>
            <ItemField type={2}>
              <Text>Top 10%</Text>
            </ItemField>
            <Box style={{ margin: '6px 0px -6px 0px' }}> Next Tier</Box>
            <ItemField type={2} position="relative">
              <Text>+4,291</Text>
              <Box style={{ margin: '6px 0px 0px 2px' }}>
                <Image
                  src="/images/freecoin.svg"
                  width={22}
                  height={22}
                  alt="freecoin"
                />
              </Box>
            </ItemField>
          </Box>
        </BottomSetting>
      </SettingField>
    </SettingBody>
  );
};

export default Setting;
