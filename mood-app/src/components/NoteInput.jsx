import React from 'react';

const NoteInput = ({ note, setNote }) => (
  <textarea
    className="w-full p-2 rounded border mb-4"
    placeholder="Write your note..."
    value={note}
    onChange={(e) => setNote(e.target.value)}
  ></textarea>
);

export default NoteInput;