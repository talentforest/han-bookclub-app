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
  align-self: flex-end;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
  pointer-events: ${(props) => (props.$eventdone ? 'none' : 'fill')};
  @media ${device.tablet} {
    font-size: 18px;
  }
`;
const GuideTextBox = styled.span`
  position: absolute;
  right: 0px;
  top: 30px;
  font-size: 10px;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.yellow};
  padding: 2px 4px;
  border-radius: 6px;
  > div {
    width: 8px;
    height: 8px;
    position: absolute;
    top: -4px;
    right: 20px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.container.yellow};
  }
`;

export default AtLeastOneLetterGuideEditBtn;
