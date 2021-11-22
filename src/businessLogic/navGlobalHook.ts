import { useMemo, useRef, useState, MutableRefObject } from "react";
import { Vector3 } from "three";

import { createGlobalHook } from "../util/createGlobalHook";

interface NavGlobalHookReturn {
  focusVectorRef: MutableRefObject<Vector3>;
  setFocusEntityId: (entityId: string) => void;
  focusEntityId: string | undefined;
}

function navGlobalHookFunc(): NavGlobalHookReturn {
  const [focusEntityId, setFocusEntityId] = useState<string | undefined>("p3");
  const focusVectorRef = useRef<Vector3>(new Vector3(0, 0, 0));

  return useMemo(
    () => ({
      focusEntityId,
      setFocusEntityId,
      focusVectorRef,
    }),
    [focusEntityId]
  );
}

const navGlobalHook = createGlobalHook(navGlobalHookFunc);

export const NavContext = navGlobalHook.Context;
export const NavProvider = navGlobalHook.Provider;
export const useNav = navGlobalHook.useGlobal;
