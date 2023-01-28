import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IGuideProps {
  showingGuide: boolean;
}

const AtLeastOneLetterGuideEditBtn = ({ showingGuide }: IGuideProps) => {
  return (
    <>
      {showingGuide && (
        <GuideTextBox>
          한 글자 이상 작성해주세요. <div></div>
        </GuideTextBox>
      )}
      <DoneBtn type='submit' value='수정완료' $eventdone={showingGuide} />
    </>
  );
};

export const DoneBtn = styled.input<{ $eventdone?: boolean }>`
  margin: 5px 0;
  align-self: flex-end;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.lightBlue};
  padding: 5px 10px;
  font-size: 14px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
  pointer-events: ${(props) => (props.$eventdone ? 'none' : 'fill')};
  @media ${device.tablet} {
    margin: 10px 0;
    font-size: 16px;
  }
`;
const GuideTextBox = styled.span`
  position: absolute;
  right: 5px;
  bottom: 100px;
  font-size: 12px;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.yellow};
  padding: 8px 10px;
  border-radius: 6px;
  z-index: 3;
  > div {
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: -4px;
    right: 20px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.container.yellow};
  }
`;

export default AtLeastOneLetterGuideEditBtn;
