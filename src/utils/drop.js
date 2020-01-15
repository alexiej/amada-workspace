/*
 * Initiates the drag events from outside to electron app
*/
export function initDragIn (onDragOver, onDrop, onDragLeave) {
  window.ondragover = function (e) {
    e.preventDefault()
    if (onDragOver !== this.undefined) onDragOver()
    e.dataTransfer.dropEffect = 'copy'
    return false
  }

  window.ondrop = function (e) {
    e.preventDefault()
    onDrop(e.dataTransfer.files)
    return false
  }

  window.ondragleave = function (e) {
    e.preventDefault()
    if (onDragLeave !== this.undefined) onDragLeave()
    return false
  }
}
