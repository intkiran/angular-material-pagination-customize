import { Directive, ElementRef, ViewContainerRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[style-paginator]'
})
export class StyledPaginatorDirective {

  constructor(private elRef: ElementRef, private vr: ViewContainerRef, private ren: Renderer2) {

    setTimeout(() => {

      let nodeArray = vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[1].childNodes;
      let button = this.ren.createElement('button');
      this.ren.addClass(button, 'mat-mini-fab');
      this.ren.setAttribute(button, 'onclick', 'alert("test")')
      let span = this.ren.createElement('span');
      this.ren.addClass(span, 'mat-button-wrapper');
      this.ren.appendChild(button, span);
      this.ren.insertBefore(vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[1], button, nodeArray[nodeArray.length - 2])

      let buttonArray = [];
      for (let i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i].nodeName === 'BUTTON') {
          buttonArray.push(nodeArray[i])
        }
      }


      for (let i = 0; i < buttonArray.length; i++) {
        if (i === 0 || i === buttonArray.length - 1) {
          this.ren.setStyle(buttonArray[i], 'background-color', 'rgba(255, 0, 0, 1)')
          this.ren.setStyle(buttonArray[i], 'color', 'white')
        }
        if (i != 0 && i != buttonArray.length - 1) {
          if (buttonArray[i].childNodes.length > 1) {
            this.ren.removeChild(buttonArray[i].childNodes[0], buttonArray[i].childNodes[0].childNodes[0]);
          }
          const text = this.ren.createText(i);
          this.ren.appendChild(buttonArray[i].childNodes[0], text);
        }
        if (buttonArray[i].className === 'mat-paginator-range-label') {
          this.ren.removeChild(buttonArray, buttonArray[i])
        }
        if (buttonArray[i].nodeName === 'BUTTON') {
          this.ren.removeClass(buttonArray[i], 'mat-icon-button')
          this.ren.addClass(buttonArray[i], 'mat-mini-fab')
          this.ren.setStyle(buttonArray[i], 'margin', '2%')
          this.ren.setStyle(buttonArray[i].childNodes[0], 'padding', '0')
          this.ren.setStyle(buttonArray[i].childNodes[0], 'display', 'block')
        }
      }
    })

  }

}