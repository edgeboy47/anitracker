import { ReactElement } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

type Props = {
  icon: ReactElement<IconType>;
  text: string;
  onClick: () => void;
};
const HoverTextIcon = ({ icon, text, onClick }: Props) => {
  return (
    <StyledControls>
      <HoverTextContainer onClick={onClick}>
        {icon}
        <HoverText>{text}</HoverText>
      </HoverTextContainer>
    </StyledControls>
  );
};

const StyledControls = styled.div`
  background-color: #111;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &&&:hover {
    /* &&& is necessary for higher specificity, to ensure this hover shows correctly */
    /* See https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity */
    transform: scale(1.2);
  }

  svg {
    width: 24px;
    height: 24px;
    color: #eee;
  }
`;

const HoverTextContainer = styled.div`
  position: relative;
  border-radius: 50%;
  /* border: 1px solid white; */
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover > span {
    visibility: visible;
    opacity: 1;
  }
`;

const HoverText = styled.span`
  background: #111;
  border-radius: 4px;
  padding: 0.25rem;
  font-size: 0.75rem;
  width: max-content;
  color: #eee;
  position: absolute;
  right: 0;
  bottom: calc(50% - 10.5px);
  margin-right: 2.25rem;

  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease-in;
`;

export default HoverTextIcon;
