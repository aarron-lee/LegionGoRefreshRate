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
    window.localStorage.getItem("legion_go_remapper_screen_resolution_60") ||
      "native"
  );

  const [resolution144, setResolution144] = useState(
    window.localStorage.getItem("legion_go_remapper_screen_resolution_144") ||
      "native"
  );

  const setRes60 = (res: string) => {
    window.localStorage.setItem("legion_go_remapper_screen_resolution_60", res);
    setResolution(res);
  };
  const setRes144 = (res: string) => {
    window.localStorage.setItem(
      "legion_go_remapper_screen_resolution_144",
      res
    );
    setResolution144(res);
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
      resolution: resolution144,
    });
  }, [resolution]);

  return (
    <>
      <PanelSection title={"Display"}>
        <ResolutionDropdown
          currentResolution={resolution}
          setCurrentResolution={setRes60}
        />
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
        <ResolutionDropdown
          currentResolution={resolution144}
          setCurrentResolution={setRes144}
        />
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
            Set 144Hz {Resolutions[resolution144]}
          </ButtonItem>
        </PanelSectionRow>
        <PanelSectionRow>
          <div style={{ fontSize: "80%" }}>
            <strong>
              <em>Legion Go 144Hz Refresh Rate workaround</em>
            </strong>
            <br />
            This workaround enables 144Hz without the artificial 72fps cap
            <br />
            However, you cannot dock to a TV/Monitor while in 144Hz mode
            <br />
            You must first switch back to 60Hz before attempting to dock.
            <br />
            <strong>
              WARNING! when switching between 60Hz and 144Hz, all of your games
              will be closed and Steam will be restarted.
            </strong>
            <br />
            <strong>
              MAKE SURE TO SAVE YOUR GAME DATA, ETC, before changing refresh
              rate
            </strong>
            <br />
            <strong>
              Also, please make sure to disable the unified frame limiter under
              display settings
            </strong>
          </div>
        </PanelSectionRow>
      </PanelSection>
    </>
  );
};

export default RefreshRateButtons;
