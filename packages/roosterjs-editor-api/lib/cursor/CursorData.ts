import { InlineElement } from 'roosterjs-editor-types';
import { TextTraverser } from 'roosterjs-editor-dom';
import { Editor } from 'roosterjs-editor-core';

/**
 * @deprecated Use TextTraverser instead
 */
export default class CursorData {
    private textTraverser: TextTraverser;
    /**
     * Create a new CursorData instance
     * @param editor The editor instance
     */
    constructor(editor: Editor) {
        this.textTraverser = editor.getTextTraverser();
    }

    public getTextTraverser() {
        return this.textTraverser;
    }

    /**
     * Get the word before cursor. The word is determined by scanning backwards till the first white space, the portion
     * between cursor and the white space is the word before cursor
     * @returns The word before cursor
     */
    public get wordBeforeCursor(): string {
        return this.textTraverser.getWordBeforePosition();
    }

    /**
     * Get the inline element before cursor
     * @returns The inlineElement before cursor
     */
    public get inlineElementBeforeCursor(): InlineElement {
        return this.textTraverser.getInlineElementBeforePosition();
    }

    /**
     * Get the inline element after cursor
     * @returns The inline element after cursor
     */
    public get inlineElementAfterCursor(): InlineElement {
        return this.textTraverser.getInlineElementAfterPosition();
    }

    /**
     * Get X number of chars before cursor
     * The actual returned chars may be less than what is requested. e.g, length of text before cursor is less then X
     * @param numChars The X number of chars user want to get
     * @returns The actual chars we get as a string
     */
    public getXCharsBeforeCursor(numChars: number): string {
        return this.textTraverser.getSubStringBeforePosition(numChars);
    }

    /**
     * Get text section before cursor till stop condition is met.
     * This offers consumers to retrieve text section by section
     * The section essentially is just an inline element which has Container element
     * so that the consumer can remember it for anchoring popup or verification purpose
     * when cursor moves out of context etc.
     * @param stopFunc The callback stop function
     */
    public getTextSectionBeforeCursorTill(stopFunc: (textInlineElement: InlineElement) => boolean) {
        return this.textTraverser.forEachTextInlineElement(stopFunc);
    }

    /**
     * Get first non textual inline element before cursor
     * @returns First non textutal inline element before cursor or null if no such element exists
     */
    public getFirstNonTextInlineBeforeCursor(): InlineElement {
        return this.textTraverser.getNearestNonTextInlineElement();
    }
}
