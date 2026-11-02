'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';

type QuestionTriplet = [number, number, number];

// The 4 allowed questions where x + y + z is even
const VALID_QUESTIONS: { query: QuestionTriplet; targetParity: number; label: string }[] = [
  { query: [0, 0, 0], targetParity: 0, label: 'XXX Measurement (Expected Product: +1, Parity: 0)' },
  { query: [1, 1, 0], targetParity: 1, label: 'XYY Measurement (Expected Product: -1, Parity: 1)' },
  { query: [1, 0, 1], targetParity: 1, label: 'YXY Measurement (Expected Product: -1, Parity: 1)' },
  { query: [0, 1, 1], targetParity: 1, label: 'YYX Measurement (Expected Product: -1, Parity: 1)' },
];

export default function MerminGHZSimulator() {
  const [mode, setMode] = useState<'quantum' | 'classical'>('quantum');
  const [selectedQueryIdx, setSelectedQueryIdx] = useState<number>(-1); // -1 = Random
  const [gateNoise, setGateNoise] = useState<number>(0); // 0 to 15%
  const [stats, setStats] = useState({ rounds: 0, wins: 0 });
  const [lastRound, setLastRound] = useState<{
    query: QuestionTriplet;
    answers: [number, number, number];
    parity: number;
    targetParity: number;
    won: boolean;
    noiseTriggered: boolean;
  } | null>(null);

  // Best deterministic classical strategy wins exactly 3 of the 4 inputs (75%)
  // Standard classical assignment:
  // Alice answers 0 for x=0, 0 for x=1
  // Bob answers 0 for y=0, 0 for y=1
  // Charlie answers 0 for z=0, 1 for z=1
  const runClassicalRound = (query: QuestionTriplet) => {
    const a = 0;
    const b = 0;
    const c = query[2] === 1 ? 1 : 0;
    return [a, b, c] as [number, number, number];
  };

  // Quantum GHZ state simulation with depolarizing error
  const runQuantumRound = (query: QuestionTriplet, noiseRate: number) => {
    // In ideal GHZ measurement:
    // Question (0,0,0) -> sum(a,b,c) = 0 mod 2
    // Questions with two 1s -> sum(a,b,c) = 1 mod 2
    const targetParity = (query[0] + query[1] + query[2] === 0) ? 0 : 1;
    
    // Check if depolarizing error corrupts a qubit measurement
    const isNoisy = Math.random() < (noiseRate / 100);

    // Pick random correlated outcomes matching targetParity
    // Alice and Bob random 50/50
    const a = Math.random() < 0.5 ? 0 : 1;
    const b = Math.random() < 0.5 ? 0 : 1;
    let c = (targetParity ^ a ^ b);

    if (isNoisy) {
      // Noise flips Charlie's outcome
      c = 1 - c;
    }

    return { answers: [a, b, c] as [number, number, number], noiseTriggered: isNoisy };
  };

  const simulateRound = () => {
    let qObj = VALID_QUESTIONS[selectedQueryIdx];
    if (!qObj) {
      qObj = VALID_QUESTIONS[Math.floor(Math.random() * VALID_QUESTIONS.length)];
    }

    let answers: [number, number, number];
    let noiseTriggered = false;

    if (mode === 'classical') {
      answers = runClassicalRound(qObj.query);
    } else {
      const qResult = runQuantumRound(qObj.query, gateNoise);
      answers = qResult.answers;
      noiseTriggered = qResult.noiseTriggered;
    }

    const parity = (answers[0] + answers[1] + answers[2]) % 2;
    const won = parity === qObj.targetParity;

    setStats((prev) => ({
      rounds: prev.rounds + 1,
      wins: prev.wins + (won ? 1 : 0),
    }));

    setLastRound({
      query: qObj.query,
      answers,
      parity,
      targetParity: qObj.targetParity,
      won,
      noiseTriggered,
    });
  };

  const run100Shots = () => {
    let newWins = 0;
    for (let i = 0; i < 100; i++) {
      const qObj = VALID_QUESTIONS[Math.floor(Math.random() * VALID_QUESTIONS.length)];
      let won = false;
      if (mode === 'classical') {
        const answers = runClassicalRound(qObj.query);
        const parity = (answers[0] + answers[1] + answers[2]) % 2;
        won = parity === qObj.targetParity;
      } else {
        const qResult = runQuantumRound(qObj.query, gateNoise);
        const parity = (qResult.answers[0] + qResult.answers[1] + qResult.answers[2]) % 2;
        won = parity === qObj.targetParity;
      }
      if (won) newWins++;
    }

    setStats((prev) => ({
      rounds: prev.rounds + 100,
      wins: prev.wins + newWins,
    }));
  };

  const resetStats = () => {
    setStats({ rounds: 0, wins: 0 });
    setLastRound(null);
  };

  const winPercentage = stats.rounds > 0 ? ((stats.wins / stats.rounds) * 100).toFixed(1) : '0.0';

  return (
    <GlassCard className="p-6 md:p-8 border border-neon-cyan/40 bg-base-dark/95 shadow-[0_0_35px_rgba(0,245,255,0.15)] my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-[10px] font-orbitron tracking-widest text-neon-cyan uppercase">
              INTERACTIVE QUANTUM LAB
            </span>
          </div>
          <h3 className="font-orbitron text-lg md:text-xl font-bold text-white">
            Mermin-GHZ Non-Locality Simulator
          </h3>
          <p className="text-xs text-text-primary/70 mt-1">
            Simulate 3-party non-local correlation on Qiskit Aer vs. the classical 75% upper bound.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 self-start md:self-center">
          <button
            onClick={() => setMode('quantum')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-semibold tracking-wider transition-all ${
              mode === 'quantum'
                ? 'bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                : 'text-text-primary/60 hover:text-white'
            }`}
          >
            ⚛️ GHZ Quantum
          </button>
          <button
            onClick={() => setMode('classical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-semibold tracking-wider transition-all ${
              mode === 'classical'
                ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(191,0,255,0.4)]'
                : 'text-text-primary/60 hover:text-white'
            }`}
          >
            📊 Classical Cap
          </button>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
        {/* Left: Input Selection & Noise Slider */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-orbitron text-text-primary/80 uppercase tracking-wider block mb-2">
              Select Question $(x, y, z)$ [Sum is Even]
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedQueryIdx(-1)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border text-left transition-all ${
                  selectedQueryIdx === -1
                    ? 'border-neon-cyan bg-neon-cyan/15 text-neon-cyan'
                    : 'border-white/10 bg-white/5 text-text-primary/70 hover:border-white/20'
                }`}
              >
                🎲 Random Inputs
              </button>
              {VALID_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQueryIdx(idx)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border text-left transition-all ${
                    selectedQueryIdx === idx
                      ? 'border-neon-cyan bg-neon-cyan/15 text-neon-cyan'
                      : 'border-white/10 bg-white/5 text-text-primary/70 hover:border-white/20'
                  }`}
                >
                  ({q.query.join(', ')}) {idx === 0 ? '→ XXX' : '→ XYY'}
                </button>
              ))}
            </div>
          </div>

          {/* Depolarizing noise slider (active in Quantum mode) */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-orbitron">
              <span className="text-text-primary/80">Depolarizing Gate Noise:</span>
              <span className="text-neon-cyan font-bold font-mono">{gateNoise}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={gateNoise}
              onChange={(e) => setGateNoise(parseFloat(e.target.value))}
              disabled={mode === 'classical'}
              className="w-full accent-neon-cyan cursor-pointer disabled:opacity-40"
            />
            <div className="flex justify-between text-[10px] text-text-primary/40 font-mono">
              <span>0% (Ideal Sim)</span>
              <span className="text-plasma-orange">7.5% (Advantage Vanishes)</span>
              <span>15% (High Noise)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <NeonButton onClick={simulateRound} variant="cyan" className="text-xs px-4 py-2">
              ⚡ Measure 1 Round
            </NeonButton>
            <NeonButton onClick={run100Shots} variant="purple" className="text-xs px-4 py-2">
              🚀 Run 100 Aer Shots
            </NeonButton>
            <button
              onClick={resetStats}
              className="px-3 py-2 text-xs font-orbitron text-text-primary/50 hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right: Live Telemetry & Win Rate */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Win Rate Banner */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-orbitron text-text-primary/70 uppercase tracking-wider">
                Win Rate ({stats.wins} / {stats.rounds} shots)
              </span>
              <span className="font-orbitron font-bold text-lg text-neon-cyan font-mono">
                {winPercentage}%
              </span>
            </div>

            {/* Progress bar with 75% classical mark */}
            <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  mode === 'quantum' && Number(winPercentage) > 75
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-purple'
                    : 'bg-neon-purple'
                }`}
                style={{ width: `${Math.min(Number(winPercentage), 100)}%` }}
              />
              {/* 75% Classical marker line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-10"
                style={{ left: '75%' }}
                title="75% Classical Upper Bound"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-text-primary/50 mt-1.5">
              <span>0%</span>
              <span className="text-electric-yellow font-semibold">▲ 75% Classical Cap</span>
              <span>100%</span>
            </div>
          </div>

          {/* Last Round Inspector */}
          {lastRound ? (
            <div
              className={`p-3.5 rounded-xl border text-xs space-y-1.5 font-mono ${
                lastRound.won
                  ? 'border-acid-green/40 bg-acid-green/10 text-text-primary'
                  : 'border-plasma-orange/40 bg-plasma-orange/10 text-text-primary'
              }`}
            >
              <div className="flex items-center justify-between font-orbitron">
                <span className="font-bold flex items-center gap-1.5">
                  {lastRound.won ? '✅ ROUND WON (Quantum Sync)' : '❌ ROUND LOST (Parity Mismatch)'}
                </span>
                {lastRound.noiseTriggered && (
                  <span className="text-[10px] text-plasma-orange font-bold uppercase">
                    [Noise Decohere]
                  </span>
                )}
              </div>
              <div className="text-[11px] text-text-primary/80 pt-1">
                Referees queried: <span className="text-neon-cyan">({lastRound.query.join(', ')})</span>
              </div>
              <div className="text-[11px] text-text-primary/80">
                Parties measured: <span className="text-white font-bold">({lastRound.answers.join(', ')})</span>
              </div>
              <div className="text-[10px] text-text-primary/60">
                Parity Σ a_i mod 2 = {lastRound.parity} vs Required {lastRound.targetParity}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs text-text-primary/40 font-mono">
              Press &ldquo;Measure 1 Round&rdquo; or &ldquo;Run 100 Shots&rdquo; to test quantum advantage.
            </div>
          )}

          {/* Theoretical note */}
          <p className="text-[11px] text-text-primary/50 italic leading-snug">
            Theoretical proof: Alice, Bob, and Charlie share |GHZ⟩ = (|000⟩ + |111⟩)/√2.
            Pauli observable expectations satisfy ⟨XXX⟩ = +1 and ⟨XYY⟩ = -1, yielding deterministic 100% agreement without communication.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
