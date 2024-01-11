import { FC, useCallback, useState } from "react";
import {
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  ButtonItem,
} from "decky-frontend-lib";

import { getServerApi } from "../backend/utils";
import ResolutionDropdown from "./ResolutionDropdown";

export const Resolutions = {
  qHD: "1280x800",
  FHD: "1920x1200",
  native: "2560x1600",
};

const RefreshRateButtons: FC = () => {
  const serverApi = getServerApi() as ServerAPI;

  const [resolution, setResolution] = useState(
    window.localStorage.getItem("legion_go_remapper_screen_resolution") ||
      "native"
  );

  const setRes = (res: string) => {
    window.localStorage.setItem("legion_go_remapper_screen_resolution", res);
    setResolution(res);
  };

  const set60 = useCallback(async () => {
    return await serverApi.callPluginMethod("set_refresh_rate", {
      refresh_rate: 60,
      resolution,
    });
  }, [resolution]);
  const set144 = useCallback(async () => {
    return await serverApi.callPluginMethod("set_refresh_rate", {
      refresh_rate: 144,
      resolution,
    });
  }, [resolution]);

  return (
    <>
      <PanelSection title={"Display"}>
        <PanelSectionRow>
          <ResolutionDropdown
            currentResolution={resolution}
            setCurrentResolution={setRes}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ButtonItem
            onClick={() => set60()}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            layout={"below"}
          >
            Set 60Hz {Resolutions[resolution]}
          </ButtonItem>
        </PanelSectionRow>
        <PanelSectionRow>
          <ButtonItem
            onClick={() => set144()}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            layout={"below"}
          >
            Set 144Hz {Resolutions[resolution]}
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>
    </>
  );
};

export default RefreshRateButtons;
