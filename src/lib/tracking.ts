/**
 * Genera un event_id único en formato UUID v4 o un fallback seguro.
 */
export function generateEventId(): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  
  // Fallback simple compatible con navegadores antiguos
  return "evt_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now();
}

/**
 * Obtiene el valor de una cookie por su nombre.
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

interface DataLayerEvent {
  event: string;
  event_id: string;
  [key: string]: any;
}

/**
 * Registra un evento en la capa de datos de Google Tag Manager (GTM).
 */
export function pushToDataLayer(eventName: string, eventId: string, extraData: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  
  const windowWithDataLayer = window as any;
  windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
  
  const payload: DataLayerEvent = {
    event: eventName,
    event_id: eventId,
    ...extraData
  };
  
  windowWithDataLayer.dataLayer.push(payload);
  console.log(`[Tracking] Evento "${eventName}" empujado a GTM dataLayer con event_id: ${eventId}`, payload);
}
