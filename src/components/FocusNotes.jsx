import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Slide content lives in an array. Replace the text with the real Figma copy.
const slides = [
  { title: "Plan your day", text: "Organise your priorities and focus on what matters most." },
  { title: "Work in focused blocks", text: "Group similar tasks and avoid switching contexts." },
  { title: "Review your progress", text: "Check what is done and plan what comes next." },
];

export default function FocusNotes() {
  const [index, setIndex] = useState(0);                         // which slide is active

  // Circular navigation using modulo: after the last slide we go back to the first
  const next = () => setIndex((i) => (i + 1) % slides.length);
  // "+ slides.length" prevents a negative number when going back from slide 0
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const slide = slides[index];                                    // only this slide is rendered

  return (
    <section className="focus-notes" aria-label="Focus notes carousel">
      <p className="eyebrow">FOCUS NOTES · {index + 1} OF {slides.length}</p>
      <h2>{slide.title}</h2>
      <p>{slide.text}</p>

      <div className="carousel-controls">
        <button onClick={prev} aria-label="Previous slide"><ChevronLeft size={18} /> Previous</button>
        <div className="dots">
          {slides.map((s, i) => (
            <button
              key={s.title}                                       // stable key for list rendering
              className={i === index ? "dot active" : "dot"}      // highlight active indicator
              onClick={() => setIndex(i)}                         // jump directly to a slide
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}                          // tells screen readers which is active
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next slide">Next <ChevronRight size={18} /></button>
      </div>
    </section>
  );
}