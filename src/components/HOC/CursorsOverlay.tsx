import { useLayoutEffect, useRef } from "react";
import { alpha2FromCountryId } from "../../types";

const MSG_TYPE = {
  CLIENT_CONNECTED: 0,
  CLIENT_CURSOR: 1,
  CLIENT_DISCONNECTED: 2,
  CLIENT_MISC: 3,
} as const;

type Client = { start: number; w: number; h: number };

export default function CursorsOverlay() {
  const boundingRef = useRef<Client>({ start: 0, w: 0, h: 0 });
  const cursorsOverlayRef = useRef<HTMLDivElement | null>(null);
  const cursorsMap = useRef<Map<number, HTMLDivElement>>(new Map());

  useLayoutEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL;
    if (!wsUrl) return;

    const ws = new window.WebSocket(wsUrl);
    ws.binaryType = "arraybuffer";

    ws.onopen = (_ev: Event) => {
      // console.log(ev);
    };

    ws.onmessage = (ev: MessageEvent) => {
      if (!cursorsOverlayRef.current) return;

      if (!(ev.data instanceof ArrayBuffer)) return;

      const dataView = new DataView(ev.data, 0, ev.data.byteLength);
      const msgType = dataView.getUint8(0);
      const clientId = dataView.getUint32(1, true);
      const countryCodeId = dataView.getUint8(5);

      const countryCode = alpha2FromCountryId(countryCodeId);

      if (ev.data.byteLength === 6 && msgType === MSG_TYPE.CLIENT_CONNECTED) {
        // console.log("Client connected. Client Id:", clientId);
        // console.log("Country id: ", countryCodeId);
        // console.log("Country Code:", countryCode);

        const cursorDiv = document.createElement("div");
        cursorDiv.classList.add("client_cursor_div");
        cursorsOverlayRef.current.appendChild(cursorDiv);
        cursorsMap.current.set(clientId, cursorDiv);

        // add an img tag to it
        const countryImgTag = document.createElement("img");
        countryImgTag.width = 64;
        countryImgTag.height = 48;
        countryImgTag.classList.add("cursor_country_img");
        countryImgTag.src = countryCode
          ? `https://cdn.ipwhois.io/flags/${countryCode.toLowerCase()}.svg`
          : "/assets/companies/electrode.webp";
        cursorDiv.appendChild(countryImgTag);
        return;
      }

      if (
        ev.data.byteLength === 5 &&
        msgType === MSG_TYPE.CLIENT_DISCONNECTED
      ) {
        // console.log("Client disconnected. Client Id:", clientId);

        const cursorDiv = cursorsMap.current.get(clientId);
        if (!cursorDiv) return;
        const imgTag = cursorDiv.querySelector("img.cursor_country_img");
        if (imgTag) cursorDiv.removeChild(imgTag);
        cursorsOverlayRef.current.removeChild(cursorDiv);
        cursorsMap.current.delete(clientId);

        return;
      }

      if (msgType === MSG_TYPE.CLIENT_CURSOR && ev.data.byteLength === 9) {
        const xN = dataView.getFloat16(5, true);
        const yN = dataView.getFloat16(7, true);
        // console.log(xN, yN);

        let relativeX = Math.round(xN * boundingRef.current.w);
        relativeX = relativeX + boundingRef.current.start;
        let relativeY = Math.round(yN * boundingRef.current.h);
        relativeY = relativeY - window.scrollY;

        // console.log(relativeX, relativeY);

        const cursorDiv = cursorsMap.current.get(clientId);
        if (!cursorDiv) return;
        cursorDiv.style.left = `${relativeX}px`;
        cursorDiv.style.top = `${relativeY}px`;
      }
    };

    ws.onerror = (_ev: Event) => {
      //
    };

    function handleMouseMove(ev: MouseEvent) {
      const pointerX = ev.clientX;
      let relativeX = pointerX - boundingRef.current.start;
      relativeX = Math.round(relativeX);
      relativeX = Math.max(0, Math.min(boundingRef.current.w, relativeX));
      // console.log(relativeX);

      const pointerY = ev.clientY;
      let relativeY = pointerY + window.scrollY;
      relativeY = Math.round(relativeY);
      relativeY = Math.max(0, Math.min(boundingRef.current.h, relativeY));
      // console.log(relativeY);

      const dataBuffer = new ArrayBuffer(9);
      const dataView = new DataView(dataBuffer);
      dataView.setUint8(0, MSG_TYPE.CLIENT_CURSOR);
      dataView.setUint16(1, relativeX, true);
      dataView.setUint16(3, relativeY, true);
      dataView.setUint16(5, boundingRef.current.w, true);
      dataView.setUint16(7, boundingRef.current.h, true);

      ws.send(dataBuffer);
    }

    window.addEventListener("mousemove", handleMouseMove);

    function handleResize() {
      const separatorDivs = document.querySelectorAll(".separator_pattern");
      const separatorDiv = separatorDivs[0];
      if (!separatorDiv) return;

      const separatorRect = separatorDiv.getBoundingClientRect();
      const separatorLeft = Math.round(separatorRect.left);
      const width = Math.ceil(separatorRect.width);
      const height = Math.ceil(document.body.clientHeight);
      boundingRef.current = { start: separatorLeft, w: width, h: height };
      // console.log(
      //   "Start: " + separatorLeft,
      //   "Width: " + width,
      //   "Height: " + height,
      // );
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  return (
    <div
      ref={cursorsOverlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
