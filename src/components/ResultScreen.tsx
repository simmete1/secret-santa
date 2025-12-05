import { PartyPopper, RotateCcw, CheckCircle } from 'lucide-react';

interface ResultScreenProps {
  name: string;
  onConfirm: () => void;
  onRetry: () => void;
}

export function ResultScreen({ name, onConfirm, onRetry }: ResultScreenProps) {
  return (
    <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-6 sm:p-8 border-4 border-amber-500 relative overflow-hidden mx-4 sm:mx-0">
      {/* Christmas decorations on card */}
      <div className="absolute top-2 left-2 text-2xl animate-pulse">🎄</div>
      <div className="absolute top-2 right-2 text-2xl animate-pulse">🎄</div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-3xl animate-bounce">⭐</div>
      <div className="absolute top-10 left-10 text-xl">🎅</div>
      <div className="absolute top-10 right-10 text-xl">🦌</div>
      
      <div className="text-center space-y-6 relative z-10">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-200 to-red-200 rounded-full flex items-center justify-center animate-bounce border-4 border-amber-400 shadow-lg">
          <PartyPopper className="w-16 h-16 text-amber-600" />
        </div>

        <div>
          <h2 className="mb-3">Il tuo capitato è...</h2>
          <div className="bg-gradient-to-r from-red-100 to-green-100 border-4 border-red-400 rounded-lg p-6 mb-4 shadow-inner relative">
            <div className="absolute -top-2 -left-2 text-2xl">🎁</div>
            <div className="absolute -top-2 -right-2 text-2xl">🎁</div>
            <p className="text-red-700">{name}</p>
          </div>
          <p className="text-gray-600 text-sm">
            💰 Budget massimo: 10€
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" />
            ✅ Conferma (nome diverso dal mio)
          </button>

          <button
            onClick={onRetry}
            className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-3 shadow-lg transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            🎲 È uscito il tuo nome? Ritenta la sorte
          </button>
        </div>

        <div className="pt-4 border-t border-green-200">
          <p className="text-sm text-gray-600">
            ⚠️ Dopo aver confermato, questo nome non sarà più disponibile per gli altri!
          </p>
        </div>
      </div>
    </div>
  );
}