import React ,{MutableRefObject} from "react";

export  type BasicTarget <T = HTMLElement > =( ()=>(T|null)) |null | undefined |MutableRefObject<T | null | undefined>;
type TargetElement = HTMLElement | Element| Document | Window
export function getTargetElement(target:BasicTarget<TargetElement>, defaultElement?:TargetElement):TargetElement | undefined | null {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetElement | undefined | null;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
