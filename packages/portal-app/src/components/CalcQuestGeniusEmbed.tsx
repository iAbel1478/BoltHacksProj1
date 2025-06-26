import React from "react";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";

const CALC_QUEST_URL = "/calc-quest-genius-main (1)/dist/index.html";

const CalcQuestGeniusEmbed: React.FC = () => {
  return (
    <TooltipProvider>
      <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <iframe
          src={CALC_QUEST_URL}
          title="Calc Quest Genius"
          style={{ width: "100%", height: "100%", border: "none", borderRadius: 16 }}
          allow="clipboard-write; clipboard-read"
        />
      </div>
      <Toaster />
    </TooltipProvider>
  );
};

export default CalcQuestGeniusEmbed; 