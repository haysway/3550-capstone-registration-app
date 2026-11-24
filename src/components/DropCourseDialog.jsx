export default function DropCourseDialog({ dialogRef, course, error, isDropping, onConfirm, onCancel }) {
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="drop-title"
      onCancel={(event) => {
        if (isDropping) event.preventDefault()
      }
      }>
      <h2 id="drop-title">Drop this course?</h2>
      <p><strong>{course?.title}</strong> will be removed from your registered courses.</p>
      {error && <p role="alert" className="error-message">{error}</p>}
      <div className="dialog-actions">
        <button className="button" disabled={isDropping} onClick={onCancel}>
          Keep course
          <span className="sr-only">: {course?.title}</span>
        </button>
        <button className="button danger-button" disabled={isDropping} onClick={onConfirm}>
          {isDropping ? 'Dropping…' : 'Drop course'}
        </button>
      </div>
    </dialog>
  )
}
