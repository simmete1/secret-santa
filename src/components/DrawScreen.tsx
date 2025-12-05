import { Sparkles } from 'lucide-react';

interface DrawScreenProps {
  onDraw: () => void;
  isDrawing: boolean;
  remainingCount: number;
}

export function DrawScreen({ onDraw, isDrawing, remainingCount }: DrawScreenProps) {
  return (
    <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-6 sm:p-8 border-4 border-amber-500 relative overflow-hidden mx-4 sm:mx-0">
      {/* Christmas decorations on card */}
      <div className="absolute top-2 left-2 text-2xl">🎄</div>
      <div className="absolute top-2 right-2 text-2xl">🎄</div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-3xl">⭐</div>
      
      <div className="text-center space-y-6 relative z-10">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-200 to-green-200 rounded-full flex items-center justify-center border-4 border-red-400 shadow-lg">
          <Sparkles className={`w-16 h-16 text-red-600 ${isDrawing ? 'animate-spin' : ''}`} />
        </div>

        <div>
          <h2 className="mb-2">
            {isDrawing ? 'Sorteggio in corso...' : 'Clicca per scoprire'}
          </h2>
          <p className="text-gray-600">
            {remainingCount > 0 
              ? `${remainingCount} ${remainingCount === 1 ? 'nome rimasto' : 'nomi rimasti'}`
              : 'Tutti i nomi sono stati sorteggiati!'}
          </p>
        </div>

        <button
          onClick={onDraw}
          disabled={isDrawing || remainingCount === 0}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-lg hover:from-red-700 hover:to-amber-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
        >
          {isDrawing ? 'Sorteggiando... 🎅' : '🎁 Sorteggia il Tuo capitato 🎁'}
        </button>

        <div className="pt-4 border-t border-amber-200">
          <p className="text-sm text-gray-600">
            💡 Ricorda: se esce il tuo nome, potrai riprovare!
          </p>
        </div>
      </div>
    </div>
  );
}