import { FC } from "react";
import { DropdownItem } from "decky-frontend-lib";
import { Resolutions } from "./RefreshRateButtons";

type Props = {
  currentResolution: string;
  setCurrentResolution: (res: string) => void;
};

const ResolutionDropdown: FC<Props> = ({
  currentResolution,
  setCurrentResolution,
}) => {
  const dropdownOptions = Object.entries(Resolutions).map(([value, label]) => {
    return {
      data: value,
      label,
      value,
    };
  });

  return (
    <div>
      <DropdownItem
        bottomSeparator="none"
        rgOptions={dropdownOptions.map((o) => {
          return {
            data: o.data,
            label: o.label,
            value: o.value,
          };
        })}
        selectedOption={
          dropdownOptions.find((o) => {
            return o.data === currentResolution;
          })?.data || "native"
        }
        onChange={({ value }: any) => {
          setCurrentResolution(value);
        }}
      />
    </div>
  );
};

export default ResolutionDropdown;
