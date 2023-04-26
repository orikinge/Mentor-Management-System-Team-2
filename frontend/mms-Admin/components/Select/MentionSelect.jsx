import { Icon } from "../Icon/Icon";

const MentionSelect = (loading, users, onSearch) => {
  return (
    <div>
      <Mentions
      placeholder="Select recipient"
        getPopupContainer={(trigger) => trigger.parentNode}
        dropdownIcon={<Icon name={"DropDownIndicator"} />}
        loading={loading}
        onSearch={onSearch}
        options={users.map(({ login, avatar_url: avatar }) => ({
          key: login,
          value: login,
          className: "antd-demo-dynamic-option",
          label: (
            <>
              <img src={avatar} alt={login} />
              <span>{login}</span>
            </>
          ),
        }))}
      />
    </div>
  );
};

export default MentionSelect;
