import {useContext} from "react";
import {ChatContext} from "../../context/ChatStore";
import {ChattingRoomBg, SelectBg} from "../../design/Msg/MsgPageDesign";
import MsgDefault from "./MsgDefault";
import MsgPage from "./MsgPage";

const MsgSelectPage = () => {
    const {selectedPage, setSelectedPage, roomId} = useContext(ChatContext);

    const renderSelectedPage = () => {
        switch (selectedPage) {
            case "defaultPage":
                return <MsgDefault setSelectedPage={setSelectedPage}/>;
            case "chatting":
                return <MsgPage setSelectedPage={setSelectedPage} roomId={roomId}/>;
            default:
                return null;
        }
    };

    return (
        <SelectBg>{renderSelectedPage()}</SelectBg>
    );
};
export default MsgSelectPage;