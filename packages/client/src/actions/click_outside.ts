/**
 * Detects clicks outside even for web components with their tricky shadow DOMs
 * @param el
 * @param onClickOutside
 * @returns
 */
export function click_outside(el: HTMLElement, onClickOutside: () => void) {
  const onClick = (event: MouseEvent) => {
    el && !event.composedPath().includes(el) && !event.defaultPrevented && onClickOutside()
  }

  document.addEventListener('click', onClick, true)

  return {
    destroy() {
      document.removeEventListener('click', onClick, true)
    }
  }
}
