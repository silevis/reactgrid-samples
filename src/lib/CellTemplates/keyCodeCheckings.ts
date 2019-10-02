import { keyCodes } from '../Common/Constants';

export const isTextInput = (keyCode: number) =>
    (keyCode >= keyCodes.ZERO && keyCode <= keyCodes.Z) ||
    (keyCode >= keyCodes.NUM_PAD_0 && keyCode <= keyCodes.DIVIDE) ||
    (keyCode >= keyCodes.SEMI_COLON && keyCode <= keyCodes.SINGLE_QUOTE) ||
    (keyCode == keyCodes.SPACE);

export const isNumberInput = (keyCode: number) =>
    (keyCode >= keyCodes.ZERO && keyCode <= keyCodes.NINE) ||
    (keyCode >= keyCodes.NUM_PAD_0 && keyCode <= keyCodes.NUM_PAD_9)

export const isNavigationKey = (keyCode: number) =>
    keyCode == keyCodes.LEFT_ARROW || keyCode == keyCodes.RIGHT_ARROW ||
    keyCode == keyCodes.END || keyCode == keyCodes.HOME || keyCode == keyCodes.BACKSPACE
