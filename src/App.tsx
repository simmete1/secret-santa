import { useState, useEffect } from 'react';
import { DrawScreen } from './components/DrawScreen';
import { ResultScreen } from './components/ResultScreen';
import { SnowFall } from './components/SnowFall';
import { Gift } from 'lucide-react';
import { supabase } from './lib/supabase';

const INITIAL_NAMES = ['Giulia', 'Samu', 'Chiara', 'Matheo', 'Simo', 'Edo', 'Popo', 'Ale', 'Ilaria', 'Cristina', 'Silvia'];

export default function App() {
  const [availableNames, setAvailableNames] = useState<string[]>([]);
  const [drawnName, setDrawnName] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load available names from Supabase
  useEffect(() => {
    loadAvailableNames();
  }, []);

  const loadAvailableNames = async () => {
    try {
      const { data, error } = await supabase
        .from('available_names')
        .select('name')
        .order('id');

      if (error) throw error;

      const names = data.map(item => item.name);
      setAvailableNames(names);
    } catch (error) {
      console.error('Error loading names:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDraw = () => {
    if (availableNames.length === 0) return;

    setIsDrawing(true);
    
    // Simulate drawing animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      const selected = availableNames[randomIndex];
      setDrawnName(selected);
      setIsDrawing(false);
    }, 1000);
  };

  const handleConfirm = async () => {
    if (!drawnName) return;

    try {
      // Remove the drawn name from Supabase
      const { error } = await supabase
        .from('available_names')
        .delete()
        .eq('name', drawnName);

      if (error) throw error;

      // Update local state
      const updated = availableNames.filter(name => name !== drawnName);
      setAvailableNames(updated);
      setDrawnName(null);
    } catch (error) {
      console.error('Error confirming draw:', error);
      alert('Errore nel confermare l\'estrazione. Riprova!');
    }
  };

  const handleRetry = () => {
    // Allow retry without removing the name
    setDrawnName(null);
  };

  const handleReset = async () => {
    // Reset all names (for admin/testing purposes)
    try {
      // Delete all existing names
      await supabase.from('available_names').delete().neq('id', 0);

      // Insert all initial names
      const namesToInsert = INITIAL_NAMES.map(name => ({ name }));
      const { error } = await supabase
        .from('available_names')
        .insert(namesToInsert);

      if (error) throw error;

      // Reload names
      await loadAvailableNames();
      setDrawnName(null);
    } catch (error) {
      console.error('Error resetting names:', error);
      alert('Errore nel reset. Riprova!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-950 to-red-900 flex items-center justify-center">
        <div className="text-amber-100 text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-950 to-red-900 relative overflow-hidden">
      <SnowFall />
      
      {/* Christmas decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-900/30 to-transparent pointer-events-none" />
      <div className="absolute top-4 left-4 sm:left-8 text-4xl animate-pulse">🎄</div>
      <div className="absolute top-8 right-4 sm:right-8 text-3xl animate-bounce">⭐</div>
      <div className="absolute top-20 left-1/4 text-2xl animate-pulse">🎅</div>
      <div className="absolute top-16 right-1/4 text-2xl animate-bounce">🎁</div>
      <div className="absolute bottom-20 left-4 sm:left-8 text-3xl animate-pulse">🔔</div>
      <div className="absolute bottom-32 right-4 sm:right-12 text-2xl animate-bounce">🦌</div>
      
      <div className="container mx-auto px-6 py-12 max-w-2xl relative z-10">
        <div className="text-center mb-8 px-4">
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <span className="text-5xl animate-bounce">🎅</span>
            <h1 className="text-amber-100 drop-shadow-lg px-2" style={{ fontFamily: "'Mountains of Christmas', cursive", fontSize: '3.5rem' }}>Secret Santa</h1>
            <span className="text-5xl animate-bounce">🎄</span>
          </div>
          <p className="text-amber-200 drop-shadow px-4">
            Sorteggia il tuo capitato! Budget massimo: 10€
          </p>
        </div>

        {drawnName ? (
          <ResultScreen 
            name={drawnName}
            onConfirm={handleConfirm}
            onRetry={handleRetry}
          />
        ) : (
          <DrawScreen 
            onDraw={handleDraw}
            isDrawing={isDrawing}
            remainingCount={availableNames.length}
          />
        )}

        {/* Admin reset button (hidden in top right) */}
        <button
          onClick={handleReset}
          className="fixed top-4 right-4 px-3 py-1 text-xs text-amber-200 hover:text-white opacity-20 hover:opacity-100 transition-opacity z-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}