// external events
const FINALIZE_EVENT_NAME = 'finalize';
const CONSIDER_EVENT_NAME = 'consider';

export function dispatchFinalizeEvent(el, items) {
    el.dispatchEvent(new CustomEvent(FINALIZE_EVENT_NAME, {
        detail: {items}
    }));
}

export function dispatchConsiderEvent(el, items) {
    el.dispatchEvent(new CustomEvent(CONSIDER_EVENT_NAME, {
        detail: {items}
    }));
}

// internal events
export const DRAGGED_ENTERED_EVENT_NAME = 'draggedentered';
export const DRAGGED_LEFT_EVENT_NAME = 'draggedleft';
export const DRAGGED_OVER_INDEX_EVENT_NAME = 'draggedoverindex';
export const DRAGGED_LEFT_DOCUMENT_EVENT_NAME = 'draggedleftdocument';
export function dispatchDraggedElementEnteredContainer(containerEl, indexObj, draggedEl) {
    containerEl.dispatchEvent(new CustomEvent(DRAGGED_ENTERED_EVENT_NAME, {
        detail: {indexObj, draggedEl}
    }));
}
export function dispatchDraggedElementLeftContainer(containerEl, draggedEl) {
    containerEl.dispatchEvent(new CustomEvent(DRAGGED_LEFT_EVENT_NAME, {
        detail: {draggedEl}
    }));
}
export function dispatchDraggedElementIsOverIndex(containerEl, indexObj, draggedEl) {
    containerEl.dispatchEvent(new CustomEvent(DRAGGED_OVER_INDEX_EVENT_NAME, {
        detail: {indexObj, draggedEl}
    }));
}
export function dispatchDraggedLeftDocument(draggedEl) {
    window.dispatchEvent(new CustomEvent(DRAGGED_LEFT_DOCUMENT_EVENT_NAME, {
        detail: { draggedEl}
    }));
}
