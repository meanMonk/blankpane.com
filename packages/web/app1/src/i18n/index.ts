import type { UI } from "./types";
import { locales } from "./types";
import en from "./en";
import de from "./de";
import fr from "./fr";
import es from "./es";
import uk from "./uk";
import pl from "./pl";
import it from "./it";
import tr from "./tr";
import pt from "./pt";
import se from "./se";
import ja from "./ja";
import ms from "./ms";
import ko from "./ko";

export * from "./types";

export const ui: Record<string, UI> = { en, de, fr, es, uk, pl, it, tr, pt, se, ja, ms, ko };

export function getUI(code: string): UI {
  return ui[code] ?? en;
}

export { locales };
