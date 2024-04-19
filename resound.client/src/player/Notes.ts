function Getnotes(): string[] {
  const notes: string[] = [
    "B",
    "A#",
    "A",
    "G#",
    "G",
    "F#",
    "F",
    "E",
    "D#",
    "D",
    "C#",
    "C",
  ];
  const octaves: number[] = [7, 6, 5, 4, 3, 2, 1];
  const allNotes: string[] = [];
  octaves.forEach((octave: number) => {
    notes.forEach((note: string) => {
      const noteName: string = note + octave;
      allNotes.push(noteName);
    });
  });
  return allNotes;
}

export default Getnotes;
