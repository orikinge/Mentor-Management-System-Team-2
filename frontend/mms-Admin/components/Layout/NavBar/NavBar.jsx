import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "../../Icon/Icon";
import { Avatar, Badge, Col, Input, Row } from "antd";

const NavBar = () => {
  const recentNotifications = useState([]);

  const { Search } = Input;

  const notificationCount = (count) => {
    if (count == 20) return "20+";
    else return count;
  };

  return (
    <header className="header">
      <Row justify={"space-evenly"} align={"middle"}>
        <Col md={12} sm={8} xs={4}>
          <Row align={"middle"}>
            <Image
              width={80}
              height={80}
              src={"/assets/images/logo_small.png"}
              alt="logo"
            />
            <span className="logo-text">Mentor&apos;s Managers System</span>
          </Row>
        </Col>

        <Col span={12}>
          <Row gutter={[16, 8, 4]} align={"middle"} justify={"space-around"}>
            <Col className="gutter-row">
              <Search
                placeholder="Search for anything"
                enterButton=""
                size="large"
                style={{ width: 540 }}
              />
            </Col>
            <Col className="gutter-row">
              <Link href="/home">
                <a>
                  <Badge>
                    <Icon name="Chat" />
                  </Badge>
                </a>
              </Link>
            </Col>
            <Col className="gutter-row">
              <Link href="/home">
                <a>
                  <Badge count={notificationCount(recentNotifications?.length)}>
                    <Icon name="Notification" />
                  </Badge>
                </a>
              </Link>
            </Col>
            <Col className="gutter-row">
              <Link href="/profile">
                <a>
                  <Avatar src="" />
                </a>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default NavBar;
