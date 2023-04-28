import Broadcast from "../../Messages/Broadcast";
import { useState, useRef, useCallback, useEffect } from "react";
import BroadcastHeader from "components/NavHeader/BroadcastHeader";
import { Mentions } from "antd";
import BroadcastTextArea from "components/formInputs/BroadcastTextArea";
import styles from "../../componentStyles/broadcast.module.css";
import { broadcastService } from "../../../services/broadcast.service";

const BroadcastMessage = () => {
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState(undefined);
  const [page, setPage] = useState(1);
  const ref = useRef();
  
  const loadUsers = (key) => { 
    // TODO: Get users
    if (!key) {
      setUsers([]);
      return;
    }
    broadcastService
      .searchProfile(key, userToken)
      .then((res) => res)
      .then(({ items = [] }) => {
        if (ref.current !== key) return;
        setLoading(false);
        console.log({items})
        setUsers(items.slice(0, 10));
        console.log(items.slice(0, 10))
      });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObject = JSON.parse(user);
    const token = `${userObject.token.type} ${userObject.token.token}`;
    setUserToken(token);
    loadMessages(token);
  }, []);

  const loadMessages = (token) => {
    broadcastService.index(page, token).then((res) => {
      setMessages(res.data);
    });
  };

  const loadUser = useCallback(loadUsers, []);

  const onSearch = (search) => {
    console.log("Search:", search);
    ref.current = search;
    setLoading(!!search);
    setUsers([]);

    loadUser(search);
  };

  const handleSubmit = (text) => {
    const recipient = [10];
    const message = { message: text, recipient };
    broadcastService.send(message, userToken);
    //TODO: upload files and message text
  };
  return (
    <>
      <div>
        <div className={styles.broadcast_panel}>
          <BroadcastHeader />
          <Mentions loading={loading} users={users} onSearch={onSearch} />
          <div className={styles.broadcast_board}>
            {messages &&
              messages.map((message) => (
                <Broadcast
                  key={message.id}
                  message={message.message}
                  sender={`${message.user.first_name} ${message.user.last_name}`}
                  time={message.created_at.split("T")[1].split(".")[0]}
                  date={message.created_at.split("T")[0]}
                />
              ))}
          </div>
          <BroadcastTextArea handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default BroadcastMessage;
