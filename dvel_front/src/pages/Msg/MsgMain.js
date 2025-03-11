import MsgList from "./MsgList";
import {Container} from "../../design/Msg/MsgMainDesign";
import MsgSelectPage from "./MsgSelectPage";

const MsgMain = ({darkMode}) => {
    return (
        <Container darkMode={darkMode}>
            <MsgList darkMode={darkMode}/>
            <MsgSelectPage darkMode={darkMode}/>
        </Container>
    );
};

export default MsgMain;