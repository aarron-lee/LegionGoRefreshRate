import {
  definePlugin,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaTv } from "react-icons/fa";
import { saveServerApi } from "./backend/utils";
import RefreshRateButtons from "./refreshRate/RefreshRateButtons";
FaTv;

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  return <RefreshRateButtons />;
};

export default definePlugin((serverApi: ServerAPI) => {
  saveServerApi(serverApi);

  return {
    title: <div className={staticClasses.Title}>LGO Refresh Rate</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaTv />,
    onDismount() {},
  };
});
