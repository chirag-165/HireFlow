export default function Modal({ title, open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm" onClick={onClose} aria-label="Close modal" />
      <div
        className="glass-card relative w-full max-w-[560px] p-6"
        role="dialog"
        aria-modal="true"
        style={{ animation: "modal-enter 200ms ease-out" }}
      >
        {title ? <h3 className="mb-4 text-lg font-semibold">{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}
