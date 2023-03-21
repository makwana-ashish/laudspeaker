import ReactSlider from "react-slider";
import ModalBuilderColorPicker from "./Elements/ModalBuilderColorPicker";
import ModalBuilderNumberInput from "./Elements/ModalBuilderNumberInput";
import {
  defaultGradientBackground,
  defaultImageBackground,
  defaultSolidBackground,
  ModalState,
} from "./ModalBuilder";
import SizeUnitPicker from "./SizeUnitPicker";
import {
  BackgroundType,
  GradientBackground,
  SizeUnit,
  SolidBackground,
} from "./types";

interface IModalEditorCanvasMenuProps {
  modalState: ModalState;
  setModalState: (modalState: ModalState) => void;
}

const ModalEditorCanvasMenu = ({
  modalState,
  setModalState,
}: IModalEditorCanvasMenuProps) => {
  const bodyWidth = document.body.clientWidth;

  return (
    <div className="text-white text-[14px] font-normal">
      <div className="flex items-start justify-between mb-[20px]">
        <div>Width:</div>
        <div>
          <div>
            <ReactSlider
              className="h-[20px] flex items-center justify-center mb-[8px]"
              trackClassName="h-[5px] bg-[#22C55E] rounded-[4px]"
              min={modalState.width.unit === SizeUnit.PIXEL ? 100 : 1}
              max={modalState.width.unit === SizeUnit.PIXEL ? bodyWidth : 100}
              value={modalState.width.value}
              onChange={(value) =>
                setModalState({
                  ...modalState,
                  width: { ...modalState.width, value },
                })
              }
              renderThumb={(props) => (
                <div
                  {...props}
                  className="rounded-[100%] w-[16px] h-[16px] cursor-grab bg-white"
                />
              )}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <ModalBuilderNumberInput
              id="width"
              name="width"
              value={modalState.width.value}
              unit={modalState.width.unit}
              onChange={(value) =>
                setModalState({
                  ...modalState,
                  width: { ...modalState.width, value },
                })
              }
            />
            <SizeUnitPicker
              value={modalState.width.unit}
              onChange={(unit) =>
                setModalState({
                  ...modalState,
                  width: { ...modalState.width, unit },
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>Corner:</div>
        <div className="flex items-center gap-[10px]">
          <ModalBuilderNumberInput
            id="corner"
            name="corner"
            value={modalState.borderRadius.value}
            unit={modalState.borderRadius.unit}
            onChange={(value) =>
              setModalState({
                ...modalState,
                borderRadius: { ...modalState.borderRadius, value },
              })
            }
            className="!min-w-[122px]"
          />
        </div>
      </div>
      <div className="border-t-[1px] border-[#5D726D] my-[15px]" />
      <div className="flex flex-col gap-[10px]">
        <div>Background:</div>
        <div className="flex select-none">
          <div
            className={`flex justify-center items-center w-full h-[26px] border-white border-[1px] rounded-l-md cursor-pointer ${
              modalState.background.type === BackgroundType.SOLID
                ? "bg-white text-[#2f4a43]"
                : "hover:bg-white hover:bg-opacity-25"
            }`}
            onClick={() =>
              setModalState({
                ...modalState,
                background:
                  modalState.background.type === BackgroundType.SOLID
                    ? modalState.background
                    : defaultSolidBackground,
              })
            }
          >
            Solid
          </div>
          <div
            className={`flex justify-center items-center w-full h-[26px] border-white border-[1px] cursor-pointer ${
              modalState.background.type === BackgroundType.GRADIENT
                ? "bg-white text-[#2f4a43]"
                : "hover:bg-white hover:bg-opacity-25"
            }`}
            onClick={() =>
              setModalState({
                ...modalState,
                background:
                  modalState.background.type === BackgroundType.GRADIENT
                    ? modalState.background
                    : defaultGradientBackground,
              })
            }
          >
            Gradient
          </div>
          <div
            className={`flex justify-center items-center w-full h-[26px] border-white border-[1px] rounded-r-md cursor-pointer ${
              modalState.background.type === BackgroundType.IMAGE
                ? "bg-white text-[#2f4a43]"
                : "hover:bg-white hover:bg-opacity-25"
            }`}
            onClick={() =>
              setModalState({
                ...modalState,
                background:
                  modalState.background.type === BackgroundType.IMAGE
                    ? modalState.background
                    : defaultImageBackground,
              })
            }
          >
            Image
          </div>
        </div>
        {modalState.background.type === BackgroundType.SOLID && (
          <>
            <div className="flex items-center justify-between">
              <div>Color:</div>
              <div className="flex items-center gap-[10px]">
                <ModalBuilderColorPicker
                  className="!min-w-[122px]"
                  color={modalState.background.color}
                  onChange={(color) =>
                    setModalState({
                      ...modalState,
                      background: {
                        ...(modalState.background as SolidBackground),
                        color,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Opacity:</div>
              <div className="flex items-center gap-[10px]">
                <ModalBuilderNumberInput
                  id="opacity"
                  name="opacity"
                  unit={SizeUnit.PERCENTAGE}
                  value={modalState.background.opacity * 100}
                  onChange={(val) =>
                    setModalState({
                      ...modalState,
                      background: {
                        ...(modalState.background as SolidBackground),
                        opacity: val / 100,
                      },
                    })
                  }
                />
              </div>
            </div>
          </>
        )}
        {modalState.background.type === BackgroundType.GRADIENT && (
          <>
            <div className="flex items-center justify-between">
              <div>Color 1:</div>
              <div className="flex items-center gap-[10px]">
                <ModalBuilderColorPicker
                  className="!min-w-[122px]"
                  color={modalState.background.color1}
                  onChange={(color) =>
                    setModalState({
                      ...modalState,
                      background: {
                        ...(modalState.background as GradientBackground),
                        color1: color,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Color 2:</div>
              <div className="flex items-center gap-[10px]">
                <ModalBuilderColorPicker
                  className="!min-w-[122px]"
                  color={modalState.background.color2}
                  onChange={(color) =>
                    setModalState({
                      ...modalState,
                      background: {
                        ...(modalState.background as GradientBackground),
                        color2: color,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Opacity:</div>
              <div className="flex items-center gap-[10px]">
                <ModalBuilderNumberInput
                  id="opacity"
                  name="opacity"
                  unit={SizeUnit.PERCENTAGE}
                  value={modalState.background.opacity * 100}
                  onChange={(val) =>
                    setModalState({
                      ...modalState,
                      background: {
                        ...(modalState.background as SolidBackground),
                        opacity: val / 100,
                      },
                    })
                  }
                />
              </div>
            </div>
          </>
        )}
        {modalState.background.type === BackgroundType.IMAGE && (
          <>
            <div className="flex items-center justify-between">
              <div>Image source:</div>
              <div className="flex items-center gap-[10px]">
                {modalState.background.imageSrc}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalEditorCanvasMenu;