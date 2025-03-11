import {CenterIcon, CircleBox, MsgDefaultContainer} from "../../design/Msg/MsgSelectDesign";
import MsgAfterDark from "../../images/message_after.png";
import MsgAfterLight from "../../images/message_after-1.png";
import {DarkModeContent} from "../../styles/Layout";
import {useContext} from "react";

const MsgDefault = () => {
    const {darkMode} = useContext(DarkModeContent);
    return (
        <MsgDefaultContainer>
            {/*클릭 시 팔로우 리스트*/}
            <CircleBox darkMode={darkMode}>
                <CenterIcon
                    src={darkMode ? MsgAfterDark : MsgAfterLight}
                />
            </CircleBox>
            <span>새로운 채팅을 시작해보세요</span>
        </MsgDefaultContainer>
    );
}
export default MsgDefault;