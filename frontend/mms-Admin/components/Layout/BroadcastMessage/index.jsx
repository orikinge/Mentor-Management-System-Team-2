import BroadcastMessage from "../../Messages/Broadcast";
import { useState, useRef, useCallback, useEffect } from "react";
import BroadcastHeader from "components/NavHeader/BroadcastHeader";
import { Mentions } from "antd";
import BroadcastTextArea from "components/formInputs/BroadcastTextArea";
import styles from "../../componentStyles/broadcast.module.css";
import {
  createBroadcast,
  fetchBroadcast,
  searchUsers,
} from "../../../pages/api/broadcast";

const BroadcastMessageScreen = () => {
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);
  const ref = useRef();

  const loadUsers = async (query) => {
    if (!query) {
      setUsers([]);
      return;
    }
    const { data } = await searchUsers(query);
    if (ref.current !== query) return;

    setLoading(false);
    setUsers(data.slice(0, 10));
  };

  const loadUsersCallback = useCallback(loadUsers, []);
  const onSearch = (query) => {
    console.log("Search:", query);
    ref.current = query;
    setLoading(!!query);
    setUsers([]);
    loadUsersCallback(query);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data } = await fetchBroadcast();
      setMessages(data.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = (text) => {
    const recipient = [10];
    const message = { message: text, recipient };
    createBroadcast(message);
    //TODO: upload files and message text
  };

  const mentionValue = (value) => {
    return value.split("@")[0];
  };

  return (
    <div className={styles.broadcast_panel}>
      <BroadcastHeader />
      <Mentions
        className={styles.mention_input}
        loading={loading}
        options={users.map(({ id, first_name, last_name, email }) => ({
          key: mentionValue(email),
          value: mentionValue(email),
          className: "antd-demo-dynamic-option",
          label: (
            <>
              <span>{`${first_name} ${last_name}`}</span>
            </>
          ),
        }))}
        onSearch={onSearch}
        rows={1}
        placeholder="Select recepient"
      />
      <div className={styles.broadcast_board}>
        <div className={styles.messages_container}>
          {messages?.map((message) => (
            <BroadcastMessage
              key={message.id}
              message={message.message}
              sender={`${message.user.first_name} ${message.user.last_name}`}
              time={message.created_at.split("T")[1].split(".")[0]}
              date={message.created_at.split("T")[0]}
            />
          ))}
        </div>
      </div>

      <BroadcastTextArea handleSubmit={handleSubmit} />
    </div>
  );
};

export default BroadcastMessageScreen;
