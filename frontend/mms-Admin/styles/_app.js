export const styles = `
  .ant-layout-sider {
    position: sticky !important;
    top: 0 !important;
    height: 100vh !important;
  }
  .ant-btn-default:hover {
    color: #fff !important;
  }
  .ant-menu-item-selected {
    color: #808080 !important;
    background-color: #fff !important;
  }
  .ant-menu-item {
    border-radius: 0 !important;
    color: #808080 !important;
  }
  .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: inherit !important;
  }
  .ant-layout-sider-zero-width-trigger {
    background: none !important;
    color: #058b94 !important;
    top: 0 !important;
  }
  .ant-layout-sider-zero-width-trigger svg {
    width: 2em;
    height: 2em;
  }
  .ant-layout{
    background-color: #fff;
  }
  .navbar_navbar_search__yIy6C .ant-input-prefix {
    margin-inline-end: 20px !important;
  }
  @media (max-width: 992px) {
    .ant-layout-sider {
      position: absolute !important;
      left: 0;
      z-index: 99;
    }
  }
`;
