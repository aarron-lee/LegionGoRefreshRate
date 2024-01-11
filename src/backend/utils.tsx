import { ServerAPI } from "decky-frontend-lib";

let serverApi: undefined | ServerAPI;

export const saveServerApi = (s: ServerAPI) => {
  serverApi = s;
};

export const getServerApi = () => {
  return serverApi;
};

export const logInfo = (info: any) => {
  const s = getServerApi();
  s &&
    s.callPluginMethod("log_info", {
      info: JSON.stringify(info),
    });
};
