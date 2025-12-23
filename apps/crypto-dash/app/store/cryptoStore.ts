import { create } from 'zustand';

interface CryptoStore {
    prices: Record<string, string>;
    isConnected: boolean;
    connect: () => void;
    disconnect: () => void;
    socket: WebSocket | null;
}

export const useCryptoStore = create<CryptoStore>((set, get) => ({
    prices: {},
    isConnected: false,
    socket: null,
    connect: () => {
        if (get().isConnected) return;

        const assets = "bitcoin,ethereum,solana,cardano,ripple,polkadot,dogecoin,litecoin,chainlink,stellar";
        const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets}`);

        ws.onopen = () => {
            set({ isConnected: true, socket: ws });
        };

        ws.onmessage = (event) => {
            const update = JSON.parse(event.data);
            // update is like { bitcoin: "65432.10" }
            set((state) => ({
                prices: { ...state.prices, ...update }
            }));
        };

        ws.onclose = () => {
            set({ isConnected: false, socket: null });
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
        };
    },
    disconnect: () => {
        const { socket } = get();
        if (socket) {
            socket.close();
        }
        set({ isConnected: false, socket: null });
    }
}));
