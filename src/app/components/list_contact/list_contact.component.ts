import {Component, Input} from "@angular/core";


@Component({
  standalone: true,
  selector: 'list_contact',
  template: `
    <span data-aos="fade-up" (mouseenter)="toggleFocus(true)" (mouseleave)="toggleFocus()" class="grid">
      <span class="{{focus?'text-accent-200':'text-white'}}">{{contact.type}}</span>
      <a class="{{focus?'text-accent-400':'text-white'}} cursor-pointer text-[20px]" [href]="contact.link" target="_blank">
        {{ contact.contact }}
      </a>
    </span>
  `
})
export class ListContactComponent {
  @Input() contact: ContactObj = {type: "phone", contact: "", link: ""}
  focus = false;

  toggleFocus(focus: boolean = !this.focus){
    this.focus = focus;
  }
}
