"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/Button";
import { AGENCY_SUBJECT } from "@/lib/contact-schema";

/**
 * Lối mở đại lý Mindo Peer (21/10/2026). Trang đại lý chỉ dành cho đại lý, nên người
 * muốn làm đại lý bắt đầu từ đây: mục "Đại lý" trên header và nút trong section
 * Mindo Peer cùng mở một popup gọn: tiêu đề và ba ô nhập. (Nút nổi ở đáy đã bỏ theo
 * ý chủ dự án 21/10/2026.)
 */

const OPEN_EVENT = "mindo:open-agency";

export function openAgency() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Nút mở popup đại lý, đặt ở bất kỳ đâu (header, section Peer…) */
export function OpenAgencyButton({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={openAgency} aria-haspopup="dialog">
      {children}
    </button>
  );
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; message: string } | { kind: "error"; message: string };

/** Popup đại lý, gắn một lần ở layout */
export function AgencyLauncher() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    const panel = dialog.current;
    if (!panel) return;
    if (open && !panel.open) panel.showModal();
    if (!open && panel.open) panel.close();
    document.body.dataset.scrollLocked = String(open);
    return () => {
      document.body.dataset.scrollLocked = "false";
    };
  }, [open]);

  return (
    <>
      <dialog
        ref={dialog}
        className="agency-sheet"
        aria-labelledby="agency-sheet-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="agency-sheet-body">
          <button type="button" className="agency-sheet-close" onClick={() => setOpen(false)} aria-label="Đóng">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>

          <p className="section-label">Đại lý Mindo Peer</p>
          <h2 id="agency-sheet-title">Mở đại lý Mindo Peer</h2>
          <p className="agency-sheet-lead">Để lại thông tin, Mindo sẽ gọi lại tư vấn trong 24 giờ làm việc.</p>

          {open && <AgencyForm />}
        </div>
      </dialog>
    </>
  );
}

function AgencyForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  if (status.kind === "done") {
    return (
      <div className="agency-done" role="status">
        <b>Đã nhận thông tin của bạn.</b>
        <p>{status.message}</p>
      </div>
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    if (name.length < 2 || !/^[0-9+ .]{9,15}$/.test(phone) || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ kind: "error", message: "Vui lòng nhập đủ họ tên, số điện thoại và email hợp lệ." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: AGENCY_SUBJECT,
          phone,
          message: note ? `Đăng ký mở đại lý Mindo Peer.\n${note}` : "Đăng ký mở đại lý Mindo Peer.",
          consent: true,
        }),
      });
      const payload = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !payload.ok) throw new Error(payload.message);
      setStatus({ kind: "done", message: "Đội ngũ Mindo sẽ gọi lại cho bạn trong 24 giờ làm việc để tư vấn và báo giá gói đại lý." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error && error.message ? error.message : "Chưa gửi được. Vui lòng thử lại sau ít phút." });
    }
  }

  return (
    <form className="agency-form" onSubmit={submit} noValidate>
      <div className="agency-form-fields">
        <label htmlFor={`${uid}-name`}>
          <span>Họ và tên</span>
          <input id={`${uid}-name`} name="name" autoComplete="name" placeholder="Nguyễn Văn A" required />
        </label>
        <label htmlFor={`${uid}-phone`}>
          <span>Số điện thoại / Zalo</span>
          <input id={`${uid}-phone`} name="phone" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" required />
        </label>
        <label htmlFor={`${uid}-email`}>
          <span>Email</span>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder="ban@email.com" required />
        </label>
        <label htmlFor={`${uid}-note`}>
          <span>Nội dung</span>
          <textarea id={`${uid}-note`} name="note" rows={3} maxLength={1000} placeholder="Khu vực của bạn, số lượng Peer dự kiến, câu hỏi cho Mindo…" />
        </label>
      </div>
      {status.kind === "error" && <p className="agency-error" role="alert">{status.message}</p>}
      <button type="submit" className="agency-submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Đang gửi…" : "Gửi đăng ký tư vấn"}
        <ArrowRightIcon />
      </button>
    </form>
  );
}
