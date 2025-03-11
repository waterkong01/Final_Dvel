import { createContext, useState } from "react";
// export const ChatContext = createContext(null);
export const ChatContext = createContext(null);

const ChatStore = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    // const [selectedPage, setSelectedPage] = useState("defaultPage");
    const [selectedPage, setSelectedPage] = useState("chatting");
    const [roomId, setRoomId] = useState(null);
    return (
        <ChatContext.Provider value={{selectedPage, setSelectedPage, roomId, setRoomId}}>
        {/*<ChatContext.Provider value={{roomId, setRoomId}}>*/}
            {children}
        </ChatContext.Provider>
    );
}
export default ChatStore;