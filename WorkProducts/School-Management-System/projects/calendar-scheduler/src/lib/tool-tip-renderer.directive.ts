import { Directive, ElementRef, Input, TemplateRef, HostListener, ComponentRef } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { CustomToolTipComponent } from './custom-tool-tip/custom-tool-tip.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[fxcustomToolTip]'
})
export class ToolTipRendererDirective {

  constructor(private _overlay: Overlay,
              private _overlayPositionBuilder: OverlayPositionBuilder,
              private _elementRef: ElementRef) { }

  @Input() showToolTip: boolean = true;
  @Input('fxcustomToolTip') text: string;
  @Input() contentTemplate: TemplateRef<any>;

  private _overlayRef: OverlayRef;

  ngOnInit() {
    if (!this.showToolTip) {
      return;
    }

    const positionStrategy = this._overlayPositionBuilder
                                 .flexibleConnectedTo(this._elementRef)
                                 .withPositions([{
                                                    originX: 'start',
                                                    originY: 'bottom',
                                                    overlayX: 'start',
                                                    overlayY: 'top',
                                                    offsetY: 5,
                                                    offsetX: 5,
                                                }]);

    this._overlayRef = this._overlay.create({positionStrategy});
  }

  @HostListener('mouseenter')
  show(){
    if (this._overlayRef && !this._overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<CustomToolTipComponent> = this._overlayRef.attach(new ComponentPortal(CustomToolTipComponent));
      tooltipRef.instance.text = this.text;
      tooltipRef.instance.contentTemplate = this.contentTemplate;
    } 
  }

  @HostListener('mouseleave')
  hide() {
    this.closeToolTip();
  }

  ngOnDestroy() {
    this.closeToolTip();
  }

  private closeToolTip() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }
}
