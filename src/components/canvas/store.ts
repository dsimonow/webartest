import { create } from "zustand"

type TransformControlsMode = "scale" | "rotate";
interface TransformControlState {
    mode: TransformControlsMode
    enabled: boolean
    toggleTransformControlMode: () => void
    toggleTransformControlEnabled: () => void
}


export const useTransformControlsStore = create<TransformControlState>((set) => ({
    enabled: false,
    mode: 'rotate' as TransformControlsMode,
    toggleTransformControlMode: () =>
        set((state) => ({
            mode:
                state.mode === 'scale'
                    ? (state.mode = 'rotate')
                    : state.mode = 'scale'
        })),
    toggleTransformControlEnabled: () =>
        set((state) => ({
            enabled:
                state.enabled === true
                    ? (state.enabled = false)
                    : state.enabled = true
        })),
}));

interface ScenarioState {
    size: number
    increaseSize: () => void
    decreaseSize: () => void
}
export const useScenarioStore = create<ScenarioState>((set) => ({
    size: 0.0003,
    increaseSize: () =>
        set((state) => ({
            size:
                state.size >= 0.010
                    ? (state.size = 0.010)
                    : state.size + 0.0005
        })),
    decreaseSize: () =>
        set((state) => ({
            size:
                state.size <= 0.0003
                    ? (state.size = 0.0003)
                    : state.size - 0.0005
        })),
}));

type FireStates = "off" | "ignite" | "mid" | "end";
type FireSimulationState = {
    fireStates: FireStates[];
    setFireState: (index: number, newState: FireStates) => void;
};

export const useFireSimulationStore = create<FireSimulationState>((set) => ({
    fireStates: ["off", "off", "off", "off"],
    setFireState: (index, newState) =>
        set((state) => {
            const newFireStates = [...state.fireStates];
            newFireStates[index] = newState;
            return { fireStates: newFireStates };
        }),
}));