import React from 'react';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'yellow' },
  { emoji: '😢', label: 'Sad', color: 'blue' },
  { emoji: '😡', label: 'Angry', color: 'red' },
  { emoji: '😌', label: 'Relaxed', color: 'green' },
  { emoji: '😰', label: 'Anxious', color: 'gray' },
];

const MoodSelector = ({ mood, setMood }) => (
  <div className="flex gap-4 mb-4">
    {moods.map((m) => (
      <button
        key={m.label}
        className={`text-3xl p-2 rounded ${mood?.label === m.label ? 'bg-gray-200' : ''}`}
        onClick={() => setMood(m)}
      >
        {m.emoji}
      </button>
    ))}
  </div>
);

export default MoodSelector;