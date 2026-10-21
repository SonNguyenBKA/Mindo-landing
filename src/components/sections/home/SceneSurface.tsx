"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const PhoneScene = dynamic(() => import("./PhoneScene"), { ssr: false });
const MEDIA =
  "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(MEDIA);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type Props = {
  children: ReactNode;
  className: string;
  variant: "hero" | "story";
  index?: number;
  onSelect?: (index: number) => void;
};
export function SceneSurface(props: Props) {
  const eligible = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MEDIA).matches,
    () => false,
  );
  return (
    <SceneContent
      key={eligible ? "three" : "poster"}
      {...props}
      eligible={eligible}
    />
  );
}

function SceneContent({
  eligible,
  children,
  className,
  variant,
  index = 0,
  onSelect,
}: Props & { eligible: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setReady(false);
    setFailed(true);
  }, []);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const enhanced = eligible && ready && !failed;
  return (
    <div
      ref={host}
      className={`${className} scene-surface ${enhanced ? "scene-ready" : ""}`}
      data-renderer={enhanced ? "three" : "image"}
      data-selected={index}
      data-visible={visible}
    >
      {children}
      {eligible && !failed && (visible || ready) ? (
        <div className="scene-canvas" aria-hidden="true">
          <SceneBoundary onFailure={onFailure}>
            <PhoneScene
              active={visible}
              onReady={onReady}
              onFailure={onFailure}
              variant={variant}
              index={index}
              onSelect={onSelect}
            />
          </SceneBoundary>
        </div>
      ) : null}
    </div>
  );
}
