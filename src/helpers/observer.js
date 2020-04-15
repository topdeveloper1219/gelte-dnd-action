import {findWouldBeIndex} from './listUtil';
import {dispatchDraggedElementEnteredContainer, 
        dispatchDraggedElementLeftContainer, 
        dispatchDraggedElementIsOverIndex} 
    from './dispatcher';

const INTERVAL_MS = 100;
let next;

/**
 * 
 * @param {Set<HTMLElement>} dropZones 
 * @param {HTMLElement} draggedEl 
 * @param {number} [intervalMs = INTERVAL_MS]
 */
export function observe(draggedEl, dropZones, intervalMs = INTERVAL_MS) {
    let lastDropZoneFound;
    let lastIndexFound;
    let lastIsDraggedInADropZone = false;
    function andNow() {
        // this is a simple algorithm, potential improvement: first look at lastDropZoneFound
        let isDraggedInADropZone = false
        for (const dz of dropZones) {
            const wouldBeIndex = findWouldBeIndex(draggedEl, dz); 
            if (wouldBeIndex === null) {
               // it is not inside 
               continue;     
            }
            isDraggedInADropZone = true;
            // the element is over a container
            if (dz !== lastDropZoneFound) {
                lastDropZoneFound && dispatchDraggedElementLeftContainer(lastDropZoneFound, draggedEl);
                dispatchDraggedElementEnteredContainer(dz, wouldBeIndex, draggedEl);
                lastDropZoneFound = dz;
                lastIndexFound = wouldBeIndex;
            }
            else if (wouldBeIndex !== lastIndexFound) {
                dispatchDraggedElementIsOverIndex(dz, wouldBeIndex, draggedEl);
                lastIndexFound = wouldBeIndex;
            }
            // we handle looping with the 'continue' statement above
            break;
        }
        // the first time the dragged element is not in any dropzone we need to notify the last dropzone it was in
        if (!isDraggedInADropZone && lastIsDraggedInADropZone && lastDropZoneFound) {
            dispatchDraggedElementLeftContainer(lastDropZoneFound, draggedEl);
            lastDropZoneFound = undefined;
            lastIndexFound = undefined;
            lastIsDraggedInADropZone = false;
        } else {
            lastIsDraggedInADropZone = true;
        }
        next = window.setTimeout(andNow, intervalMs);
    }
    andNow();
}

// assumption - we can only observe one dragged element at a time, this could be changed in the future
export function unobserve() {
    clearTimeout(next);
}