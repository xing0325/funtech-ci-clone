import { Sidebar } from "@/components/Sidebar";
import { ThemePills } from "@/components/ThemePills";
import { BottomBar } from "@/components/BottomBar";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { DeckProvider } from "@/components/deck/DeckContext";
import { Stage } from "@/components/deck/Stage";
import { CustomCursor } from "@/components/deck/CustomCursor";

export default function Page() {
  return (
    <main className="fixed inset-0 flex overflow-hidden bg-background text-foreground">
      <CustomCursor />
      <IntroOverlay />

      <DeckProvider initial={8}>
        <Sidebar />

        {/* content area, right of the sidebar */}
        <div className="relative flex-1">
          <ThemePills />
          {/* padded box = container-query root that sizes the 16:9 stage */}
          <div
            className="absolute inset-0 flex items-center justify-center pb-[68px] pl-4 pr-3 pt-14"
            style={{ containerType: "size" }}
          >
            <Stage />
          </div>
        </div>

        <BottomBar />
      </DeckProvider>
    </main>
  );
}
