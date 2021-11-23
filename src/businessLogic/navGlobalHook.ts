import { useMemo, useRef, useState, MutableRefObject } from "react";
import { Vector3 } from "three";

import { Entity } from "../entities/entityTypes";
import { createGlobalHook } from "../util/createGlobalHook";

interface NavGlobalHookReturn {
  focusVectorRef: MutableRefObject<Vector3>;
  setFocusEntity: (entity: Entity) => void;
  focusEntity: Entity | undefined;
}

function navGlobalHookFunc(): NavGlobalHookReturn {
  const [focusEntity, setFocusEntity] = useState<Entity | undefined>(undefined);
  const focusVectorRef = useRef<Vector3>(new Vector3(0, 0, 0));

  return useMemo(
    () => ({
      focusEntity,
      setFocusEntity,
      focusVectorRef,
    }),
    [focusEntity]
  );
}

const navGlobalHook = createGlobalHook(navGlobalHookFunc);

export const NavContext = navGlobalHook.Context;
export const NavProvider = navGlobalHook.Provider;
export const useNav = navGlobalHook.useGlobal;
