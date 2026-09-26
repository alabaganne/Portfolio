"use client";

import { useEffect, useRef } from "react";

import { ProjectCard } from "@/components/home/project-card";

const SPEED = 0.03; // px per ms
const WAIT_AFTER_TOUCH = 1500; // ms before the row moves again

// A row of project cards that drifts on its own, stops on hover or focus, and can be dragged or swiped.
export function ProjectMarquee({ projects, reverse = false }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    const copies = row.querySelectorAll("[data-copy]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let span = 0;
    let pos = 0;
    let last = 0;
    let frame = 0;
    let waitUntil = 0;
    let hovered = false;
    let focused = false;
    let touching = false;
    let drag = null;
    let blockClick = false;

    const measure = () => {
      const next = copies[1].getBoundingClientRect().left - copies[0].getBoundingClientRect().left;
      pos = span ? (pos / span) * next : next;
      span = next;
      row.scrollLeft = pos;
    };

    const tick = (time) => {
      const step = last ? Math.min(time - last, 50) : 0;
      last = time;
      // the user moved the row (swipe, trackpad, keyboard focus): follow it and wait a moment
      if (Math.abs(row.scrollLeft - pos) > 1.5) {
        pos = row.scrollLeft;
        waitUntil = time + WAIT_AFTER_TOUCH;
      }
      let moved = false;
      if (!hovered && !focused && !touching && !drag && !reducedMotion.matches && time > waitUntil) {
        pos += (reverse ? -SPEED : SPEED) * step;
        moved = true;
      }
      // stay on the middle copy by jumping one copy width, which looks the same
      if (pos < span / 2 || pos > span * 1.5) {
        const shift = pos < span / 2 ? span : -span;
        pos += shift;
        if (drag) drag.left += shift;
        moved = true;
      }
      if (moved) row.scrollLeft = pos;
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerEnter = (event) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const onPointerLeave = (event) => {
      if (event.pointerType === "mouse") hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = (event) => {
      focused = row.contains(event.relatedTarget);
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      waitUntil = performance.now() + WAIT_AFTER_TOUCH;
    };
    const onPointerDown = (event) => {
      blockClick = false;
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      drag = { x: event.clientX, left: row.scrollLeft, id: event.pointerId, moved: false };
    };
    const onPointerMove = (event) => {
      if (!drag) return;
      const dx = event.clientX - drag.x;
      if (!drag.moved) {
        if (Math.abs(dx) < 5) return;
        drag.moved = true;
        row.setPointerCapture(drag.id);
        row.dataset.dragging = "";
      }
      row.scrollLeft = drag.left - dx;
    };
    const onPointerUp = () => {
      if (drag?.moved) {
        blockClick = true;
        delete row.dataset.dragging;
      }
      drag = null;
    };
    // a drag ends with a click on the card under the pointer; don't follow that link
    const onClick = (event) => {
      if (!blockClick) return;
      event.preventDefault();
      event.stopPropagation();
      blockClick = false;
    };
    const onDragStart = (event) => event.preventDefault();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(row.firstElementChild);
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(row);

    row.addEventListener("pointerenter", onPointerEnter);
    row.addEventListener("pointerleave", onPointerLeave);
    row.addEventListener("focusin", onFocusIn);
    row.addEventListener("focusout", onFocusOut);
    row.addEventListener("touchstart", onTouchStart, { passive: true });
    row.addEventListener("touchend", onTouchEnd);
    row.addEventListener("touchcancel", onTouchEnd);
    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", onPointerUp);
    row.addEventListener("pointercancel", onPointerUp);
    row.addEventListener("click", onClick, true);
    row.addEventListener("dragstart", onDragStart);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      row.removeEventListener("pointerenter", onPointerEnter);
      row.removeEventListener("pointerleave", onPointerLeave);
      row.removeEventListener("focusin", onFocusIn);
      row.removeEventListener("focusout", onFocusOut);
      row.removeEventListener("touchstart", onTouchStart);
      row.removeEventListener("touchend", onTouchEnd);
      row.removeEventListener("touchcancel", onTouchEnd);
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", onPointerUp);
      row.removeEventListener("pointercancel", onPointerUp);
      row.removeEventListener("click", onClick, true);
      row.removeEventListener("dragstart", onDragStart);
    };
  }, [reverse]);

  return (
    <div
      ref={rowRef}
      className="cursor-grab select-none overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [scrollbar-width:none] data-[dragging]:cursor-grabbing [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex w-max items-start gap-4 py-2 md:gap-10">
        {/* three copies so the row loops without a gap; only the middle one is focusable */}
        {[0, 1, 2].map((copy) => (
          <div key={copy} data-copy={copy} aria-hidden={copy === 1 ? undefined : true} className="flex items-start gap-4 md:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} hidden={copy !== 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
