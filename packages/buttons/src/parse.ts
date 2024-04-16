import { XMLParser, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser();

export type Button = string;
export type Buttons = Button[] | undefined;

export type ParseFunction = (buttonsString: string) => Buttons;

export const parseCompleteButtons: ParseFunction = (buttonsString) => {
  const validationResult = XMLValidator.validate(buttonsString);
  if (validationResult !== true) {
    return undefined;
  }
  const parsed = parser.parse(buttonsString);
  if (
    !parsed.buttons ||
    !parsed.buttons.button ||
    !Array.isArray(parsed.buttons.button) ||
    parsed.buttons.button.length <= 0
  ) {
    return undefined;
  }
  return parsed.buttons.button;
};