import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_TEMPLATE = `
    <h4 data-placeholder="Title..."></h4>
    <p data-placeholder="Describe your experience..."></p>
`;

@Directive({
  selector:
    '[formControlName][contenteditable], [formControl][contentEditable], [ngModel][contentEditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableContentValueAccessor,
      multi: true,
    },
  ],
  standalone: true,
})
export class EditableContentValueAccessor implements ControlValueAccessor {
  onChange!: (newValue: string) => void;
  onTouch!: () => void;

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    this.onChange((e.target as HTMLElement).innerHTML);
  }

  @HostListener('input', ['blur'])
  onBlur() {
    this.onTouch();
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  writeValue(obj: any): void {
    console.log('Write value...');
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.sanitizer.sanitize(SecurityContext.HTML, obj) || DEFAULT_TEMPLATE
    );
  }

  registerOnChange(fn: any): void {
    console.log('Register on change');
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'contentEditable',
      !isDisabled
    );
  }
}
