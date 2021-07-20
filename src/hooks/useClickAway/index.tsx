import { useRef, useEffect } from 'react';
import { getTargetElement ,BasicTarget} from '../util/dom';
const defaultEvent = 'click';
type EventType = MouseEvent | TouchEvent;
export default function useClickAway(
  target:BasicTarget,
  onClickAway:(event: EventType) => void,
  eventName = defaultEvent
) {
  const onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;
  useEffect(() => {
    const targets = Array.isArray(target) ? target : [target];
    const handler = function (event:any) {
      if (
        !targets.some((el) => {
          const els = getTargetElement(el) as HTMLElement;
          return els?.contains(event.target);
        })
      ) {
        return onClickAwayRef.current && onClickAwayRef.current(event);
      }
    };
    document.addEventListener(eventName, handler);
    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [target, eventName]);
}
